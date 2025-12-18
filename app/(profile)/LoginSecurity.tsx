import showToast from "@/libs/showToast";
import { logOutAllSessions, logOutUser } from "@/services/auth.service";
import { updatePassword } from "@/services/userProfile.service";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginSecurity = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [oldPassword, setOldPassword] = useState<string>("");

  const isOldPasswordValid: boolean =
    password.trim().length > 0 &&
    confirmPassword.trim().length > 0 &&
    oldPassword.trim().length > 0;

  function handlePasswordChange() {
    Alert.alert(
      "Change password",
      "Are you sure you want to change your password?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Change",
          style: "destructive",
          onPress: async () => {
            if (password !== confirmPassword) {
              showToast({
                type: "error",
                text1: "Error",
                text2: "Password and confirm password do not match.",
              });
              return;
            }

            try {
              await updatePassword(password, oldPassword);
              showToast({
                type: "success",
                text1: "Success",
                text2: "Password updated successfully.",
              });
              setPassword("");
              setConfirmPassword("");
              setOldPassword("");
            } catch (e) {
              console.error("Failed to update password:", e);
              showToast({
                type: "error",
                text1: "Failed",
                text2: "Failed to update password. Please try again.",
              });
              return;
            }
          },
        },
      ]
    );
  }

  function handleLogOutSession() {
    Alert.alert("Logout", "Are you sure you want to logout from this device?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await logOutUser();
            router.replace("/(auth)/LoginScreen");
          } catch (e) {
            console.error("Failed to log out:", e);
            showToast({
              type: "error",
              text1: "Failed",
              text2: "Failed to log out. Please try again.",
            });
          }
        },
      },
    ]);
  }

  function handleLogOutAllSessions() {
    Alert.alert("Logout", "Are you sure you want to logout from all devices?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await logOutAllSessions();
            router.replace("/(auth)/LoginScreen");
          } catch (e) {
            console.error("Failed to log out from all sessions:", e);
            showToast({
              type: "error",
              text1: "Failed",
              text2: "Failed to log out from all devices. Please try again.",
            });
          }
        },
      },
    ]);
  }

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
                    value={password}
                    onChangeText={setPassword}
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
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
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
                    value={oldPassword}
                    onChangeText={setOldPassword}
                    placeholder="Your new password"
                    placeholderTextColor="gray"
                    className="w-full border border-gray-300 rounded-lg text-black"
                  />

                  {isOldPasswordValid && (
                    <Ionicons
                      name="checkmark-circle"
                      size={24}
                      color="black"
                      style={{
                        position: "absolute",
                        right: 10,
                        top: 8,
                      }}
                      onPress={handlePasswordChange}
                    />
                  )}
                </View>
              </View>

              {/* LOGOUT BUTTON */}
              <View className="mt-6 gap-2">
                <Pressable
                  className="bg-red-500 px-6 py-3 rounded-lg items-center transition-all ease-in-out active:opacity-75 active:scale-[0.98]"
                  onPress={handleLogOutSession}
                >
                  <Text className="text-neutral-50 font-medium">
                    Logout from this device
                  </Text>
                </Pressable>

                <View>
                  <View className="border border-red-500 px-6 py-3 rounded-lg items-center transition-all ease-in-out active:opacity-75 active:scale-[0.98]">
                    <Text
                      className="text-red-500 font-medium"
                      onPress={handleLogOutAllSessions}
                    >
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
