import { IPagination, IResponse } from "@/utils/types/api";
import { IBook } from "@/utils/types/books";
import axiosWithConfig from "./axios-with-config";

export const getBooks = async () => {
  try {
    const response = await axiosWithConfig.get("/books");

    return response.data as IResponse<IPagination<IBook[]>>;
  } catch (error : any) {
    const { message } = error.response.data;

    throw Error(message);
  }
};

export const getDetailBook = async (id_book: number) => {
  try {
    const response = await axiosWithConfig.get(`/books/${id_book}`);

    return response.data as IResponse<IBook>;
  } catch (error: any) {
    const { message } = error.response.data;

    throw Error(message);
  }
};

export const postBook = () => {};

export const editBook = () => {};

export const deleteBook = () => {};
