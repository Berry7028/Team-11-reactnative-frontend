import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { useLocation } from "@/hooks/use-location";
import { AuthProvider } from "@/providers/AuthProvider";
import { NotificationProvider } from "@/providers/NotificationProvider";

export const unstable_settings = {
  anchor: "(auth)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { requestPermissions, startTracking, permissions } = useLocation();

  // アプリ起動時に位置情報の権限を要求し、トラッキングを開始
  useEffect(() => {
    const initializeLocation = async () => {
      try {
        await requestPermissions();
      } catch (error) {
        console.error("位置情報の初期化に失敗:", error);
      }
    };

    initializeLocation();
  }, []);

  // 権限が許可されたらトラッキングを開始
  useEffect(() => {
    if (permissions?.foreground && permissions?.background) {
      startTracking().catch((error) => {
        console.error("トラッキングの開始に失敗:", error);
      });
    }
  }, [permissions]);

  return (
    <AuthProvider>
      <NotificationProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack
            screenOptions={{
              animationTypeForReplace: "pop",
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen
              name="modal"
              options={{ presentation: "modal", title: "Modal" }}
            />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}
