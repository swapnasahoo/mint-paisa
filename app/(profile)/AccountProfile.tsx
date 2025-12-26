import { account } from "@/libs/appwrite";
import showToast from "@/libs/showToast";
import {
  makeUserAvatar,
  updateEmail,
  updateUsername,
} from "@/services/userProfile.service";
import { useUser } from "@/store/useUser";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Models } from "react-native-appwrite";
import { SafeAreaView } from "react-native-safe-area-context";

const AccountProfile = () => {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const name = useUser((s) => s.name);
  const setName = useUser((s) => s.setName);

  const email = useUser((s) => s.email);
  const setEmail = useUser((s) => s.setEmail);

  const cityName = useUser((s) => s.cityName);
  const setCityName = useUser((s) => s.setCityName);

  const setAvatarUrl = useUser((s) => s.setAvatarUrl);

  const [password, setPassword] = useState<string>("");

  const [newName, setNewName] = useState<string>("");
  const [newCityName, setNewCityName] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");

  const [isNewName, setIsNewName] = useState<boolean>(false);
  const [isNewCityName, setIsNewCityName] = useState<boolean>(false);
  const [isNewEmail, setIsNewEmail] = useState<boolean>(false);

  const [emailModalVisible, setEmailModalVisible] = useState<boolean>(false);

  useEffect(() => {
    setNewName(name || "");
    setNewEmail(email || "");
    setNewCityName(cityName || "");

    // update avatar if name / email changes
    setAvatarUrl(makeUserAvatar(name || email || ""));
  }, [name, email, cityName]);

  function handleNameUpdate() {
    Alert.alert("Are you sure?", "Do you want to update your name?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Update",
        style: "destructive",
        onPress: async () => {
          try {
            await updateUsername(newName.trim());
            showToast({
              type: "success",
              text1: "Success",
              text2: "Your name has been updated.",
            });
            setName(newName.trim());
            setIsNewName(false);
          } catch (e) {
            console.error("Failed to update username:", e);
            showToast({
              type: "error",
              text1: "Failed",
              text2: "Failed to update your name. Please try again.",
            });
          }
        },
      },
    ]);
  }

  function handleCityNameUpdate() {
    Alert.alert("Are you sure?", "Do you want to update your city name?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Update",
        style: "destructive",
        onPress: async () => {
          try {
            await account.updatePrefs({
              prefs: { cityName: newCityName.trim() },
            });
            showToast({
              type: "success",
              text1: "Success",
              text2: "Your city name has been updated.",
            });
            setCityName(newCityName.trim());
            setIsNewCityName(false);
          } catch (e) {
            console.error("Failed to update city name:", e);
            showToast({
              type: "error",
              text1: "Failed",
              text2: "Failed to update your city name. Please try again.",
            });
          }
        },
      },
    ]);
  }

  function handleEmailUpdate() {
    if (password.trim() === "") {
      showToast({
        type: "error",
        text1: "Failed",
        text2: "Password is required to update email.",
      });
      return;
    }

    Alert.alert("Are you sure?", "Do you want to update your email?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Update",
        style: "destructive",
        onPress: async () => {
          try {
            await updateEmail(newEmail.trim(), password);
            showToast({
              type: "success",
              text1: "Success",
              text2: "Your email has been updated.",
            });
            setEmail(newEmail.trim());
            setIsNewEmail(false);
            setPassword("");
            setEmailModalVisible(false);
          } catch (e) {
            console.error("Failed to update email:", e);
            showToast({
              type: "error",
              text1: "Failed",
              text2: "Failed to update your email. Please try again.",
            });
            setPassword("");
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
            Personal Profile
          </Text>
        </View>

        {/* PERSONAL PROFILE CONTENT */}
        <View className="bg-neutral-50 w-full h-full mt-6 rounded-t-4xl px-6 py-4">
          <View>
            <Text className="text-xl font-medium mb-4">Profile</Text>

            <View className="gap-2">
              <View className="relative">
                <TextInput
                  value={newName}
                  onChangeText={(text) => {
                    setNewName(text);
                    setIsNewName(text.trim() !== name);
                  }}
                  placeholder="Your name"
                  placeholderTextColor="gray"
                  className="w-full border border-gray-300 rounded-lg text-black"
                />

                {isNewName && (
                  <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color="black"
                    style={{
                      position: "absolute",
                      right: 10,
                      top: 8,
                      display: isNewName ? "flex" : "none",
                    }}
                    onPress={handleNameUpdate}
                  />
                )}
              </View>

              <View className="relative">
                <TextInput
                  value={newCityName}
                  onChangeText={(text) => {
                    setNewCityName(text);
                    setIsNewCityName(text.trim() !== cityName);
                  }}
                  placeholder="Your city name"
                  placeholderTextColor="gray"
                  className="w-full border border-gray-300 rounded-lg text-black"
                />

                {isNewCityName && (
                  <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color="black"
                    style={{
                      position: "absolute",
                      right: 10,
                      top: 8,
                    }}
                    onPress={handleCityNameUpdate}
                  />
                )}
              </View>
            </View>

            {/* ACCOUNT SECTION */}
            <View className="mt-6">
              <Text className="text-xl font-medium mb-4">Account</Text>

              <View className="relative">
                <TextInput
                  value={newEmail}
                  onChangeText={(text) => {
                    setNewEmail(text);
                    setIsNewEmail(text.trim() !== email);
                  }}
                  placeholder="Your email address"
                  placeholderTextColor="gray"
                  className="w-full border border-gray-300 rounded-lg text-black"
                />

                {isNewEmail && (
                  <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color="black"
                    style={{
                      position: "absolute",
                      right: 10,
                      top: 8,
                    }}
                    onPress={() => setEmailModalVisible(true)}
                  />
                )}
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>

      {/* EMAIL UPDATE MODAL */}
      <Modal visible={emailModalVisible} transparent animationType="fade">
        <View className="flex-1 justify-center items-center">
          {/* OVERLAY */}
          <Pressable
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
            onPress={() => setEmailModalVisible(false)}
          />

          <View className="w-80 h-55 bg-neutral-50 rounded-xl px-6 py-4 shadow-md elevation-sm">
            <Text className="text-lg font-medium mb-2">Update Email</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="Your password"
              placeholderTextColor="gray"
              className="w-full h-12 border border-gray-400 rounded-lg text-black pl-3  "
            ></TextInput>
            <Text className="text-sm text-neutral-500 mt-2">
              For updating your email address password is required
            </Text>

            <View className="mt-auto ml-auto mb-2 flex-row items-center gap-4">
              <Pressable onPress={() => setEmailModalVisible(false)}>
                <Text className="font-medium">Cancel</Text>
              </Pressable>

              <Pressable onPress={handleEmailUpdate}>
                <Text className="font-medium text-red-600">Update</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AccountProfile;
