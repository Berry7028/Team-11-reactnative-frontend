import { Redirect, Stack } from "expo-router";
import React from "react";

import { useAuth } from "@/hooks/use-auth";

export default function AuthLayout() {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (session) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: { backgroundColor: "#F0FFDF" },
        headerTitleStyle: { color: "#3A4D39" },
      }}
    >
      <Stack.Screen name="signin" options={{ title: "ログイン" }} />
      <Stack.Screen name="signup" options={{ title: "新規ユーザー登録" }} />
    </Stack>
  );
}
