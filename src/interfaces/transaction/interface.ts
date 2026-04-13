import { ETransactionType } from "../../enums/transaction";
import { ICategory } from "../category/interface";

export interface ITransactionFormData {
  type: ETransactionType;
  amount: string;
  categoryId: number;
  note: string;
}

export interface ITransactionCreate {
  amount: number;
  categoryId: number;
  note: string;
  date: string;
  type: ETransactionType;
}

export interface ITransaction {
  id: number;
  amount: number;
  note: string;
  type: ETransactionType;
  transactionDate: string;
  createdAt: string;
  updatedAt: string;
  category: ICategory;
}
