import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginSecurity = () => {
  return (
    <View className="flex-1 bg-[#429690]">
      <SafeAreaView className="flex-1">
        {/* HEADER */}
        <View className="flex-row items-center px-6 py-4">
          <Ionicons
            name="arrow-back"
            size={24}
            color="white"
            onPress={() => router.push("/(tabs)/ProfileScreen")}
          />
          <Text className="text-white text-lg font-semibold mx-auto">
            Login & Security
          </Text>
        </View>

        {/* LOGIN & SECURITY CONTENT */}
        <View className="bg-neutral-50 w-full h-full mt-6 rounded-t-4xl px-6 py-4">
          <View>
            <Text className="text-xl font-medium mb-4">Security</Text>

            <View className="gap-2">
              {/* NEW PASSWORD INPUT */}
              <View className="gap-2">
                <Text className="text-neutral-900">New password</Text>
                <View className="relative">
                  <TextInput
                    placeholder="Your new password"
                    placeholderTextColor="gray"
                    className="w-full border border-gray-300 rounded-lg text-black"
                  />
                </View>
              </View>

              {/* CONFIRM PASSWORD INPUT */}
              <View className="gap-2">
                <Text className="text-neutral-900">Confirm password</Text>
                <View className="relative">
                  <TextInput
                    placeholder="Your new password"
                    placeholderTextColor="gray"
                    className="w-full border border-gray-300 rounded-lg text-black"
                  />
                </View>
              </View>

              {/* OLD PASSWORD INPUT */}
              <View className="gap-2">
                <Text className="text-neutral-900">Old password</Text>
                <View className="relative">
                  <TextInput
                    placeholder="Your new password"
                    placeholderTextColor="gray"
                    className="w-full border border-gray-300 rounded-lg text-black"
                  />

                  <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color="black"
                    style={{
                      position: "absolute",
                      right: 10,
                      top: 8,
                    }}
                  />
                </View>
              </View>

              {/* LOGOUT BUTTON */}
              <View className="mt-6 gap-2">
                <View className="bg-red-500 px-6 py-3 rounded-lg items-center transition-all ease-in-out active:opacity-75 active:scale-[0.98]">
                  <Text className="text-neutral-50 font-medium">
                    Logout from this device
                  </Text>
                </View>

                <View>
                  <View className="border border-red-500 px-6 py-3 rounded-lg items-center transition-all ease-in-out active:opacity-75 active:scale-[0.98]">
                    <Text className="text-red-500 font-medium">
                      Logout from all devices
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default LoginSecurity;
