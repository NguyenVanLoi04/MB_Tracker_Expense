import { ETransactionType } from "../enums/transaction";

export { ETransactionType };

export type TransactionType = ETransactionType;

export interface Transaction {
  id: string;
  amount: number;
  categoryId: number;
  note: string;
  date: string;
  type: TransactionType;
}

export interface Summary {
  balance: number;
  income: number;
  expense: number;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  color: string;
  type: TransactionType;
}

export interface CategoryStat extends Category {
  total: number;
  percentage: number;
}
