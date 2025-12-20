import { TransactionRow } from "@/interfaces/TransactionRow";
import { account } from "@/libs/appwrite";
import { fetchTransactions } from "@/services/transaction.service";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Pressable, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TransactionCard from "../components/TransactionCard";
import TransactionSummaryCard from "../components/TransactionSummaryCard";

const index = () => {
  StatusBar.setBarStyle("light-content");

  const [isTotalVisible, setIsTotalVisible] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<TransactionRow[]>([]);
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpense, setTotalExpense] = useState<number>(0);

  // FETCH USER ID
  useEffect(() => {
    async function fetchUserId() {
      const user = await account.get();
      setUserId(user.$id);
    }

    fetchUserId();
  }, []);

  // FETCH USER TRANSACTIONS
  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      async function fetchUserTransactions() {
        if (!userId) return;

        const data = await fetchTransactions(userId);
        setTransactions(data?.rows || []);

        // CALCULATE TOTALS
        let balance = data?.rows.reduce((acc, transaction) => {
          return acc + transaction.amount;
        }, 0);

        const income = data?.rows.reduce((acc, transaction) => {
          return transaction.type === "income" ? acc + transaction.amount : acc;
        }, 0);

        const expense = data?.rows.reduce((acc, transaction) => {
          return transaction.type === "expense"
            ? acc + transaction.amount
            : acc;
        }, 0);

        setTotalBalance(balance || 0);
        setTotalIncome(income || 0);
        setTotalExpense(expense || 0);
      }
      isActive && fetchUserTransactions();

      return () => {
        isActive = false;
      };
    }, [userId])
  );

  return (
    <View className="flex-1 bg-neutral-50">
      <View className="w-full h-[50%] bg-[#429690] px-6 py-4 rounded-b-2xl">
        <SafeAreaView className="flex-1 overflow-hidden">
          <View className="flex-row items-center">
            <View>
              <Text className="text-white text-sm ">Good afternoon!</Text>
              <Text className="text-white font-semibold text-xl">
                SwapnaSahoo
              </Text>
            </View>

            <Pressable className="ml-auto bg-white/15 p-2 rounded-lg transition-all duration-300 ease-in-out active:opacity-75 active:scale-[0.98]">
              <Ionicons name="notifications-outline" size={24} color="white" />

              {/* MOCK NOTIFICATION INDICATION */}
              <View className="size-2 bg-[#FFAB7B] rounded-full absolute top-3 right-3" />
            </Pressable>
          </View>

          {/* TRANSACTION SUMMARY CARD */}
          <TransactionSummaryCard
            totalBalance={totalBalance}
            totalIncome={totalIncome}
            totalExpense={totalExpense}
            isTotalVisible={isTotalVisible}
            setIsTotalVisible={setIsTotalVisible}
          />
        </SafeAreaView>
      </View>

      {/* TRANSACTION LIST */}
      <View className="flex-1 mt-[60px] px-6 py-4">
        <Text className="text-lg font-semibold">Transactions history</Text>

        <FlatList
          data={transactions}
          keyExtractor={(item) => item.$id}
          showsVerticalScrollIndicator={false}
          className="mt-4"
          contentContainerStyle={{ paddingHorizontal: 2 }}
          renderItem={({ item }) => (
            /* TRANSACTION CARD */
            <TransactionCard data={item} />
          )}
        />
      </View>
    </View>
  );
};

export default index;
