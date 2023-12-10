export interface ListParams {
  page?: number;
  key?: string;
  order?: string;
  category?: string;
  showentry?: number;
  search?: string;
  is_active?: boolean;
  store_id?: number | string;
}

export interface ListParamsWarranty {
  showentry?: number;
  search?: string;
  order?: string;
  key?: string;
  page?: number;
}
