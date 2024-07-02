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
  