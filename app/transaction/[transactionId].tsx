import { TransactionRow } from "@/interfaces/TransactionRow";
import { useTransactions } from "@/store/useTransaction";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

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
    <View>
      <Text>TransactionDetails</Text>
    </View>
  );
};

export default TransactionDetails;
