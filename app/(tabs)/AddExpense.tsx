import {
  View,
  Text,
  StatusBar,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import { useEffect, useState } from "react";
import { account } from "@/libs/appwrite";

interface DropdownItems {
  label: string;
  value: string;
}

const AddExpense = () => {
  StatusBar.setBarStyle("light-content");

  const [type, setType] = useState<"income" | "expense">("income");
  const [category, setCategory] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  const typeDropdownList: DropdownItems[] = [
    { label: "Income", value: "income" },
    { label: "Expense", value: "expense" },
  ];

  const incomeCategoryDropdownList: DropdownItems[] = [
    { label: "Salary", value: "salary" },
    { label: "Freelance", value: "freelance" },
    { label: "Rent", value: "rent" },
    { label: "Stock Gains", value: "stockGains" },
    { label: "Crypto Gains", value: "cryptoGains" },
    { label: "Gifts", value: "gifts" },
    { label: "Refund", value: "refund" },
    { label: "Cashback", value: "cashback" },
    { label: "Others", value: "others" },
  ];

  const expenseCategoryDropdownList: DropdownItems[] = [
    { label: "Ecommerce", value: "ecommerce" },
    { label: "Clothes", value: "clothes" },
    { label: "Food", value: "food" },
    { label: "Travel", value: "travel" },
    { label: "Transport", value: "transport" },
    { label: "Fuel", value: "fuel" },
    { label: "Entertainment", value: "entertainment" },
    { label: "Electricity", value: "electricity" },
    { label: "YouTube Premium", value: "youtubePremium" },
    { label: "Spotify Premium", value: "spotifyPremium" },
    { label: "LinkedIn Premium", value: "linkedinPremium" },
    { label: "JioHotstar Premium", value: "jioHotstarPremium" },
    { label: "Netflix Subscription", value: "netflixSubscription" },
    { label: "Others", value: "others" },
  ];

  useEffect(() => {
    setCategory("");
  }, [type]);

  useEffect(() => {
    async function loadUserId() {
      const user = await account.get();
      setUserId(user.$id);
    }
    loadUserId();
  }, []);

  return (
    <View className="flex-1 bg-neutral-50">
      <View className="w-full h-[50%] bg-[#429690] px-6 py-4 rounded-b-2xl">
        <SafeAreaView className="flex-1 overflow-hidden">
          {/* HEADER */}
          <View className="flex-row items-center justify-between">
            <Ionicons name="arrow-back" size={24} color="white" />

            <Text className="text-white text-lg font-semibold">
              Add Expense
            </Text>

            <Ionicons name="ellipsis-horizontal" size={24} color="white" />
          </View>

          {/* CREATE TRANSACTION FORM */}
          <View className="w-full h-140 bg-neutral-100 z-10 mx-auto top-20 rounded-2xl px-6 py-8 gap-4 shadow-md elevation-sm">
            {/* TYPE */}
            <View>
              <Text className="text-sm text-[#666666] font-semibold">TYPE</Text>
              <Dropdown
                data={typeDropdownList}
                labelField="label"
                valueField="value"
                value={type}
                onChange={(item) => setType(item.value)}
                style={style.inputStyle}
                containerStyle={style.dropdownContainerStyle}
                selectedTextStyle={style.dropdownSelectedText}
                renderRightIcon={() => (
                  <Ionicons name="chevron-down" size={18} color="black" />
                )}
              />
            </View>

            {/* CATEGORY */}
            <View>
              <Text className="text-sm text-[#666666] font-semibold">
                CATEGORY
              </Text>
              <Dropdown
                data={
                  type === "income"
                    ? incomeCategoryDropdownList
                    : expenseCategoryDropdownList
                }
                labelField="label"
                valueField="value"
                placeholder="Select Category"
                value={category}
                onChange={(item) => setCategory(item.value)}
                style={style.inputStyle}
                containerStyle={style.dropdownContainerStyle}
                selectedTextStyle={style.dropdownSelectedText}
                renderRightIcon={() => (
                  <Ionicons name="chevron-down" size={18} color="black" />
                )}
              />
            </View>

            {/* AMOUNT */}
            <View>
              <Text className="text-sm text-[#666666] font-semibold">
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

            {/* CREATE BUTTON */}
            <Pressable className="bg-[#69AEA9] px-6 py-2 mt-2 rounded-md shadow-md elevation-sm transition-all duration-300 ease-in-out active:opacity-75 active:scale-[0.98]">
              <Text className="text-lg text-white font-medium text-center uppercase">
                Create
              </Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </View>
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

  dropdownContainerStyle: {
    borderRadius: 8,
  },

  dropdownSelectedText: {
    color: "black",
    fontSize: 15,
    fontWeight: 500,
  },
});

export default AddExpense;
