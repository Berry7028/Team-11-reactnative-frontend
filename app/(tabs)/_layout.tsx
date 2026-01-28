import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#A8DF8E",
        tabBarInactiveTintColor: "#8E9A8D",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopColor: "#E7EFE1",
          borderTopWidth: 1,
          height: 72,
          paddingBottom: 14,
          paddingTop: 8,
        },
        headerStyle: { backgroundColor: "#F0FFDF" },
        headerTitleStyle: { color: "#3A4D39" },
        headerShadowVisible: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="log"
        options={{
          title: "ログ",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={26} name="book.closed.fill" color={color} />
          ),
          headerStyle: { backgroundColor: "#F7FCF0" },
          headerTitleStyle: { color: "#141712" },
        }}
      />
      <Tabs.Screen
        name="quests"
        options={{
          title: "クエスト",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={26} name="checkmark.circle.fill" color={color} />
          ),
          headerStyle: { backgroundColor: "#FFF9FA" },
          headerTitleStyle: { color: "#332D2E" },
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "ホーム",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={36} name="house.fill" color={color} />
          ),
          tabBarItemStyle: {
            marginTop: -8,
          },
        }}
      />
      <Tabs.Screen
        name="daily-mood"
        options={{
          title: "気分",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={26} name="heart.circle.fill" color={color} />
          ),
          headerStyle: { backgroundColor: "#F0FFDF" },
          headerTitleStyle: { color: "#141712" },
        }}
      />
      <Tabs.Screen
        name="daily-review"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "設定",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={26} name="gearshape.fill" color={color} />
          ),
          headerStyle: { backgroundColor: "#F7FCF0" },
          headerTitleStyle: { color: "#141712" },
        }}
      />
    </Tabs>
  );
}
