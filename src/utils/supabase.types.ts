export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Users = {
  id: string;
  role: string;
  id_branch: string;
  created_at: string;
  name: string;
  id_user: string;
};

export type Branch_stock = {
  created_at: string;
  id: string;
  id_branch: string;
  id_prod: string;
  modified_at: string | null;
  quantity: number;
};

export type Branches = {
  id: string;
  name: string;
};

export type Brands = {
  id: string;
  name: string;
};

export type Categories = {
  id: string;
  name: string;
};

export type Payment_methods = {
  id: string;
  name: string;
};

export type Products = {
  cost: number;
  created_at: string;
  description: string | null;
  id: string;
  id_brand: string;
  id_category: string;
  modified_at: string | null;
  price: number;
  sku: string;
};

export type Profiles = {
  created_at: string;
  id: string;
  id_branch: string;
  id_user: string;
  name: string;
  role: string;
};

export type Sale_items = {
  id: string;
  id_prod: string;
  id_sale: string;
  quantity: number;
  unit_price: number;
};

export type Sales = {
  created_at: string;
  date: string;
  id: string;
  id_branch: string;
  id_payment_method: string;
  id_user: string;
  total_amount: number;
};

export type Stock_transfer_items = {
  id: string;
  id_prod: string;
  id_transfer: string;
  quantity: number;
};

export type Stock_transfers = {
  created_at: string;
  from_branch_id: string;
  id: string;
  id_user: string;
  to_branch_id: string;
};

export type Products_public = {
  created_at: string;
  description: string | null;
  id: string;
  id_brand: string;
  id_category: string;
  modified_at: string | null;
  price: number;
  sku: string;
};

export type Adjust_stock = {
  p_branch_id: string;
  p_new_quantity: number;
  p_product_id: string;
};

export type Create_product = {
  p_branch_id: string;
  p_brand_id: string;
  p_category_id: string;
  p_cost: number;
  p_description: string;
  p_initial_stock: number;
  p_price: number;
  p_sku: string;
};

export type Create_stock_transfer = {
  p_from_branch: string;
  p_items: Json;
  p_to_branch: string;
  p_user_id: string;
};
