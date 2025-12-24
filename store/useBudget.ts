import { create } from "zustand";

type BudgetType = {
  budget: number;
  setBudget: (budget: number) => void;
};

export const useBudget = create<BudgetType>((set) => ({
  budget: 0,
  setBudget: (budget) => set({ budget }),
}));
