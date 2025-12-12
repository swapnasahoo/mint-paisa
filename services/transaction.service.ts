import { tablesDB } from "@/libs/appwrite";
import { ID, Query } from "react-native-appwrite";

const TRANSACTIONS_DATABASE_ID: string =
  process.env.EXPO_PUBLIC_APPWRITE_DATABASE_TRANSACTIONS_ID!;
const TRANSACTIONS_ENTRIES_TABLE_ID: string =
  process.env.EXPO_PUBLIC_APPWRITE_TABLE_TRANSACTIONS_ENTRIES_ID!;

export async function fetchTransactions(userId: string) {
  try {
    return await tablesDB.listRows({
      databaseId: TRANSACTIONS_DATABASE_ID,
      tableId: TRANSACTIONS_ENTRIES_TABLE_ID,
      queries: [Query.orderDesc("$createdAt"), Query.equal("userId", userId)],
    });
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function createTransaction({
  userId,
  type,
  category,
  amount,
}: {
  userId: string;
  type: string;
  category: string;
  amount: number;
}) {
  try {
    return await tablesDB.createRow({
      databaseId: TRANSACTIONS_DATABASE_ID,
      tableId: TRANSACTIONS_ENTRIES_TABLE_ID,
      rowId: ID.unique(),
      data: {
        userId,
        type,
        category,
        amount,
      },
    });
  } catch (e) {
    console.error(e);
    return null;
  }
}
