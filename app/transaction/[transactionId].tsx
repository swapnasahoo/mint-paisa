import { transactinCategoryIcons } from "@/constants/data/transactionCategoryIcons";
import { TransactionRow } from "@/interfaces/TransactionRow";
import { formatAmount } from "@/libs/formatAmount";
import showToast from "@/libs/showToast";
import {
  deleteTransaction,
  updateTransaction,
} from "@/services/transaction.service";
import { useTransactions } from "@/store/useTransaction";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TransactionDetails = () => {
  const { transactionId } = useLocalSearchParams();

  const transactions = useTransactions((s) => s.transactions);
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const [transaction, setTransaction] = useState<TransactionRow | null>(null);
  const deleteTransactionStore = useTransactions((s) => s.deleteTransaction);
  const updateTransactionStore = useTransactions((s) => s.updateTransaction);

  const [isUpdateModalVisible, setIsUpdateModalVisible] =
    useState<boolean>(false);

  useEffect(() => {
    if (!transactionId) return;

    const transactionData = transactions.find((t) => t.$id === transactionId);
    setTransaction(transactionData || null);
    setAmount(transactionData?.amount.toString() || "");
    setDate(new Date(transactionData?.transactionDate || Date.now()));
  }, [transactionId]);

  async function handleDeleteTransaction() {
    Alert.alert("Are you sure?", "This action cannot be undone.", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteTransaction(transaction?.$id || "");
            deleteTransactionStore(transaction?.$id || "");
            router.replace("/(tabs)");

            showToast({
              type: "success",
              text1: "Transaction deleted successfully",
            });
          } catch (e) {
            console.error(e);
            showToast({
              type: "error",
              text1: "Failed to delete transaction",
            });
          }
        },
      },
    ]);
  }

  async function handleUpdateTransaction() {
    Alert.alert(
      "Update Transaction",
      "Are you sure you want to update this transaction?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Update",
          style: "destructive",
          onPress: async () => {
            try {
              await updateTransaction(transaction?.$id || "", {
                amount: Number(amount),
                transactionDate: date.toISOString(),
              });
              updateTransactionStore(transaction?.$id || "", {
                amount: Number(amount),
                transactionDate: date.toISOString(),
              });

              showToast({
                type: "success",
                text1: "Transaction updated successfully",
              });
            } catch (e) {
              console.error(e);
              showToast({
                type: "error",
                text1: "Failed to update transaction. Please try again.",
              });
            }
          },
        },
      ]
    );
  }

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
              onPress={handleDeleteTransaction}
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
                {transactinCategoryIcons[transaction?.category || ""]}
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
            onPress={() => setIsUpdateModalVisible(true)}
          >
            <Text className="text-center text-white font-medium">
              Edit Transaction
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>

      {/* UPDATE MODAL */}
      <Modal visible={isUpdateModalVisible} transparent animationType="fade">
        <View className="flex-1 justify-center items-center">
          {/* OVERLAY */}
          <Pressable
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
            onPress={() => setIsUpdateModalVisible(false)}
          />

          {/* MODAL CONTENT */}
          <View className="bg-neutral-50 w-95 h-80 shadow-sm elevation-xs rounded-lg p-6">
            <Text className="text-lg font-semibold mb-4">
              Update Transaction
            </Text>

            {/* INPUT FIELDS */}
            <View>
              {/* AMOUNT INPUT */}
              <View>
                <Text className="text-sm text-[#666666] font-semibold tracking-wide">
                  AMOUNT
                </Text>
                <TextInput
                  placeholder="0"
                  keyboardType="numeric"
                  style={style.inputStyle}
                  value={amount}
                  onChangeText={(item) => {
                    if (item.length > 10) return;

                    const cleaned: string = item.replace(/[^0-9]/g, "");
                    setAmount(cleaned);
                  }}
                />
              </View>

              {/* DATE INPUT */}
              <View>
                <Text className="text-sm text-[#666666] font-semibold tracking-wide">
                  DATE
                </Text>
                <Pressable
                  style={style.inputStyle}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text>{date.toLocaleDateString("en-IN")}</Text>
                </Pressable>

                {showDatePicker && (
                  <DateTimePicker
                    value={date}
                    display="spinner"
                    onChange={(event, selectedDate) => {
                      setDate(selectedDate || date);
                      setShowDatePicker(false);
                    }}
                  />
                )}
              </View>
            </View>

            {/* UPDATE BUTTON */}
            <View className="mt-4">
              <Pressable
                className="bg-[#69AEA9] px-6 py-2 rounded-md shadow-md elevation-sm transition-all duration-300 ease-in-out active:opacity-75 active:scale-[0.98]"
                onPress={() => {
                  handleUpdateTransaction();
                  setIsUpdateModalVisible(false);
                }}
              >
                <Text className="text-lg text-white font-medium text-center uppercase">
                  Update
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const style = StyleSheet.create({
  inputStyle: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 10,
    marginTop: 6,
  },
});

export default TransactionDetails;
