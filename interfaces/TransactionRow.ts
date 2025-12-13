import { Models } from "react-native-appwrite";

export interface TransactionRow extends Models.Row {
  userId: string;
  type: "income" | "expense";
  category: string;
  amount: number;
}
