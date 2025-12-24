import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ScreenNameType = "welcome" | "setBudget" | "overview" | null;

const MessageCenter = () => {
  const [screenName, setScreenName] = useState<ScreenNameType>("welcome");

  const [budget, setBudget] = useState<string>("");

  return (
    <View className="flex-1 bg-[#429690] px-6 py-4">
      <SafeAreaView className="flex-1">
        {/* CONTENT */}
        {screenName === "welcome" && (
          <View className="w-full h-full items-center justify-center">
            {/* ILLUSTRATION */}
            <Image
              source={require("../../assets/images/illustrations/budget-controls-welcome.png")}
              className="size-100"
            />

            {/* HEADING */}
            <Text className="text-2xl text-white font-semibold">
              Start now or Regret
            </Text>

            {/* SUBHEADING */}
            <Text className="text-center text-sm text-neutral-200 mt-2">
              Looks like you haven't set up your expense limits yet! Set them
              now and make your future safe and secure.
            </Text>

            {/* START BUTTIN */}
            <Pressable
              className="mt-6 bg-neutral-50 w-full px-6 py-3 rounded-full transition-all ease-in-out active:opacity-85 active:scale-[0.98] shadow-sm elevation-xs"
              onPress={() => setScreenName("setBudget")}
            >
              <Text className="text-neutral-950 text-lg font-semibold text-center">
                Start savings
              </Text>
            </Pressable>
          </View>
        )}

        {/* SET BUDGET SCREEN */}
        {screenName === "setBudget" && (
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View className="w-full h-full items-center justify-center">
              {/* ILLUSTRATION */}
              <Image
                source={require("../../assets/images/illustrations/set-budget.png")}
                className="size-80"
              />

              {/* BUDGET TEXT INPUT */}
              <TextInput
                value={budget}
                onChangeText={(text) => {
                  const replaced: string = text.replace(/[^0-9]/g, "");
                  setBudget(replaced);
                }}
                placeholder="0"
                keyboardType="numeric"
                placeholderTextColor="#fafafa"
                className="text-4xl text-neutral-50 font-medium mt-6 border-b border-neutral-200 caret-neutral-200"
              />

              {/* SET BUDGET BUTTON */}
              <Pressable
                className="mt-6 bg-neutral-50 w-full px-6 py-3 rounded-full transition-all ease-in-out active:opacity-85 active:scale-[0.98] shadow-sm elevation-xs"
                onPress={() => {
                  if (budget === "0" || budget === "") {
                    alert("Please enter a valid budget amount.");
                    return;
                  }
                  setScreenName("overview");
                }}
              >
                <Text className="text-neutral-950 text-lg font-semibold text-center">
                  Set Budget
                </Text>
              </Pressable>
            </View>
          </KeyboardAvoidingView>
        )}

        {/* OVERVIEW SCREEN */}
        {screenName === "overview" && (
          <View className="w-full h-full items-center justify-center">
            {/* HEADER */}
            <Text className="text-2xl text-white font-semibold">
              Budget Overview
            </Text>

            {/* BUDGET AMOUNT */}
            <View className="bg-neutral-50 mt-4 px-6 py-2 rounded-lg shadow-sm elevation-xs">
              <Text className="text-4xl text-neutral-950 font-medium">
                ${budget}
              </Text>
            </View>

            {/* DESCRIPTION */}
            <Text className="text-center text-sm text-neutral-200 mt-2">
              You have successfully set your budget limit. Keep track of your
              expenses and stay within your budget!
            </Text>

            {/* ACTION BUTTONS */}
            <View className="gap-2">
              {/* CONTINUE BUTTON */}
              <Pressable
                className="mt-6 bg-neutral-50 w-full px-6 py-3 rounded-full transition-all ease-in-out active:opacity-85 active:scale-[0.98] shadow-sm elevation-xs"
                onPress={() => {
                  setScreenName(null);
                }}
              >
                <Text className="text-neutral-950 text-lg font-semibold text-center">
                  Continue
                </Text>
              </Pressable>

              {/* EDIT BUDGET BUTTON */}
              <Pressable
                className="transition-all ease-in-out active:opacity-85 active:scale-[0.98]"
                onPress={() => setScreenName("setBudget")}
              >
                <Text className="text-neutral-50 underline text-center">
                  Edit Budget
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};

export default MessageCenter;
