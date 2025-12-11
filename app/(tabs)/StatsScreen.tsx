import { View, Text, StatusBar } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const StatsScreen = () => {
  StatusBar.setBarStyle("dark-content");

  return (
    <View className="flex-1 bg-neutral-50 px-6 py-4">
      <SafeAreaView className="flex-1">
        {/* HEADER */}
        <View className="flex-row items-center justify-between">
          <Ionicons name="arrow-back" size={24} color="black" />

          <Text className="text-black text-lg font-semibold">Statistics</Text>

          <Ionicons name="download-outline" size={24} color="black" />
        </View>

        {/* SUMMARY */}
        <View className="mt-6">
          <Text className="text-2xl text-black font-bold">Balance: ₹500</Text>
          <Text className="text-lg text-black font-semibold">
            Income: ₹1000.00
          </Text>
          <Text className="text-lg text-black font-semibold">
            Expense: ₹500.00
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default StatsScreen;
