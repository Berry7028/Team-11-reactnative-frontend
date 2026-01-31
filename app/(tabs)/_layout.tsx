import { Redirect, Tabs } from "expo-router";
import React from "react";

import { AppHeaderTitle } from "@/components/app-header-title";
import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useAuth } from "@/hooks/use-auth";
export default function TabLayout() {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!session) {
    return <Redirect href="/(auth)/signin" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#A8DF8E",
        tabBarInactiveTintColor: "#8E9A8D",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopColor: "#FFAAB8",
          borderTopWidth: 1,
          height: 72,
          paddingBottom: 14,
          paddingTop: 8,
        },
        headerStyle: {
          backgroundColor: "#FFFFFF",
          borderBottomColor: "#FFAAB8",
          borderBottomWidth: 1,
        },
        headerTitle: () => <AppHeaderTitle />,
        headerTitleAlign: "left",
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
        }}
      />
      <Tabs.Screen
        name="quests"
        options={{
          title: "クエスト",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={26} name="checkmark.circle.fill" color={color} />
          ),
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
            marginTop: -4,
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
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "設定",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={26} name="gearshape.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
