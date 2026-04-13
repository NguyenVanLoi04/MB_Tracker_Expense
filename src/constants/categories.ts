import { Category, ETransactionType } from "../types";

export const CATEGORIES: Category[] = [
  // Expenses
  {
    id: 1,
    name: "Thực phẩm",
    icon: "utensils",
    color: "#f87171",
    type: ETransactionType.EXPENSE,
  },
  {
    id: 2,
    name: "Di chuyển",
    icon: "car",
    color: "#60a5fa",
    type: ETransactionType.EXPENSE,
  },
  {
    id: 3,
    name: "Mua sắm",
    icon: "shopping-bag",
    color: "#fbbf24",
    type: ETransactionType.EXPENSE,
  },
  {
    id: 4,
    name: "Giải trí",
    icon: "gamepad-2",
    color: "#a78bfa",
    type: ETransactionType.EXPENSE,
  },
  {
    id: 5,
    name: "Nhà cửa",
    icon: "home",
    color: "#4ade80",
    type: ETransactionType.EXPENSE,
  },
  {
    id: 6,
    name: "Sức khỏe",
    icon: "heart-pulse",
    color: "#f472b6",
    type: ETransactionType.EXPENSE,
  },
  {
    id: 7,
    name: "Giáo dục",
    icon: "graduation-cap",
    color: "#2dd4bf",
    type: ETransactionType.EXPENSE,
  },
  {
    id: 8,
    name: "Khác",
    icon: "more-horizontal",
    color: "#94a3b8",
    type: ETransactionType.EXPENSE,
  },

  // Income
  {
    id: 100,
    name: "Lương",
    icon: "banknote",
    color: "#10b981",
    type: ETransactionType.INCOME,
  },
  {
    id: 101,
    name: "Thưởng",
    icon: "gift",
    color: "#8b5cf6",
    type: ETransactionType.INCOME,
  },
  {
    id: 102,
    name: "Đầu tư",
    icon: "trending-up",
    color: "#3b82f6",
    type: ETransactionType.INCOME,
  },
  {
    id: 103,
    name: "Bán hàng",
    icon: "store",
    color: "#f59e0b",
    type: ETransactionType.INCOME,
  },
];
