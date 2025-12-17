import { getUser } from "@/services/auth.service";
import { makeUserAvatar } from "@/services/userProfile.service";
import { Ionicons } from "@expo/vector-icons";
import { Href, router } from "expo-router";
import React, { ComponentProps, useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Models } from "react-native-appwrite";
import { SafeAreaView } from "react-native-safe-area-context";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

function ProfileControl({
  iconName,
  label,
  route,
}: {
  iconName: IoniconName;
  label: string;
  route: Href;
}) {
  return (
    <Pressable
      className="flex-row items-center gap-4"
      onPress={() => router.push(route)}
    >
      <Ionicons name={iconName} size={28} color="#666666" />
      <Text className="font-medium">{label}</Text>
    </Pressable>
  );
}

const ProfileScreen = () => {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await getUser();
        console.log("User Data:", userData);
        setUser(userData);
      } catch (e) {
        console.error("Failed to fecth user data:", e);
      }
    }

    fetchUser();
  }, []);

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
              source={{
                uri: makeUserAvatar(
                  user?.name || user?.email.split("@")[0] || ""
                ),
              }}
              className="size-40 shadow-xs mx-auto rounded-full"
            />

            {/* DISPLAY NAME */}
            <Text className="text-[#222222] text-xl font-semibold text-center mt-4 capitalize">
              {user?.name || user?.email.split("@")[0]}
            </Text>

            {/* USER EMAIL */}
            <Text className="text-[#438883] text-sm font-semibold text-center mt-1">
              {user?.email}
            </Text>
          </View>

          {/* PROFILE CONTROLS */}
          <View className="mt-6 gap-4">
            <ProfileControl
              iconName="person"
              label="Personal Profile"
              route="/(profile)/AccountProfile"
            />
            <ProfileControl
              iconName="mail"
              label="Message Center"
              route="/(profile)/MessageCenter"
            />
            <ProfileControl
              iconName="shield-half-sharp"
              label="Login and Security"
              route="/(profile)/LoginSecurity"
            />
            <ProfileControl
              iconName="lock-closed-sharp"
              label="Data & Privacy"
              route="/(profile)/DataPrivacy"
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default ProfileScreen;
