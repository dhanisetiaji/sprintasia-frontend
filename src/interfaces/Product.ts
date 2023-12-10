import { ListParams } from './Params';

export interface ProductStore {
  store_id: number;
  store_code: string;
  store_name: string;
  price: number;
  display: number;
  warehouse: number;
}

export interface Product {
  product_type_id: number;
  product_type_name: string;
  product_id: number;
  product_name: string;
  product_description: string;
  keyword: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  sku: string;
  is_delete: boolean;
  stores: ProductStore[];
}

export interface ProductParams extends ListParams {
  sph?: string;
  cyl?: string;
  is_store_active?: boolean;
}

export interface LensAddOn {
  add_ons_id: number;
  add_ons_names: string;
  price: string;
  is_active: boolean;
  is_delete: boolean;
  created_at: string;
  updated_at: string;
}
