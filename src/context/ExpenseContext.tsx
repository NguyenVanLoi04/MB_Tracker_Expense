import React, { createContext, useContext, useMemo, useState } from "react";
import { useCreateTransaction } from "../hooks/transaction/useCreateTransaction";
import { useGetListTransaction } from "../hooks/transaction/useGetListTransaction";
import { useGetSummary } from "../hooks/transaction/useGetSummary";
import { Summary, Transaction } from "../types";

interface ExpenseContextType {
  transactions: Transaction[];
  budget: number;
  addTransaction: (transaction: Omit<Transaction, "id">) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  updateTransaction: (transaction: Transaction) => Promise<void>;
  setMonthlyBudget: (amount: number) => Promise<void>;
  summary: Summary;
  isLoading: boolean;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [budget, setBudget] = useState(2000000);

  const { data: apiResponse, isLoading } = useGetListTransaction();
  const { data: summaryResponse } = useGetSummary();
  const createMutation = useCreateTransaction({
    onSuccess: () => {
      console.log("Transaction created successfully");
    },
    onError: () => {
      console.log("Transaction creation failed");
    },
  });

  const transactions: Transaction[] = useMemo(() => {
    const items = apiResponse?.data || [];

    return items.map((apiItem) => ({
      id: apiItem.id.toString(),
      amount: apiItem.amount,
      categoryId: apiItem.category?.id || 1,
      note: apiItem.note,
      date: apiItem.transactionDate,
      type: apiItem.type,
    }));
  }, [apiResponse]);

  const addTransaction = async (data: Omit<Transaction, "id">) => {
    await createMutation.mutateAsync({
      amount: data.amount,
      categoryId: data.categoryId,
      note: data.note,
      date: data.date,
      type: data.type,
    });
  };

  const deleteTransaction = async (id: string) => {
    console.warn("Chưa gọi hàm xoá cho ID trên API:", id);
  };

  const updateTransaction = async (data: Transaction) => {
    console.warn("Chưa gọi hàm cập nhật trên API cho:", data);
  };

  const setMonthlyBudget = async (amount: number) => {
    setBudget(amount);
  };

  const summary = useMemo(() => {
    return summaryResponse?.data || { balance: 0, income: 0, expense: 0 };
  }, [summaryResponse]);

  // Trả về Provider chứa mọi trạng thái
  return (
    <ExpenseContext.Provider
      value={{
        transactions,
        budget,
        addTransaction,
        deleteTransaction,
        updateTransaction,
        setMonthlyBudget,
        summary,
        isLoading,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (!context)
    throw new Error("useExpense must be used within ExpenseProvider");
  return context;
};
