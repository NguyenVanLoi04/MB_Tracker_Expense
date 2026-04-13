import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { StorageService } from "../services/storage.service";
import { ETransactionType, Summary, Transaction } from "../types";

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
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budget, setBudget] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const [transData, budgetData] = await Promise.all([
        StorageService.getTransactions(),
        StorageService.getBudget(),
      ]);
      setTransactions(transData);
      setBudget(budgetData);
      setIsLoading(false);
    };
    init();
  }, []);

  const addTransaction = async (data: Omit<Transaction, "id">) => {
    const newTransaction: Transaction = {
      ...data,
      id: Date.now().toString(),
    };
    const updated = [newTransaction, ...transactions];
    setTransactions(updated);
    await StorageService.saveTransactions(updated);
  };

  const deleteTransaction = async (id: string) => {
    const updated = transactions.filter((t) => t.id !== id);
    setTransactions(updated);
    await StorageService.saveTransactions(updated);
  };

  const updateTransaction = async (updatedItem: Transaction) => {
    const updated = transactions.map((t) =>
      t.id === updatedItem.id ? updatedItem : t,
    );
    setTransactions(updated);
    await StorageService.saveTransactions(updated);
  };

  const setMonthlyBudget = async (amount: number) => {
    setBudget(amount);
    await StorageService.saveBudget(amount);
  };

  const summary = useMemo(() => {
    return transactions.reduce(
      (acc, t) => {
        if (t.type === ETransactionType.INCOME) {
          acc.income += t.amount;
          acc.balance += t.amount;
        } else {
          acc.expense += t.amount;
          acc.balance -= t.amount;
        }
        return acc;
      },
      { balance: 0, income: 0, expense: 0 },
    );
  }, [transactions]);

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
