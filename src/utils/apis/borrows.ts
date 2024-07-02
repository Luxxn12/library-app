import { IResponse, IPagination } from "@/utils/types/api";
import axiosWithConfig from "./axios-with-config";
import { IBorrow } from "../types/borrows";

export const getBorrows = async () => {
  try {
    const response = await axiosWithConfig.get("/borrows");

    return response.data as IResponse<IPagination<IBorrow[]>>;
  } catch (error: any) {
    const { message } = error.response.data;

    throw Error(message);
  }
};