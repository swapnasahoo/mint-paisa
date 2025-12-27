import { transactinCategoryIcons } from "@/constants/data/transactionCategoryIcons";
import { TransactionRow } from "@/interfaces/TransactionRow";
import { formatAmount } from "@/libs/formatAmount";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

const TransactionCard = ({ data }: { data: TransactionRow }) => {
  return (
    <Pressable
      className="flex-row items-center gap-3 mt-2 mb-2 bg-neutral-50 px-4 py-3 shadow-sm elevation-sm rounded-lg transition-all ease-in-out duration-300 active:opacity-75 active:scale-[0.98]"
      onPress={() => router.push(`/transaction/${data.$id}`)}
    >
      {/* LOGO / CATEGORY ICON */}
      <View className="bg-neutral-200/50 border border-neutral-200/60 p-2 rounded-lg items-center justify-center">
        {transactinCategoryIcons[data.category]}
      </View>

      {/* BRAND / CATEGORY NAME + DATE */}
      <View>
        <Text className="font-medium uppercase w-full">{data.category}</Text>
        <Text className="text-[#666666] text-sm">
          {new Date(data.transactionDate || data.$createdAt).toLocaleDateString(
            "en-IN",
            {
              year: "numeric",
              month: "short",
              day: "2-digit",
            }
          )}
        </Text>
      </View>

      {/* TRANSACTION AMOUNT */}
      <View className="ml-auto">
        <Text
          className={`${
            data.type === "income" ? "text-[#3CB371]" : "text-[#F95B51]"
          } text-lg font-semibold`}
        >
          {`${data.type === "income" ? "+" : "-"} ${formatAmount(
            data.amount
          )} `}
        </Text>
      </View>
    </Pressable>
  );
};

export default TransactionCard;
