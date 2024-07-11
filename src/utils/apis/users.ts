import { IResponse } from "@/utils/types/api";
import { ProfileType, ProfileSchema } from "../types/users";
import axiosWithConfig from "./axios-with-config";
import { checkProperty, valueFormatData } from "../functions";

export const getProfile = async () => {
  try {
    const response = await axiosWithConfig.get("/users");

    return response.data as IResponse<ProfileType>;
  } catch (error: any) {
    const { message } = error.response.data;

    throw Error(message);
  }
};

export const updateProfile = async (body: ProfileSchema) => {
  try {
    const formData = new FormData();
    let key: keyof typeof body;

    for (key in body) {
      if (checkProperty(body[key])) {
        formData.append(key, valueFormatData(body[key]));
      }
    }

    const response = await axiosWithConfig.put("/users", formData);

    return response.data as IResponse<undefined>;
  } catch (error: any) {
    const { message } = error.response.data;

    throw Error(message);
  }
};

export const deleteProfile = async () => {
  try {
    const response = await axiosWithConfig.delete("/users");

    return response.data as IResponse<undefined>;
  } catch (error: any) {
    const { message } = error.response.data;

    throw Error(message);
  }
};
