import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";``

const MessageCenter = () => {
  return (
    <View className="flex-1 bg-[#429690]">
      <SafeAreaView className="flex-1">
        <Modal visible transparent animationType="fade">
          {/* Backdrop */}
          <Pressable
            className="flex-1 bg-black/40 items-center justify-center"
            onPress={() => router.back()}
          >
            {/* Card */}
            <Pressable
              className="w-80 bg-neutral-50 rounded-2xl px-6 py-6 items-center shadow-lg"
              onPress={() => {}}
            >
              {/* Icon */}
              <View className="bg-neutral-100 p-4 rounded-full mb-4">
                <Ionicons name="lock-closed-outline" size={28} color="#111" />
              </View>

              {/* Title */}
              <Text className="text-lg font-semibold text-neutral-900 mb-1">
                Coming Soon
              </Text>

              {/* Subtitle */}
              <Text className="text-center text-sm text-neutral-500 mb-6">
                Budget Controls isn’t available yet. We’re still wiring things
                up behind the scenes.
              </Text>

              {/* Action */}
              <Pressable
                className="w-full bg-neutral-900 py-3 rounded-xl transition-all ease-in-out active:scale-[0.98] active:opacity-75"
                onPress={() => router.back()}
              >
                <Text className="text-center text-white font-medium">
                  Got it
                </Text>
              </Pressable>
            </Pressable>
          </Pressable>
        </Modal>
      </SafeAreaView>
    </View>
  );
};

export default MessageCenter;
