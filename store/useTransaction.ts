import { TransactionRow } from "@/interfaces/TransactionRow";
import { create } from "zustand";

type TransactionType = {
  transactions: TransactionRow[];
  isLoading: boolean;
  setTransactions: (transactions: TransactionRow[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  addTransaction?: (transaction: TransactionRow) => void;
};

export const useTransactions = create<TransactionType>((set) => ({
  transactions: [],
  isLoading: true,
  setTransactions: (transactions) => set({ transactions: transactions }),
  setIsLoading: (isLoading) => set({ isLoading }),
  addTransaction: (transaction) =>
    set((s) => {
      const sortedTransactions = [...s.transactions, transaction].sort(
        (a, b) =>
          new Date(b.transactionDate).getTime() -
          new Date(a.transactionDate).getTime()
      );

      return { transactions: sortedTransactions };
    }),
}));
