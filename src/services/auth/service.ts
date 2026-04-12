import { API_LOGIN, API_PROFILE } from "../../constants/apis";
import { INestResponse } from "../../interfaces/interface.common";
import { IUserProfile } from "../../interfaces/user.interface";
import axiosInstance from "../axios";

export const userLogin = (data: any) => {
  return axiosInstance.post(API_LOGIN, data);
};

export const getUserProfile = () => {
  return axiosInstance.get<unknown, INestResponse<IUserProfile>>(API_PROFILE);
};
