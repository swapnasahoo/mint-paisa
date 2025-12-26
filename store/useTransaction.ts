import { TransactionRow } from "@/interfaces/TransactionRow";
import { create } from "zustand";

type TransactionType = {
  transactions: TransactionRow[];
  totalIncome: number;
  totalExpense: number;
  totalBalance: number;
  totalFlow: number;
  isLoading: boolean;
  setTransactions: (transactions: TransactionRow[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  addTransaction: (transaction: TransactionRow) => void;
  deleteTransaction: (transactionId: string) => void;
  setTotalIncome: (income: number) => void;
  setTotalExpense: (expense: number) => void;
  setTotalBalance: (balnce: number) => void;
  setTotalFlow: (flow: number) => void;
};

export const useTransactions = create<TransactionType>((set) => ({
  transactions: [],
  totalIncome: 0,
  totalExpense: 0,
  totalBalance: 0,
  totalFlow: 0,
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
  deleteTransaction: (transactionId) =>
    set((s) => {
      const updatedData = s.transactions.filter((t) => t.$id !== transactionId);

      return { transactions: updatedData };
    }),
  setTotalIncome: (income) => set({ totalIncome: income }),
  setTotalExpense: (expense) => set({ totalExpense: expense }),
  setTotalBalance: (balance) => set({ totalBalance: balance }),
  setTotalFlow: (flow) => set({ totalFlow: flow }),
}));
