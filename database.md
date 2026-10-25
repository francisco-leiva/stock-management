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
  p_total_amount numeric,
  p_items jsonb -- Aquí recibimos un arreglo con los productos y cantidades
)
returns uuid as $$
declare
  v_sale_id uuid;
  v_item record;
begin
  -- 1. Insertar la venta principal y obtener su ID
  insert into sales (branch_id, user_id, total_amount)
  values (p_branch_id, p_user_id, p_total_amount)
  returning id into v_sale_id;

  -- 2. Recorrer cada producto del carrito (enviado como JSON)
  for v_item in select * from jsonb_to_recordset(p_items) as x(product_id uuid, quantity int, unit_price numeric)
  loop
    -- A. Insertar el detalle en sale_items
    insert into sale_items (sale_id, product_id, quantity, unit_price)
    values (v_sale_id, v_item.product_id, v_item.quantity, v_item.unit_price);

    -- B. Descontar el stock en la sucursal correspondiente
    update branch_stock
    set quantity = quantity - v_item.quantity
    where product_id = v_item.product_id and branch_id = p_branch_id;
    
    -- Opcional: Podrías agregar una validación aquí para asegurarte de que el stock no quede en negativo.
  end loop;

  return v_sale_id;
end;
$$ language plpgsql;
```

### Example of how to use it

```js
const handleCompleteSale = async (cartItems, totalAmount, currentBranchId, currentUserId) => {
  // Preparamos los items en el formato que espera la función RPC (JSON)
  const formattedItems = cartItems.map(item => ({
    product_id: item.id,
    quantity: item.quantity,
    unit_price: item.price
  }));

  const { data, error } = await supabase.rpc('register_sale', {
    p_branch_id: currentBranchId,
    p_user_id: currentUserId,
    p_total_amount: totalAmount,
    p_items: formattedItems
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

- Id (vinculado a auth.users en Supabase)
- Branch_Id
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
create or replace function create_product_with_stock(
  p_name text,
  p_sku text,
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
    p_name: 'Camisa de lino',
    p_sku: 'CAM-001',
    p_price: 25000,
    p_branch_id: 'uuid-de-la-sucursal', // ID del local donde entra este stock
    p_initial_stock: 10                // Cantidad inicial
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
create or replace function transfer_stock(
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
  where product_id = p_product_id and branch_id = p_from_branch;

  -- 2. Sumar al local de destino (si ya existe la fila)
  update branch_stock
  set quantity = quantity + p_quantity
  where product_id = p_product_id and branch_id = p_to_branch;

  -- (Opcional) Si no existe la fila en el destino, podrías insertarla aquí si es necesario

  -- TODO: INVESTIGAR SI EXISTE UN IF PARA PODER HACER ESTO
  insert into branch_stock (branch_id, product_id, quantity)
  values (p_to_branch, p_product_id, p_quantity);
end;
```

### Then in JavaScript

```js
const { data, error } = await supabase.rpc('transfer_stock', {
  p_product_id: 'uuid-del-producto',
  p_from_branch: 'uuid-de-tu-local',
  p_to_branch: 'uuid-del-local-empleado',
  p_quantity: 5,
});
```
