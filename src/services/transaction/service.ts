import {
  ITransaction,
  ITransactionCreate,
} from "@/interfaces/transaction/interface";
import {
  API_TRANSACTIONS,
  API_TRANSACTION_SUMMARY,
} from "../../constants/apis";
import {
  INestResponse,
  INestResponseWithPagination,
} from "../../interfaces/interface.common";
import { Summary } from "../../types";
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

export const getTransactionSummary = () => {
  return axiosInstance.get<unknown, INestResponse<Summary>>(
    API_TRANSACTION_SUMMARY,
  );
};
