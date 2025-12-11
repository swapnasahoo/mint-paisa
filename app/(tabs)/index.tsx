import { View, Text, StatusBar, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const index = () => {
  StatusBar.setBarStyle("light-content");

  const [isTotalVisible, setIsTotalVisible] = useState<boolean>(true);

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
          <View className="w-full h-60 bg-[#2F7E79] z-10 mx-auto top-40 rounded-2xl px-6 py-4 shadow-lg elevation-lg">
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
                className={`text-white text-3xl font-bold ${isTotalVisible ? "block" : "hidden"}`}
              >
                ₹500.00
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
                  ₹1000.00
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
                  ₹500.00
                </Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </View>

      {/* TRANSACTION LIST */}
      <View className="flex-1 mt-[100px] px-6 py-4">
        <Text className="text-lg font-semibold">Transactions history</Text>

        {/* TRANSACTION CARD */}
        <View className="flex-row items-center gap-3 mt-2 mb-2">
          {/* LOGO / CATEGORY ICON */}
          <View className="bg-neutral-200/50 border border-neutral-200/60 p-2 rounded-lg items-center justify-center">
            <Image
              source={require("../../assets/icons/category-icons/youtube-premium.png")}
              className="size-8"
            />
          </View>

          {/* BRAND / CATEGORY NAME + DATE */}
          <View>
            <Text className="font-medium">Youtube</Text>
            <Text className="text-[#666666] text-sm">Dec 11, 2025</Text>
          </View>

          {/* TRANSACTION AMOUNT */}
          <View className="ml-auto">
            <Text className="text-lg text-[#F95B51] font-semibold">- ₹500</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default index;
