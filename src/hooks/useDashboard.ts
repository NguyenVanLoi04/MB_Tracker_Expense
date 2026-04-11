import { format, isSameDay, subDays } from "date-fns";
import { vi } from "date-fns/locale";
import { useMemo, useState } from "react";
import { CATEGORIES } from "../constants/categories";
import { useExpense } from "../context/ExpenseContext";
import { CategoryStat } from "../types";

export const useDashboard = () => {
  const { summary, transactions, budget, setMonthlyBudget } = useExpense();
  const [modalVisible, setModalVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [budgetInput, setBudgetInput] = useState(budget.toString());

  const recentTransactions = useMemo(
    () => transactions.slice(0, 5),
    [transactions],
  );

  const budgetProgress = useMemo(
    () => (budget > 0 ? Math.min(100, (summary.expense / budget) * 100) : 0),
    [summary.expense, budget],
  );

  const categoryStats = useMemo(() => {
    if (transactions.length === 0 || summary.expense === 0) return [];

    return CATEGORIES.filter((cat) => cat.type === "expense")
      .map((cat) => {
        const total = transactions
          .filter((t) => t.categoryId === cat.id && t.type === "expense")
          .reduce((sum, t) => sum + t.amount, 0);

        return total > 0
          ? {
              ...cat,
              total,
              percentage: (total / summary.expense) * 100,
            }
          : null;
      })
      .filter((item): item is CategoryStat => item !== null)
      .sort((a, b) => b.total - a.total);
  }, [transactions, summary.expense]);

  const weeklySpending = useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = subDays(new Date(), 6 - i);
      return {
        date,
        dayName: format(date, "EE", { locale: vi }),
        amount: 0,
      };
    });

    transactions.forEach((t) => {
      if (t.type === "expense") {
        const transDate = new Date(t.date);
        last7Days.forEach((day) => {
          if (isSameDay(transDate, day.date)) {
            day.amount += t.amount;
          }
        });
      }
    });

    return last7Days.map((d) => ({
      day: d.dayName,
      amount: d.amount,
    }));
  }, [transactions]);

  return {
    summary,
    transactions,
    budget,
    budgetInput,
    setBudgetInput,
    isEditingBudget,
    setIsEditingBudget,
    budgetProgress,
    recentTransactions,
    categoryStats,
    modalVisible,
    setModalVisible,
    detailVisible,
    setDetailVisible,
    selectedTransaction,
    setSelectedTransaction,
    setMonthlyBudget,
    weeklySpending,
  };
};
