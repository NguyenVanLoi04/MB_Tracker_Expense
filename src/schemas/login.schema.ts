import { z } from "zod";
import { ILoginFormValues } from "../interfaces/login.interface";

export const loginSchema = z.object({
  userName: z.string().min(1, "Vui lòng nhập tài khoản"),
  passWord: z.string().min(6, "Mật khẩu phải ít nhất 6 ký tự"),
  rememberMe: z.boolean().optional(),
});

export const loginDefaultValues: ILoginFormValues = {
  userName: "",
  passWord: "",
};

export type { ILoginFormValues };
