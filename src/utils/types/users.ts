import * as z from "zod";

import { ACCEPTED_IMAGE_TYPES, MAX_MB, MAX_UPLOAD_SIZE } from "../const";

export const profileSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Not a valid email"),
  full_name: z.string().min(1, { message: "Full name is required" }),
  password: z.string().optional(),
  phone_number: z.string().min(1, { message: "Phone number is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  profile_picture: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= MAX_UPLOAD_SIZE,
      `Max image size is ${MAX_MB}MB`
    )
    .refine(
      (file) =>
        !file || file.type === "" || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, and .png formats are supported"
    ),
});

export type RoleType = "user" | "admin";

export interface ProfileType {
  id: number;
  full_name: string;
  email: string;
  role: RoleType;
  profile_picture: string;
  address: string;
  phone_number: string;
}
export type ProfileSchema = z.infer<typeof profileSchema>;
