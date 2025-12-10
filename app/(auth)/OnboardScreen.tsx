import { Link, router } from "expo-router";
import React from "react";
import { Image, Pressable, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const OnboardScreen = () => {
  StatusBar.setBarStyle("dark-content");

  return (
    <View className="flex-1 bg-[#EEF8F7]">
      <SafeAreaView className="flex-1">
        {/* IMAGE */}
        <View className="w-full h-[70%] justify-center items-center">
          <Image
            source={require("../../assets/images/onboard-man.png")}
            resizeMode="contain"
            className="w-full h-[90%]"
          />
        </View>

        {/* TEXT CONTENT */}
        <View className="mt-6">
          <Text className="capitalize text-center text-4xl font-bold text-[#438883]">
            spend smarter {"\n"} save more
          </Text>
        </View>

        {/* GET STARTED */}
        <View className="mt-6">
          <Pressable
            className="bg-[#69AEA9] px-6 py-4 rounded-full mx-8 shadow-md elevation-lg transition-all ease-in-out duration-300 active:opacity-75 active:scale-[0.98]"
            onPress={() => router.push("/(auth)/SignupScreen")}
          >
            <Text className="text-lg text-white text-center font-semibold">
              Get Started
            </Text>
          </Pressable>

          <Text className="text-center mt-4 ">
            Already Have Account?{" "}
            <Link
              href="/(auth)/LoginScreen"
              style={{ color: "#438883", fontWeight: "600" }}
            >
              Log In
            </Link>
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default OnboardScreen;
