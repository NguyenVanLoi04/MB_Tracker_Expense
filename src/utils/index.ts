import { format } from "date-fns";
import { vi } from "date-fns/locale";

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

export const formatDate = (
  date: string | Date,
  pattern: string = "dd/MM/yyyy",
): string => {
  return format(new Date(date), pattern, { locale: vi });
};

export const formatFullDateTime = (date: string | Date): string => {
  return format(new Date(date), "HH:mm - dd/MM/yyyy", { locale: vi });
};
