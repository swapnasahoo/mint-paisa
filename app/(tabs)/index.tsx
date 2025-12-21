import { TransactionRow } from "@/interfaces/TransactionRow";
import { account } from "@/libs/appwrite";
import { fetchTransactions } from "@/services/transaction.service";
import { makeUserAvatar } from "@/services/userProfile.service";
import { useAvatar } from "@/store/useAvatar";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TransactionCard from "../components/TransactionCard";
import TransactionSummaryCard from "../components/TransactionSummaryCard";

const index = () => {
  StatusBar.setBarStyle("light-content");

  const [isTotalVisible, setIsTotalVisible] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [userId, setUserId] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<TransactionRow[]>([]);
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpense, setTotalExpense] = useState<number>(0);

  const avatarUrl = useAvatar((s) => s.avatarUrl);
  const setAvatarUrl = useAvatar((s) => s.setAvatarUrl);

  // FETCH USER ID AND MAKE AVATAR
  useEffect(() => {
    async function fetchUserId() {
      const user = await account.get();
      setUserId(user.$id);

      // make avatar url
      const avatarApiUrl = makeUserAvatar(user.name || user.email);
      setAvatarUrl(avatarApiUrl);
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
        setIsLoading(false);
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
          {isLoading ? (
            <View className="flex-1 justify-center items-center mt-30">
              <ActivityIndicator size="large" color="white" />
            </View>
          ) : (
            <TransactionSummaryCard
              totalBalance={totalBalance}
              totalIncome={totalIncome}
              totalExpense={totalExpense}
              isTotalVisible={isTotalVisible}
              setIsTotalVisible={setIsTotalVisible}
              topValue={30}
            />
          )}
        </SafeAreaView>
      </View>

      {/* TRANSACTION LIST */}
      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#429690" />
          <Text className="mt-1 text-sm text-teal-800 font-medium">
            Loading transations...
          </Text>
        </View>
      ) : (
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
      )}
    </View>
  );
};

export default index;
