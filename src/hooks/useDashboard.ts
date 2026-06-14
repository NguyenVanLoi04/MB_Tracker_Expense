import { format, isSameDay, subDays } from "date-fns";
import { vi } from "date-fns/locale";
import { toZonedTime } from "date-fns-tz";
import { useMemo, useState } from "react";
import { CATEGORIES } from "../constants/categories";
import { APP_TIME_ZONE } from "../constants/date";
import { useExpense } from "../context/ExpenseContext";
import { CategoryStat, ETransactionType } from "../types";

export const useDashboard = () => {
  const { summary, transactions } = useExpense();
  const [modalVisible, setModalVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  const recentTransactions = useMemo(
    () => transactions.slice(0, 5),
    [transactions],
  );

  const categoryStats = useMemo(() => {
    if (transactions.length === 0 || summary.expense === 0) return [];

    return CATEGORIES.filter((cat) => cat.type === ETransactionType.EXPENSE)
      .map((cat) => {
        const total = transactions
          .filter(
            (t) =>
              t.categoryId === cat.id && t.type === ETransactionType.EXPENSE,
          )
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
    const today = toZonedTime(new Date(), APP_TIME_ZONE);
    
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = subDays(today, 6 - i);
      return {
        date,
        dayName: format(date, "EE", { locale: vi }),
        amount: 0,
      };
    });

    transactions.forEach((t) => {
      if (t.type === ETransactionType.EXPENSE) {
        const transDate = toZonedTime(new Date(t.date), APP_TIME_ZONE);
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
    recentTransactions,
    categoryStats,
    modalVisible,
    setModalVisible,
    detailVisible,
    setDetailVisible,
    selectedTransaction,
    setSelectedTransaction,
    weeklySpending,
  };
};
