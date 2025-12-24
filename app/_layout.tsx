import { account } from "@/libs/appwrite";
import { fetchTransactions } from "@/services/transaction.service";
import { makeUserAvatar } from "@/services/userProfile.service";
import { useTransactions } from "@/store/useTransaction";
import { useUser } from "@/store/useUser";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import "../global.css";

export default function RootLayout() {
  const [userId, setUserId] = useState<string>("");

  const setName = useUser((s) => s.setName);
  const setEmail = useUser((s) => s.setEmail);
  const setAvatarUrl = useUser((s) => s.setAvatarUrl);
  const setCity = useUser((s) => s.setCityName);

  const transactions = useTransactions((s) => s.transactions);

  const setTransactions = useTransactions((s) => s.setTransactions);
  const setTotalIncome = useTransactions((s) => s.setTotalIncome);
  const setTotalExpense = useTransactions((s) => s.setTotalExpense);
  const setTotalBalance = useTransactions((s) => s.setTotalBalance);
  const setTotalFlow = useTransactions((s) => s.setTotalFlow);

  const setIsLoading = useTransactions((s) => s.setIsLoading);

  // fetch user data on app load
  useEffect(() => {
    async function fetchUserData() {
      const user = await account.get();
      setUserId(user.$id || "");

      setName(user.name || user.email.split("@")[0] || "");
      setEmail(user.email);
      setAvatarUrl(makeUserAvatar(user.name || user.email.split("@")[0] || ""));
      setCity(user.prefs.cityName || "");
      console.log("User data fetched:", user);
    }
    fetchUserData();
  }, []);

  // fetch user transactions on app load
  useEffect(() => {
    async function fetchUserTransactions() {
      if (!userId) {
        setIsLoading(false);
        return;
      }

      const transactionData = await fetchTransactions(userId);
      setTransactions(transactionData?.rows || []);

      const income = transactionData?.rows.reduce((acc, transaction) => {
        return transaction.type === "income" ? acc + transaction.amount : acc;
      }, 0);

      const expense = transactionData?.rows.reduce((acc, transaction) => {
        return transaction.type === "expense" ? acc + transaction.amount : acc;
      }, 0);

      const balance = (income || 0) - (expense || 0);
      const flow = (income || 0) + (expense || 0);

      setTotalIncome(income || 0);
      setTotalExpense(expense || 0);
      setTotalBalance(balance || 0);
      setTotalFlow(flow || 0);
      console.log("Transactions fetched:", transactionData?.rows || []);

      setIsLoading(false);
    }

    fetchUserTransactions();
  }, [userId]);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />

      <Toast />
    </>
  );
}
