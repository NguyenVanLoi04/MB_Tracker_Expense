import { API_LOGIN } from "../../constants/apis";
import axiosInstance from "../axios";

export const userLogin = (data: any) => {
  return axiosInstance.post(API_LOGIN, data);
};
