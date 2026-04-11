export type TransactionType = "expense" | "income";

export interface Transaction {
  id: string;
  amount: number;
  categoryId: string;
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
  id: string;
  name: string;
  icon: string;
  color: string;
  type: TransactionType;
}

export interface CategoryStat extends Category {
  total: number;
  percentage: number;
}
