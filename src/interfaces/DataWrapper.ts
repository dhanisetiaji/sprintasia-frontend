export interface DataWrapper<T> {
  success: boolean;
  message: string;
  code: number;
  data: T;
}

export interface DataListWrapper<T> {
  totalFiltered: string;
  currentPage: number;
  data: T;
  totalPage: number;
  totalDataOnPage: number;
}
