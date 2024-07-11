export interface IRequest {
  path?: string;
  query?: string;
  sort?: "new" | "popular";
  filter?: string;
  limit?: string | number;
  page?: string | number;
}

export interface IResponse<T = any> {
  message: string;
  payload: T;
}

export interface IPagination<T = any> {
  currentPage: number;
  datas: T;
  totalItems: number;
  totalPages: number;
}

export interface IMeta {
  currentPage: number;
  totalItems: number;
  totalPages: number;
}
