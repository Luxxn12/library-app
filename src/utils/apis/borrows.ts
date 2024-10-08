
import { IPagination, IResponse } from "../types/api";
import { BorrowPayload, BorrowSchema, IBorrow } from "../types/borrows";
import axiosWithConfig from "./axios-with-config";

export const getBorrows = async (params?: Request) => {
  try {
    let query = "";

    if (params) {
      const queryParams: string[] = [];

      let key: keyof typeof params;
      for (key in params) {
        queryParams.push(`${key}=${params[key]}`);
      }

      query = queryParams.join("&");
    }

    const url = query ? `/borrows?${query}` : "/borrows";

    const response = await axiosWithConfig.get(url);

    return response.data as IResponse<IPagination<IBorrow[]>>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getDetailBook = async (id_book: string) => {
  try {
    const response = await axiosWithConfig.get(`/borrows/${id_book}`);

    return response.data as IResponse<IBorrow>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const postBorrow = async (body: BorrowSchema) => {
  try {
    const response = await axiosWithConfig.post(`/borrows`, body);

    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const updateBorrow = async (body: BorrowPayload, id_borrow: number) => {
  try {
    let newBody: Partial<BorrowPayload> = {};

    let key: keyof typeof body;
    for (key in body) {
      if (body[key]) {
        newBody[key] = body[key];
      }
    }

    const response = await axiosWithConfig.put(
      `/borrows/${id_borrow}`,
      newBody
    );

    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const deleteBorrow = async (id_borrow: string) => {
  try {
    const response = await axiosWithConfig.delete(`/borrows/${id_borrow}`);

    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
