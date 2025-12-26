import { TransactionRow } from "@/interfaces/TransactionRow";
import { formatAmount } from "@/libs/formatAmount";
import { useTransactions } from "@/store/useTransaction";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TransactionDetails = () => {
  const { transactionId } = useLocalSearchParams();

  const transactions = useTransactions((s) => s.transactions);
  const [transaction, setTransaction] = useState<TransactionRow | null>(null);

  useEffect(() => {
    if (!transactionId) return;

    const transactionData = transactions.find((t) => t.$id === transactionId);
    setTransaction(transactionData || null);
  }, [transactionId]);

  return (
    <View className="flex-1 bg-neutral-50">
      <View className="w-full h-100 bg-[#429690] px-6 py-4 rounded-b-2xl">
        {/* HEADER */}
        <SafeAreaView>
          <View className="flex-row items-center justify-between">
            <Ionicons
              name="arrow-back"
              size={24}
              color="white"
              onPress={() => router.back()}
            />

            <Text className="text-white text-lg font-semibold text-center">
              Transaction Details
            </Text>

            <Ionicons
              name="trash-outline"
              size={24}
              color="white"
              onPress={() => {}}
            />
          </View>

          {/* AMOUNT RECEIVED / PAID */}
          <View className="w-full h-full justify-center items-center">
            <Text className="text-sm text-neutral-100">
              {transaction?.type === "income"
                ? "Amount Received"
                : "Amount Paid"}
            </Text>

            <Text className="text-3xl text-neutral-50 font-semibold">
              {transaction?.type === "income" ? "+" : "-"}{" "}
              {formatAmount(transaction?.amount || 0)}
            </Text>
          </View>
        </SafeAreaView>
      </View>

      {/* DETAILS SECTION */}
      <SafeAreaView className="flex-1">
        <View className="px-6">
          <View className="gap-4 bg-neutral-50 shadow-sm elevation-sm rounded-lg p-4 -mt-24">
            {/* CATEGORY */}
            <View className="flex-row items-center gap-4">
              <View className="bg-neutral-200/20 px-2 py-1 border border-neutral-200/30 rounded-lg">
                <Image
                  source={require("../../assets/icons/category-icons/youtube-premium.png")}
                  className="size-7"
                />
              </View>

              <Text className="uppercase font-medium">
                {transaction?.category}
              </Text>
            </View>

            {/* TRANSACTION DATE */}
            <View className="flex-row items-center gap-4">
              <View className="bg-neutral-200/20 px-2 py-1 border border-neutral-200/30 rounded-lg">
                <Ionicons name="calendar-outline" size={24} color="gray" />
              </View>

              <Text className="font-medium">
                {new Date(
                  transaction?.transactionDate || ""
                ).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })}
              </Text>
            </View>

            {/* TRANSACTION ID */}
            <View className="flex-row items-center gap-4">
              <View className="bg-neutral-200/20 px-2 py-1 border border-neutral-200/30 rounded-lg">
                <Ionicons
                  name="information-circle-outline"
                  size={24}
                  color="gray"
                />
              </View>

              <Text className="font-medium">{transaction?.$id}</Text>
            </View>
          </View>

          {/* EDIT TRANSACTION BUTTON */}
          <Pressable
            className="mt-6 px-6 py-4 bg-[#429690] rounded-lg shadow-sm elevation-xs transition-all ease-in-out duration-300 active:opacity-75 active:scale-[0.98]"
            onPress={() => {}}
          >
            <Text className="text-center text-white font-medium">
              Edit Transaction
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default TransactionDetails;
