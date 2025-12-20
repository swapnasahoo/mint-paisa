import { formatAmount } from "@/libs/formatAmount";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface TransactionSummaryCardProps {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
  isTotalVisible: boolean;
  setIsTotalVisible: (isTotalVisible: boolean) => void;
  topValue?: number;
}

const TransactionSummaryCard = ({
  totalBalance,
  totalIncome,
  totalExpense,
  isTotalVisible,
  setIsTotalVisible,
  topValue,
}: TransactionSummaryCardProps) => {
  return (
    <View
      className={`w-full h-60 bg-linear-to-br from-[#429690] to-[#2F7E79] z-10 mx-auto top-${topValue} rounded-2xl px-6 py-4 shadow-lg elevation-lg`}
    >
      {/* TOTAL BALANCE */}
      <View>
        <Pressable
          className="flex-row items-center gap-2"
          onPress={() => setIsTotalVisible(!isTotalVisible)}
        >
          <Text className="text-white text-lg font-semibold">
            Total Balance
          </Text>
          <Ionicons
            name={isTotalVisible ? "chevron-up" : "chevron-down"}
            size={24}
            color="white"
          />
        </Pressable>

        {/* BALANCE */}
        <Text
          className={`text-white text-3xl font-bold ${
            isTotalVisible ? "block" : "hidden"
          }`}
        >
          {formatAmount(totalBalance)}
        </Text>
      </View>

      {/* INCOME + EXPENSE SUMMARY */}
      <View className="flex-row items-center justify-between mt-auto">
        {/* INCOME */}
        <View>
          <View className="flex-row items-center gap-2">
            <View className="bg-white/15 p-1 rounded-full">
              <Ionicons name="arrow-down" size={18} color="white" />
            </View>
            <Text className="text-[#D0E5E4] font-medium">Income</Text>
          </View>
          {/* INCOME BALANCE */}
          <Text className="text-xl text-white font-semibold text-right">
            {formatAmount(totalIncome)}
          </Text>
        </View>

        {/* EXPENSE */}
        <View>
          <View className="flex-row items-center gap-2">
            <View className="bg-white/15 p-1 rounded-full">
              <Ionicons name="arrow-up" size={18} color="white" />
            </View>
            <Text className="text-[#D0E5E4] font-medium">Expense</Text>
          </View>
          {/* INCOME BALANCE */}
          <Text className="text-xl text-white font-semibold text-right">
            {formatAmount(totalExpense)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TransactionSummaryCard;
