# BLANCO Y NEGRO DATA BASE

## PRODUCT

- Id / SKU
- Id_Category
- Id_Brand
- Cost
- Profit porcentage
- IVA
- Price
- Creation_Date
- Modification_Date

## CATEGORY

- Id
- Name

## BRAND

- Id
- Name

## SALES

- Id
- Id_Payment_Method
- Date
- Id_Prod
- Prod_Price
- Total

## PAYMENT_METHOD

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

## STOCK_TRANSFERS (funcion para transferir el stock de una sucursal a la otra)

- Id
- Id_Prod
- From_branch_id
- To_branch_id
- quantity
- Status

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
end;
```

### Then in JavaScript

```js
const { data, error } = await supabase.rpc("transfer_stock", {
  p_product_id: "uuid-del-producto",
  p_from_branch: "uuid-de-tu-local",
  p_to_branch: "uuid-del-local-empleado",
  p_quantity: 5,
});
```

