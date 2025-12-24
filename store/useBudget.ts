import { create } from "zustand";

type BudgetType = {
  budget: string;
  setBudget: (budget: string) => void;
};

export const useBudget = create<BudgetType>((set) => ({
  budget: "",
  setBudget: (budget) => set({ budget }),
}));
