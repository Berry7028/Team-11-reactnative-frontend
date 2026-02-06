import {
  type MaterialTopTabNavigationEventMap,
  type MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import type { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { Redirect, withLayoutContext } from "expo-router";
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppHeaderTitle } from "@/components/app-header-title";
import { CustomTabBar } from "@/components/custom-tab-bar";
import { useAuth } from "@/hooks/use-auth";

const { Navigator } = createMaterialTopTabNavigator();

const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function TabLayout() {
  const { session, isLoading } = useAuth();
  const insets = useSafeAreaInsets();

  if (isLoading) {
    return null;
  }

  if (!session) {
    return <Redirect href="/(auth)/signin" />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View
        style={{
          paddingTop: insets.top,
          backgroundColor: "#FFFFFF",
          borderBottomColor: "#FFAAB8",
          borderBottomWidth: 1,
          paddingHorizontal: 16,
          paddingBottom: 12,
        }}
      >
        <AppHeaderTitle />
      </View>
      <MaterialTopTabs
        tabBarPosition="bottom"
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          lazy: false,
          swipeEnabled: true,
          animationEnabled: true,
        }}
      >
        <MaterialTopTabs.Screen name="log" options={{ title: "ログ" }} />
        <MaterialTopTabs.Screen name="quests" options={{ title: "クエスト" }} />
        <MaterialTopTabs.Screen name="index" options={{ title: "ホーム" }} />
        <MaterialTopTabs.Screen name="daily-mood" options={{ title: "気分" }} />
        <MaterialTopTabs.Screen name="settings" options={{ title: "設定" }} />
      </MaterialTopTabs>
    </View>
  );
}
