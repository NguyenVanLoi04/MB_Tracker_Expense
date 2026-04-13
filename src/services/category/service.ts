import { API_CATEGORIES } from "../../constants/apis";
import { ICategory } from "../../interfaces/category/interface";
import { INestResponse } from "../../interfaces/interface.common";
import axiosInstance from "../axios";

export const getCategories = () => {
  return axiosInstance.get<unknown, INestResponse<ICategory[]>>(API_CATEGORIES);
};
