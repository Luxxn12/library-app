export interface IRequest {
  path?: string;
  query?: string;
  sort?: "new" | "popular";
  filter?: string;
  limit?: string | number;
  page?: string | number;
}

export interface IResponse<T> {
  message: string;
  payload: T;
}

export interface IPagination<T> {
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
