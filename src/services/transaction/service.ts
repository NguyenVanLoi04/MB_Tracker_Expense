import {
  ITransaction,
  ITransactionCreate,
} from "@/interfaces/transaction/interface";
import { API_TRANSACTIONS } from "../../constants/apis";
import { INestResponseWithPagination } from "../../interfaces/interface.common";
import axiosInstance from "../axios";

export const getTransactions = () => {
  return axiosInstance.get<
    unknown,
    INestResponseWithPagination<ITransaction[]>
  >(API_TRANSACTIONS);
};

export const createTransaction = (data: ITransactionCreate) => {
  return axiosInstance.post(API_TRANSACTIONS, data);
};
