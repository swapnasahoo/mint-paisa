import { formatAmount } from "@/libs/formatAmount";
import { useTransactions } from "@/store/useTransaction";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { StatusBar, Text, View } from "react-native";
import { PieChart, pieDataItem } from "react-native-gifted-charts";
import { SafeAreaView } from "react-native-safe-area-context";

const StatsScreen = () => {
  StatusBar.setBarStyle("light-content");

  // useTransactions store
  const transactions = useTransactions((s) => s.transactions);

  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpense, setTotalExpense] = useState<number>(0);
  const [totalFlow, setTotalFlow] = useState<number>(0);
  const savings: number = totalIncome - totalExpense;

  const [focusedIndex, setFocusedIndex] = useState<number>(0);

  const donutChartData: pieDataItem[] = [
    {
      value: totalIncome,
      color: "#34d399",
      gradientCenterColor: "#4fbfa1",
      onPress: () => setFocusedIndex(0),
    },
    {
      value: totalExpense,
      color: "#f77170",
      gradientCenterColor: "#e46a68",
      onPress: () => setFocusedIndex(1),
    },
  ];

  // FETCH BALANCES
  useEffect(() => {
    const income = transactions.reduce((acc, transaction) => {
      return transaction.type === "income" ? acc + transaction.amount : acc;
    }, 0);

    const expense = transactions.reduce((acc, transaction) => {
      return transaction.type === "expense" ? acc + transaction.amount : acc;
    }, 0);

    const flow = (income || 0) + (expense || 0);

    setTotalIncome(income || 0);
    setTotalExpense(expense || 0);
    setTotalFlow(flow || 0);
  }, [transactions]);

  return (
    <View className="flex-1 bg-[#429690]">
      <SafeAreaView className="flex-1">
        {/* HEADER */}
        <View className="flex-row items-center justify-between px-6 py-4">
          <Ionicons name="arrow-back" size={24} color="white" />

          <Text className="text-white text-lg font-semibold">Statistics</Text>

          <Ionicons name="download-outline" size={24} color="white" />
        </View>

        {/* STATS CONTENT */}
        <View className="mt-6 bg-neutral-50 h-full z-10 rounded-t-4xl px-6 py-4">
          {/* INCOME VS EXPENSE */}
          <View className="bg-neutral-50 shadow-sm elevation-sm px-6 py-4 rounded-lg">
            <Text className="text-lg font-medium mb-2">Income vs Expense</Text>

            {/* TOTAL CASH FLOW */}
            <View className="mx-auto">
              <Text className="text-center text-xs">Total Cash Flow</Text>
              <Text className="text-center text-sm font-semibold">
                {formatAmount(totalFlow)}
              </Text>
            </View>

            {/* INCOME VS EXPENSE CHART */}
            <View className="mx-auto">
              <PieChart
                data={donutChartData}
                donut
                innerRadius={70}
                radius={100}
                focusOnPress
                showGradient
                centerLabelComponent={() => {
                  return (
                    <View>
                      {focusedIndex === 0 ? (
                        <>
                          <Text className="text-center text-sm">Income</Text>
                          <Text className="text-center text-xl font-semibold">
                            {formatAmount(totalIncome)}
                          </Text>
                        </>
                      ) : focusedIndex === 1 ? (
                        <>
                          <Text className="text-center text-sm">Expense</Text>
                          <Text className="text-center text-xl font-semibold">
                            {formatAmount(totalExpense)}
                          </Text>
                        </>
                      ) : (
                        ""
                      )}
                    </View>
                  );
                }}
              />

              {/* LEGENDS */}
              <View className="mx-auto mt-2 flex-row gap-4 items-center">
                {/* INCOME LEGEND */}
                <View className="flex-row items-center gap-1">
                  <View className="h-4 w-4 bg-linear-0 from-[#34d399] to-[#4fbfa1] rounded-sm" />
                  <Text className="text-neutral-600">Income</Text>
                </View>

                {/* EXPENSE LEGEND */}
                <View className="flex-row items-center gap-1">
                  <View className="h-4 w-4 bg-linear-0 from-[#f77170] to-[#e46a68] rounded-sm" />
                  <Text className="text-neutral-600">Expense</Text>
                </View>
              </View>
            </View>

            {/* PERCENTAGE IN TOTAL BALANCE */}
            <View className="flex-row mt-4 gap-4">
              {/* INCOME PERCENTAGE */}
              <View className="flex-1 bg-green-400/20 px-3 py-1 rounded-lg border border-green-400/25">
                <Text className="text-sm text-green-700">Income</Text>
                <Text className="text-green-500 text-lg font-semibold">
                  {((totalIncome / totalFlow) * 100 || 0).toFixed(2)}%
                </Text>
              </View>

              {/* EXPENSE PERCENTAGE */}
              <View className="flex-1 bg-red-400/20 px-3 py-1 rounded-lg border border-red-400/25">
                <Text className="text-sm text-red-700">Expense</Text>
                <Text className="text-red-500 text-lg font-semibold">
                  {((totalExpense / totalFlow) * 100 || 0).toFixed(2)}%
                </Text>
              </View>
            </View>
          </View>

          {/* SAVINGS STATS */}
          <View className="bg-neutral-50 shadow-sm elevation-sm p-5 rounded-xl mt-4 border border-neutral-200">
            <Text className="text-sm text-neutral-500 mb-1">Total savings</Text>

            <View className="flex-row items-baseline gap-1">
              <Text
                className={`text-2xl font-semibold ${
                  savings > 0
                    ? "text-green-600"
                    : savings < 0
                    ? "text-red-600"
                    : "text-neutral-600"
                }`}
              >
                {savings > 0 ? "+" : ""}
                {formatAmount(totalIncome - totalExpense)}
              </Text>

              <Text className="text-sm text-neutral-500">
                from your transaction history
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default StatsScreen;
