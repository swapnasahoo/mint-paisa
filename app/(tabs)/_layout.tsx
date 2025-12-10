import { Tabs } from "expo-router";
import React from "react";

const TabsLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="StatsScreen" />
      <Tabs.Screen name="AddExpense" />
      <Tabs.Screen name="ProfileScreen" />
    </Tabs>
  );
};

export default TabsLayout;
