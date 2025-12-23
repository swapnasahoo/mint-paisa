import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MessageCenter = () => {
  return (
    <View className="flex-1 bg-[#429690] px-6 py-4">
      <SafeAreaView className="flex-1">
        {/* CONTENT */}
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
            Looks like you haven't set up your expense limits yet! Set them now
            and make your future safe and secure.
          </Text>

          {/* START BUTTIN */}
          <Pressable className="mt-6 bg-neutral-50 w-full px-6 py-3 rounded-full transition-all ease-in-out active:opacity-85 active:scale-[0.98] shadow-sm elevation-xs">
            <Text className="text-neutral-950 text-lg font-semibold text-center">
              Start savings
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default MessageCenter;
