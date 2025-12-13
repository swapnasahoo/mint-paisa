import { createUserWithEmailAndPassword } from "@/services/auth.service";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Image, Pressable, Text, TextInput, View } from "react-native";

const SignupScreen = () => {
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function signup() {
    if (!emailAddress || !password) {
      Alert.alert(
        "Invalid details",
        "Please enter a valid email address and password"
      );
      return;
    }

    if (password.length < 8) {
      Alert.alert("Weak password", "Password must be at least 8 characters");
      return;
    }

    const user = await createUserWithEmailAndPassword(emailAddress, password);

    if (user) {
      router.replace("/(tabs)");
    } else {
      Alert.alert("Try again", "Signup failed");
    }
  }

  return (
    <View className="flex-1 bg-[#EEF8F7]">
      {/* SIGNUP FORM */}
      <View className="flex-1 justify-end">
        <View className="bg-white w-full h-[70%] rounded-t-[50px] px-6 py-4">
          <Text className="text-center text-xl font-bold text-[#222222]">
            Signup
          </Text>

          {/* INPUTS */}
          <View>
            {/* EMAIL ADDRESS */}
            <View className="mt-6 gap-1">
              <Text className="text-sm text-[#666666] font-semibold tracking-wider">
                EMAIL ADDRESS
              </Text>
              <TextInput
                placeholder="Email Address"
                placeholderTextColor="#9E9E9E"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={emailAddress}
                onChangeText={setEmailAddress}
                className="border border-gray-300 p-2 h-12 rounded-md text-[#111827]"
              />
            </View>

            {/* PASSWORD */}
            <View className="mt-4 gap-1">
              <Text className="text-sm text-[#666666] font-semibold tracking-wider">
                PASSWORD
              </Text>
              <TextInput
                placeholder="Password"
                placeholderTextColor="#9E9E9E"
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                className="border border-gray-300 p-2 h-12 rounded-md text-[#111827]"
              />
            </View>
          </View>

          {/* SIGNUP BUTTON */}
          <View className="mt-6">
            <Pressable
              className="bg-[#69AEA9] px-6 py-4 rounded-full mx-8 shadow-md elevation-lg transition-all ease-in-out duration-300 active:opacity-75 active:scale-[0.98]"
              onPress={signup}
            >
              <Text className="text-lg text-white text-center font-semibold ">
                Sign Up
              </Text>
            </Pressable>
          </View>

          {/* OTHER OPTIONS */}
          <View className="flex-row items-center mt-6 gap-2">
            <View className="h-px flex-1 bg-gray-300"></View>
            <Text className="text-center text-gray-400">Or Signup With</Text>
            <View className="h-px flex-1 bg-gray-300"></View>
          </View>

          {/* SOCIAL BUTTONS */}
          <View className="flex-row items-center gap-6 mx-auto mt-6">
            {/* GOOGLE */}
            <View className="size-12 py-4 rounded-xl bg-white shadow-md elevation-lg items-center justify-center transition-all ease-in-out duration-300 active:opacity-75 active:scale-[0.98]">
              <Image
                source={require("../../assets/icons/google.png")}
                className="size-8"
              />
            </View>

            {/* FACEBOOK */}
            <View className="size-12 py-4 rounded-xl bg-white shadow-md elevation-lg items-center justify-center transition-all ease-in-out duration-300 active:opacity-75 active:scale-[0.98]">
              <Image
                source={require("../../assets/icons/facebook.png")}
                className="size-8"
              />
            </View>

            {/* X (Twitter) */}
            <View className="size-12 py-4 rounded-xl bg-white shadow-md elevation-lg items-center justify-center transition-all ease-in-out duration-300 active:opacity-75 active:scale-[0.98]">
              <Image
                source={require("../../assets/icons/twitter-x.png")}
                className="size-8"
              />
            </View>
          </View>

          {/* LOGIN LINK */}
          <View className="flex-row items-center mt-6 gap-2">
            <Text className="text-center text-gray-400 mx-auto">
              Already have an account?{" "}
              <Link
                href="/(auth)/LoginScreen"
                style={{
                  color: "#438883",
                  fontWeight: 600,
                }}
              >
                Login
              </Link>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignupScreen;
