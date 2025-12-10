import { Tabs } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface TabBarIconProps {
  icon: string;
  focused: boolean;
  color: string;
  size: number;
}

const TabBarIcon = ({ icon, focused, color, size }: TabBarIconProps) => {
  return (
    <Ionicons
      name={focused ? (`${icon}-sharp` as any) : (`${icon}-outline` as any)}
      size={size}
      color={color}
    />
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#549994",
        tabBarInactiveTintColor: "#aaaaaa",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <TabBarIcon
              icon="home"
              focused={focused}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="StatsScreen"
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <TabBarIcon
              icon="bar-chart"
              focused={focused}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="AddExpense"
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <TabBarIcon
              icon="add-circle"
              focused={focused}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <TabBarIcon
              icon="person-circle"
              focused={focused}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
