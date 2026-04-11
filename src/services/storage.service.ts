import AsyncStorage from "@react-native-async-storage/async-storage";
import { Transaction } from "../types";

const STORAGE_KEYS = {
  TRANSACTIONS: "@expense_tracker_transactions",
  BUDGET: "@expense_tracker_budget",
};

export const StorageService = {
  async getTransactions(): Promise<Transaction[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("StorageService: Error getting transactions", error);
      return [];
    }
  },

  async saveTransactions(transactions: Transaction[]): Promise<void> {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.TRANSACTIONS,
        JSON.stringify(transactions),
      );
    } catch (error) {
      console.error("StorageService: Error saving transactions", error);
    }
  },

  async getBudget(): Promise<number> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.BUDGET);
      return data ? Number(data) : 0;
    } catch (error) {
      console.error("StorageService: Error getting budget", error);
      return 0;
    }
  },

  async saveBudget(amount: number): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.BUDGET, amount.toString());
    } catch (error) {
      console.error("StorageService: Error saving budget", error);
    }
  },

  async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error("StorageService: Error clearing data", error);
    }
  },
};
