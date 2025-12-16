import { Ionicons } from "@expo/vector-icons";
import React, { ComponentProps } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

function ProfileControl({
  iconName,
  label,
}: {
  iconName: IoniconName;
  label: string;
}) {
  return (
    <View className="flex-row items-center gap-4">
      <Ionicons name={iconName} size={28} color="#666666" />
      <Text className="font-medium">{label}</Text>
    </View>
  );
}

const ProfileScreen = () => {
  return (
    <View className="flex-1 bg-[#429690]">
      <SafeAreaView className="flex-1">
        {/* HEADER */}
        <View className="flex-row items-center justify-between px-6 py-4">
          <Ionicons name="arrow-back" size={24} color="white" />

          <Text className="text-white text-lg font-semibold">Profile</Text>

          <Pressable className="bg-white/15 p-2 rounded-lg transition-all duration-300 ease-in-out active:opacity-75 active:scale-[0.98]">
            <Ionicons name="notifications-outline" size={24} color="white" />

            {/* MOCK NOTIFICATION INDICATION */}
            <View className="size-2 bg-[#FFAB7B] rounded-full absolute top-3 right-3" />
          </Pressable>
        </View>

        {/* PROFILE CONTENT */}
        <View className="bg-neutral-50 w-full h-full mt-6 rounded-t-4xl px-6 py-4">
          <View>
            {/* USER PROFILE IMAGE */}
            <Image
              source={require("../../assets/images/profile-picture.png")}
              className="size-40 shadow-xs mx-auto"
            />

            {/* DISPLAY NAME */}
            <Text className="text-[#222222] text-xl font-semibold text-center mt-4">
              SwapnaSahoo
            </Text>

            {/* USER NAME */}
            <Text className="text-[#438883] text-sm font-semibold text-center mt-1">
              @swapna_sahoo
            </Text>
          </View>

          {/* PROFILE CONTROLS */}
          <View className="mt-6 gap-4">
            <ProfileControl iconName="person" label="Account" />
            <ProfileControl iconName="people" label="Personal Profile" />
            <ProfileControl iconName="mail" label="Message Center" />
            <ProfileControl
              iconName="shield-half-sharp"
              label="Login and Security"
            />
            <ProfileControl
              iconName="lock-closed-sharp"
              label="Data & Privacy"
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default ProfileScreen;
