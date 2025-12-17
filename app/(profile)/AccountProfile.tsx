import { getUser } from "@/services/auth.service";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";
import { Models } from "react-native-appwrite";
import { SafeAreaView } from "react-native-safe-area-context";

const AccountProfile = () => {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const [name, setName] = useState<string>("");
  const [cityName, setCityName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [newName, setNewName] = useState<string>("");
  const [newCityName, setNewCityName] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");

  const [isNewName, setIsNewName] = useState<boolean>(false);
  const [isNewCityName, setIsNewCityName] = useState<boolean>(false);
  const [isNewEmail, setIsNewEmail] = useState<boolean>(false);

  const [emailModalVisible, setEmailModalVisible] = useState<boolean>(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await getUser();
        setUser(userData);

        setName(userData?.name || "");
        setNewName(userData?.name || "");

        setCityName(userData?.prefs?.cityName || "");
        setNewCityName(userData?.prefs?.cityName || "");

        setEmail(userData?.email || "");
        setNewEmail(userData?.email || "");
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
                    onPress={() => {}}
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
                    onPress={() => {}}
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

              <Pressable
                onPress={() => {
                  setEmailModalVisible(false);
                }}
              >
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
