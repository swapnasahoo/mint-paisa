import { account } from "@/libs/appwrite";
import { fetchTransactions } from "@/services/transaction.service";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { StatusBar, Text, View } from "react-native";
import { PieChart, pieDataItem } from "react-native-gifted-charts";
import { SafeAreaView } from "react-native-safe-area-context";

const StatsScreen = () => {
  StatusBar.setBarStyle("dark-content");

  const [userId, setUserId] = useState<string>("");
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpense, setTotalExpense] = useState<number>(0);

  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const donutChartData: pieDataItem[] = [
    {
      value: totalIncome,
      color: "#3CB371",
      onPress: () => setFocusedIndex(0),
    },
    {
      value: totalExpense,
      color: "#F95B51",
      onPress: () => setFocusedIndex(1),
    },
  ];

  // LOAD USER ID
  useEffect(() => {
    async function loadUserId() {
      const user = await account.get();
      setUserId(user.$id);
    }
    loadUserId();
  }, []);

  // FETCH BALANCES
  useFocusEffect(
    useCallback(() => {
      let isActive: boolean = true;
      async function fetchBalances() {
        if (!userId) return;

        const transaction = await fetchTransactions(userId);

        const balance = transaction?.rows.reduce((acc, transaction) => {
          return acc + transaction.amount;
        }, 0);

        const income = transaction?.rows.reduce((acc, transaction) => {
          return transaction.type === "income" ? acc + transaction.amount : acc;
        }, 0);

        const expense = transaction?.rows.reduce((acc, transaction) => {
          return transaction.type === "expense"
            ? acc + transaction.amount
            : acc;
        }, 0);

        setTotalIncome(income || 0);
        setTotalExpense(expense || 0);
        setTotalBalance(balance || 0);
      }
      isActive && fetchBalances();

      return () => {
        isActive = false;
      };
    }, [userId])
  );

  return (
    <View className="flex-1 bg-neutral-50 px-6 py-4">
      <SafeAreaView className="flex-1">
        {/* HEADER */}
        <View className="flex-row items-center justify-between">
          <Ionicons name="arrow-back" size={24} color="black" />

          <Text className="text-black text-lg font-semibold">Statistics</Text>

          <Ionicons name="download-outline" size={24} color="black" />
        </View>

        {/* STATS CONTENT */}
        <View className="mt-6">
          {/* INCOME VS EXPENSE CHART */}
          <View className="mx-auto">
            <PieChart
              data={donutChartData}
              donut
              innerRadius={70}
              radius={100}
              focusOnPress
              centerLabelComponent={() => {
                return (
                  <Text className="text-2xl font-medium text-gray-800 text-center">
                    {focusedIndex === null
                      ? `Total\n${totalBalance}`
                      : focusedIndex === 0
                      ? `${((totalIncome / totalBalance) * 100).toFixed(2)}%`
                      : `${((totalExpense / totalBalance) * 100).toFixed(2)}%`}
                  </Text>
                );
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default StatsScreen;
