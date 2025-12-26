import { TransactionRow } from "@/interfaces/TransactionRow";
import { tablesDB } from "@/libs/appwrite";
import { ID, Models, Query } from "react-native-appwrite";

const TRANSACTIONS_DATABASE_ID: string =
  process.env.EXPO_PUBLIC_APPWRITE_DATABASE_TRANSACTIONS_ID!;
const TRANSACTIONS_ENTRIES_TABLE_ID: string =
  process.env.EXPO_PUBLIC_APPWRITE_TABLE_TRANSACTIONS_ENTRIES_ID!;

export async function fetchTransactions(
  userId: string
): Promise<Models.RowList<TransactionRow> | null> {
  try {
    return await tablesDB.listRows({
      databaseId: TRANSACTIONS_DATABASE_ID,
      tableId: TRANSACTIONS_ENTRIES_TABLE_ID,
      queries: [
        Query.orderDesc("transactionDate"),
        Query.equal("userId", userId),
      ],
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
  date,
}: {
  userId: string;
  type: string;
  category: string;
  amount: number;
  date: string;
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
        transactionDate: date,
      },
    });
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function deleteTransaction(transactionId: string) {
  try {
    return await tablesDB.deleteRow({
      databaseId: TRANSACTIONS_DATABASE_ID,
      tableId: TRANSACTIONS_ENTRIES_TABLE_ID,
      rowId: transactionId,
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
}
