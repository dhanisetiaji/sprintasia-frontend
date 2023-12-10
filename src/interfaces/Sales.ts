import { ListParams } from './Params';

export interface SalesParams extends ListParams {
  start_date?: string;
  end_date?: string;
  store_id?: number | string;
  search?: string;
}

export interface Sales {
  phone: string;
  transaction_id: number;
  invoice_no: string;
  store_id: number;
  store_code: string;
  customer_name: string;
  sales_id: number;
  sales_name: string;
  dp_amount: number;
  promo_name: string;
  total_payment_amount: string;
  total_discount_amount: string | null;
  sub_total: string | null;
  due: string;
  total_item: number;
  status: string;
  created_at: string;
  updated_at: string | null;
  customer_id: number;
  is_claim: number;
}

export interface SalesPayment {
  transaction_payment_id: number;
  transaction_id: number;
  invoice_no: string;
  payment_type: string;
  payment_merchant: string;
  trace_number: string;
  amount: number;
  payment_notes: string;
  created_at: string;
}

export interface SalesFrame {
  transaction_detail_id: number;
  transaction_id: number;
  invoice_no: string;
  product_id: number;
  price: number;
  discount_amount: number;
  is_claim: number;
  created_at: string;
  updated_at: string | null;
  sku: string;
  keyword: string;
  product_name: string;
  description: string | null;
  qty: number;
}

export interface SalesLens {
  keyword: string;
  id: number;
  transaction_id: number;
  product_id: number;
  add_ons_id: number;
  side: string;
  axis: string;
  add: string;
  pd: string;
  sph: string;
  cyl: string;
  note: string;
  created_at: string;
  updated_at: string | null;
  discount_amount: number;
  is_claim: number;
  price: number;
  qty: number;
}

export interface SalesDetail extends Sales {
  is_claim: number;
  frame_items: SalesFrame[];
  lens_items: SalesLens[];
  payments: SalesPayment[];
}
