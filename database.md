# BLANCO Y NEGRO DATA BASE

## PRODUCTS

- Id
- SKU
- Description
- Id_Category
- Id_Brand
- Cost
- Profit porcentage (only in web page)
- Price
- Creation_Date
- Modification_Date

## CATEGORIES

- Id
- Name

## BRANDS

- Id
- Name

## SALES

- Id
- Id_user
- Id_branch
- Id_Payment_Method
- Date
- Total_amount
- Created_at

## SALE_ITEMS

- Id
- Id_sale
- Id_prod
- quantity (cant vendida del producto)
- Unit_price

### Function to register sales

```sql
create or replace function register_sale(
  p_branch_id uuid,
  p_user_id uuid,
  p_payment_method_id uuid,
  p_sale_date timestamp with time zone default now(), -- Si no se envía fecha, toma el momento actual por defecto
  p_items jsonb -- Aquí recibimos un arreglo con los productos y cantidades
  p_total_amount numeric,
)
returns uuid as $$
declare
  v_sale_id uuid;
  v_item record;
begin
  -- 1. Insertar la venta principal (incluyendo método de pago y fecha)
  insert into sales (id_user, id_branch, id_payment_method, total_amount, date)
  values (
    p_user_id,
    p_branch_id,
    p_payment_method_id,
    p_total_amount,
    p_sale_date
  )
  returning id into v_sale_id;

  -- 2. Recorrer cada producto del carrito y actualizar stock
  for v_item in select * from jsonb_to_recordset(p_items) as x(product_id uuid, quantity int, unit_price numeric)
  loop
    -- A. Insertar el detalle en sale_items
    insert into sale_items (id_sale, id_prod, quantity, unit_price)
    values (v_sale_id, v_item.product_id, v_item.quantity, v_item.unit_price);

    -- B. Descontar el stock en la sucursal correspondiente
    update branch_stock
    set quantity = quantity - v_item.quantity
    where id_prod = v_item.product_id and id_branch = p_branch_id;
  end loop;

  return v_sale_id;
end;
$$ language plpgsql;
```

### Example of how to use it

```js
const handleCompleteSale = async (
  cartItems,
  totalAmount,
  currentBranchId,
  currentUserId,
) => {
  // Preparamos los items en el formato que espera la función RPC (JSON)
  const formattedItems = cartItems.map((item) => ({
    product_id: item.id,
    quantity: item.quantity,
    unit_price: item.price,
  }));

  const { data, error } = await supabase.rpc('register_sale', {
    p_branch_id: currentBranchId,
    p_user_id: currentUserId,
    p_total_amount: totalAmount,
    p_items: formattedItems,
  });

  if (error) {
    console.error('Error al registrar la venta:', error);
    alert('Hubo un error al procesar la venta');
  } else {
    console.log('Venta registrada con éxito, ID de venta:', data);
    alert('¡Venta realizada con éxito! El stock ha sido actualizado.');
    // Limpiar el carrito de compras en tu estado de Vite
  }
};
```

## PAYMENT_METHODS

- Id
- Name (efectivo, transferencia, tarjeta)

## PROFILES

- Id
- Id_User (vinculado a auth.users en Supabase)
- Id_Branch
- Role (admin, employee)

## BRANCHES (Sucursales)

- Id
- Name

## BRANCH_STOCK

- Id
- Id_Branch
- Id_Prod
- quantity

### Function to create new product and update product stock in branch

```sql
create or replace function create_product(
  p_sku text,
  p_desc text,
  p_price numeric,
  p_branch_id uuid,
  p_initial_stock int
)
returns uuid as $$
declare
  v_product_id uuid;
begin
  -- 1. Insertar el producto nuevo y guardar su ID generado
  insert into products (name, sku, price)
  values (p_name, p_sku, p_price)
  returning id into v_product_id;

  -- 2. Insertar el stock inicial en la sucursal correspondiente
  insert into branch_stock (branch_id, product_id, quantity)
  values (p_branch_id, v_product_id, p_initial_stock);

  -- Devolver el ID del producto creado
  return v_product_id;
end;
$$ language plpgsql;
```

### Example of how to call it in Javascript

```js
const handleCreateProduct = async (e) => {
  e.preventDefault();

  const { data, error } = await supabase.rpc('create_product_with_stock', {
    p_sku: 'CAM-001',
    p_desc: 'Camisa de lino',
    p_price: 25000,
    p_branch_id: 'uuid-de-la-sucursal', // ID del local donde entra este stock
    p_initial_stock: 10, // Cantidad inicial
  });

  if (error) {
    console.error('Error al crear el producto:', error);
    alert('Hubo un error al guardar el producto');
  } else {
    console.log('Producto creado con éxito, ID:', data);
    alert('¡Producto creado y stock asignado!');
    // Aquí puedes limpiar el formulario o actualizar tu lista de productos
  }
};
```

## STOCK_TRANSFERS (funcion para transferir el stock de una sucursal a la otra)

- Id
- Id_Prod
- From_branch_id
- To_branch_id
- quantity

### Function to make the transfer

```sql
create or replace function transfer_prod(
  p_product_id uuid,
  p_from_branch uuid,
  p_to_branch uuid,
  p_quantity int
)
returns void as $$
begin
  -- 1. Descontar del local de origen
  update branch_stock
  set quantity = quantity - p_quantity
  where id_prod = p_product_id and id_branch = p_from_branch;

  -- 2. Sumar al local de destino (o insertarlo si no existe)
  insert into branch_stock (id_branch, id_prod, quantity)
  values (p_to_branch, p_product_id, p_quantity)
  on conflict (id_branch, id_prod) -- Requiere un Unique Constraint (ver nota abajo)
  do update set quantity = branch_stock.quantity + excluded.quantity;

end;
$$ language plpgsql;
```

### Then in JavaScript

```js
const { data, error } = await supabase.rpc('transfer_prod', {
  p_product_id: 'uuid-del-producto',
  p_from_branch: 'uuid-de-tu-local',
  p_to_branch: 'uuid-de-sucursal',
  p_quantity: 5,
});
```

## TABLE POLICIES IN SUPABASE

### PROFILES

```sql
-- Los usuarios pueden leer su propio perfil; los admins pueden leer todos
create policy "Ver perfiles propios o admin"
on profiles for select
using (
  auth.uid() = id_user
  or
  exists (select 1 from profiles where id_user = auth.uid() and role = 'admin')
);

-- Solo los admins pueden crear o modificar perfiles de empleados
create policy "Admin gestiona perfiles"
on profiles for all
using (
  exists (select 1 from profiles where id_user = auth.uid() and role = 'admin')
);
```

### BRANCHES

```sql
-- Todos los usuarios autenticados pueden ver las sucursales
create policy "Ver sucursales"
on branches for select
to authenticated
using (true);

-- Solo el admin puede crear/modificar sucursales
create policy "Admin gestiona sucursales"
on branches for all
using (
  exists (select 1 from profiles where id_user = auth.uid() and role = 'admin')
);
```

### PRODUCTS

```sql
-- El admin tiene acceso total a la tabla de productos
create policy "Admin gestiona productos"
on products for all
using (
  exists (select 1 from profiles where id_user = auth.uid() and role = 'admin')
);

-- Los empleados pueden leer el catálogo general (si decides que usen la tabla directa sin costos)
-- O si usas la vista "products_public", la vista hereda la seguridad de la tabla base.
```

### BRANCH_STOCK

```sql
create policy "Ver stock de sucursal o todo si es admin"
on branch_stock for select
using (
  id_branch = (select id_branch from profiles where id_user = auth.uid())
  or
  exists (select 1 from profiles where id_user = auth.uid() and role = 'admin')
);

create policy "Modificar stock de sucursal o todo si es admin"
on branch_stock for update
using (
  id_branch = (select id_branch from profiles where id_user = auth.uid())
  or
  exists (select 1 from profiles where id_user = auth.uid() and role = 'admin')
);
```

### SALES AND SALES_ITEM

```sql
-- Para la tabla sales:
create policy "Ver ventas de sucursal o todas si es admin"
on sales for select
using (
  id_branch = (select id_branch from profiles where id_user = auth.uid())
  or
  exists (select 1 from profiles where id_user = auth.uid() and role = 'admin')
);

create policy "Crear ventas por local de venta"
on sales for insert
with check (
  id_branch = (select id_branch from profiles where id_user = auth.uid())
  or
  exists (select 1 from profiles where id_user = auth.uid() and role = 'admin')
);

-- Para la tabla sale_items (los productos de cada venta):
create policy "Ver items de venta segun acceso a la venta"
on sale_items for select
using (
  exists (
    select 1 from sales s
    where s.id = sale_items.id_sale
    and (
      s.id_branch = (select id_branch from profiles where id_user = auth.uid())
      or
      exists (select 1 from profiles where id_user = auth.uid() and role = 'admin')
    )
  )
);

create policy "Insertar items de venta"
on sale_items for insert
with check (true); -- Permitido si pasa por la función RPC de venta
```
