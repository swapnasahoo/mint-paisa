import {
  expenseCategoryDropdownList,
  incomeCategoryDropdownList,
  typeDropdownList,
} from "@/constants/data/transactionCategory";
import { account } from "@/libs/appwrite";
import showToast from "@/libs/showToast";
import { createTransaction } from "@/services/transaction.service";
import { useBudget } from "@/store/useBudget";
import { useTransactions } from "@/store/useTransaction";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";

const AddTransaction = () => {
  StatusBar.setBarStyle("light-content");

  const addTransaction = useTransactions((s) => s.addTransaction);

  const [type, setType] = useState<"income" | "expense">("income");
  const [category, setCategory] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [userId, setUserId] = useState<string>("");

  const budget = useBudget((s) => s.budget);
  const [totalExpnese, setTotalExpense] = useState<number>(0);

  const transactions = useTransactions((s) => s.transactions);

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

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

  useEffect(() => {
    const expense = transactions.reduce((acc, transaction) => {
      return transaction.type === "expense" ? acc + transaction.amount : acc;
    }, 0);

    setTotalExpense(expense);
  }, [transactions]);

  function handleBudgetExceeded() {
    Alert.alert(
      "Budget exceeded",
      "Adding this expense will exceed your set budget.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Add anyway",
          onPress: () => {
            handleAddTransaction(true);
          },
        },
      ]
    );
  }

  async function handleAddTransaction(overrideBudget?: boolean) {
    if (!userId) return;
    if (!Number(amount.trim())) return alert("Enter an amount");

    // handle budget exceed alert
    if (!overrideBudget) {
      if (type === "expense" && Number(budget) > 0) {
        if (totalExpnese + Number(amount) > Number(budget))
          return handleBudgetExceeded();
      }
    }

    try {
      const transaction = await createTransaction({
        userId,
        type,
        category,
        amount: Number(amount),
        date: date.toISOString(),
      });

      // update transaction list in zustand store
      addTransaction(transaction as any);

      showToast({
        type: "success",
        text1: "Success",
        text2: "Transaction created succesfully",
      });
      setType("income");
      setCategory("");
      setAmount("");
    } catch (error) {
      console.log("Error creating transaction:", error);
      showToast({
        type: "error",
        text1: "Failed",
        text2: "Could not create transaction. Please try again.",
      });
    }
  }

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

            {/* DATE */}
            <View>
              <Text className="text-sm text-[#666666] font-semibold">DATE</Text>
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

            {/* CREATE BUTTON */}
            <Pressable
              className="bg-[#69AEA9] px-6 py-2 mt-2 rounded-md shadow-md elevation-sm transition-all duration-300 ease-in-out active:opacity-75 active:scale-[0.98]"
              onPress={() => handleAddTransaction()}
            >
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

export default AddTransaction;
