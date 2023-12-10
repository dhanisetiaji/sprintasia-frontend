import { ListParams } from './Params';
import { Product } from './Product';
import { Store } from './Store';

export interface PromoListParams extends ListParams {
  store_id?: number;
  total_transaction?: number;
}

export interface Promo {
  promo_id: number;
  promo_name: string;
  promo_code: string;
  limiter: string;
  limiter_value: string;
  minimum_transaction: string;
  maximum_discount: string;
  date_start: string;
  date_end: string;
  is_active: boolean;
  days_promo: string[];
  created_at: string;
  updated_at: string;
  is_combine: boolean;
  is_delete: boolean;
  product_id: number[];
  promo_usage: number;
  store: Store[];
  merchant_payment_channel_id: number[];
  status_availability: string;
}

export interface MerchantPayment {
  merchant_payment_id: number;
  merchant_payment_code: string;
  merchant_payment_name: string;
  created_at: string;
  updated_at: string;
}

export interface PaymentChannel {
  payment_channel_id: number;
  payment_channel_name: string;
  payment_channel_deskripsi: string;
  created_at: string;
  updated_at: string;
  merchant_payment_list: MerchantPayment[];
}

export interface CheckoutPayloadItem {
  product_id: number;
  product_type_id: number;
  qty: number;
  price: number;
  description: string | null;
}

export interface CheckoutPayloadPayment {
  payment_type: string;
  payment_merchant: string;
  trace_number: string;
  payment_notes: string;
  amount: number;
}

export interface CheckoutLensPayload {
  product_id: number;
  qty: number;
  type: string;
  add_ons: number | null;
  axis: string;
  add: string;
  sph: string;
  cyl: string;
  pd: string;
  notes: string;
}
export interface DiscountPayload {
  store_id: number;
  promo_code: string[];
  items: CheckoutPayloadItem[];
  payments: CheckoutPayloadPayment[];
}

export interface PromoResponse {
  created_at: string;
  date_end: string;
  date_start: string;
  days_promo: string[];
  is_active: boolean;
  is_combine: boolean;
  is_delete: boolean;
  limiter: string;
  limiter_value: string;
  maximum_discount: string;
  merchant_payment_channel_id: number[];
  minimum_transaction: string;
  product_id: number[];
  promo_code: string;
  promo_id: number;
  promo_name: string;
  promo_usage: number;
  status_availability: string;
  store: Store[];
  updated_at: string;
  // promo_type_product: {
  //   promo_id: number;
  //   promo_type: string;
  //   promo_value: number;
  //   product_type_id: number;
  //   product_promo_type_id: number;
  // }[];
}

export interface PromoInvalidObject extends PromoResponse {
  code: string;
  status: boolean;
  message: string;
  data: PromoResponse;
}

export interface DiscountResponse {
  message: string;
  discount_amount: string;
  promo_invalid?: PromoInvalidObject[];
}

export interface CheckoutPayload {
  store_code: string;
  sales_person: number;
  customer_id: number;
  promo_code: string[];
  items: CheckoutPayloadItem[];
  lens: CheckoutLensPayload[];
  sub_total: number;
  total_amount: number;
  total_discount: number;
  due: number;
  status: string;
  payments: CheckoutPayloadPayment[];
}

export interface CheckoutResponse {
  transaction_id: number;
  invoice_no: string;
  store_id: number;
  store_code: string;
  customer_name: string;
  sales_id: number;
  sales_name: string;
  dp_amount: number | null;
  total_amount: string;
  total_item: number;
  status: string;
  created_at: string;
  updated_at: string | null;
}

export interface UpdatePayload {
  id: number;
  payload: Pick<CheckoutPayload, 'payments'>;
}
