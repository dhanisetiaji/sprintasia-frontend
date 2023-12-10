import { ListParams } from './Params';

export interface OrderLensParams extends ListParams {
  start_date?: string;
  end_date?: string;
  status?: string;
  store?: string | number;
}

export interface OrderLens {
  transaction_id: number;
  invoice_no: string;
  customer_name: string;
  status: string;
  sales_name: string;
  created_at: string;
  updated_at: string | null;
}

export interface OrderLensSideDetails extends OrderLens {
  store_id: number;
  store_code: string;
  sales_id: number;
  dp_amount: string | null;
  total_amount: string;
  total_item: number;
  status: string;
  due: string;
  customer_id: number | null;
  side: string;
  axis: string;
  add: string;
  pd: string;
  sph: string;
  cyl: string;
  note: string;
  keyword: string;
  add_ons_names: string;
}

export interface EssilorOrder {
  id: number;
  essilor_order_no: string;
  status: string;
  created_by: string;
  store_code: string;
  created_at: string;
  updated_at: string | null;
  transaction_id: number;
}

export interface OrderLensDetails {
  detail_lens: OrderLensSideDetails[];
  essilor_order_no: EssilorOrder[];
}

export interface CreateOrderLensPayload {
  transaction_id: number;
  essilor_order_no: string;
  status: string;
  created_by: number;
  store_code: string;
}

export interface UpdateOrderLensPayload {
  essilor_order_no: string;
  status: string;
}

export interface UpdateOrderLensResponse {
  id: number;
  essilor_order_no: string;
  status: string;
  created_by: string;
  store_code: string;
  created_at: string;
  updated_at: string;
  transaction_id: number;
}
