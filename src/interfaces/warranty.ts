export interface item {
  product_id: number;
  qty: number;
  price: number;
}

export interface Warranty {
  invoice_no: string;
  store_code: string;
  sales_person: string;
  customer: string;
  items: item[];
  sub_total: number;
  note: string;
}
