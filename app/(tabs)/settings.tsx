import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";

import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";
import { useAuth } from "@/hooks/use-auth";

export default function SettingsScreen() {
  const router = useRouter();
  const { signOut, session } = useAuth();

  const handleDebugNotification = async (type: "morning" | "night") => {
    const content =
      type === "morning"
        ? {
            title: "おはようございます！☀️",
            body: "朝の記録をしましょう。今の気分はどうですか？",
            data: { type: "morning" },
          }
        : {
            title: "お疲れ様でした！🌙",
            body: "夜の記録をしましょう。今日はどんな一日でしたか？",
            data: { type: "night" },
          };

    try {
      await Notifications.scheduleNotificationAsync({
        content,
        trigger: null,
      });
    } catch (error) {
      Alert.alert("通知エラー", "通知の送信に失敗しました");
    }
  };

  const handleLogout = () => {
    Alert.alert("ログアウト", "ログアウトしますか？", [
      { text: "キャンセル", style: "cancel" },
      {
        text: "ログアウト",
        style: "destructive",
        onPress: async () => {
          await signOut();
          router.replace("/(auth)/signin");
        },
      },
    ]);
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: "#F0FFDF" }}
      contentContainerStyle={{ paddingBottom: 32, paddingTop: 20, gap: 20 }}
    >
      <View style={{ paddingHorizontal: 24, gap: 16 }}>
        <Text
          selectable
          style={{
            fontSize: 20,
            fontWeight: "700",
            color: "#141712",
            fontFamily: Fonts.rounded,
          }}
        >
          設定
        </Text>

        <View
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 20,
            padding: 20,
            gap: 8,
            boxShadow: "0 6px 12px rgba(20, 23, 18, 0.08)",
            borderCurve: "continuous",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12, flex: 1 }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 999,
                  backgroundColor: "rgba(168, 223, 142, 0.2)",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconSymbol name="person.fill" size={20} color="#A8DF8E" />
              </View>
              <Text
                selectable
                style={{
                  fontSize: 14,
                  fontWeight: "700",
                  color: "#141712",
                  fontFamily: Fonts.rounded,
                }}
              >
                アカウント
              </Text>
            </View>
            {session?.user && (
              <View style={{ alignItems: "flex-end", minWidth: 120 }}>
                {session.user.user_metadata?.display_name && (
                  <Text
                    selectable
                    style={{
                      fontSize: 14,
                      fontWeight: "700",
                      color: "#141712",
                      fontFamily: Fonts.rounded,
                    }}
                  >
                    {session.user.user_metadata.display_name}
                  </Text>
                )}
                <Text
                  selectable
                  style={{
                    fontSize: 12,
                    color: "#718268",
                    fontFamily: Fonts.rounded,
                  }}
                >
                  {session.user.email}
                </Text>
              </View>
            )}
          </View>
        </View>

        <View
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 20,
            padding: 20,
            gap: 12,
            boxShadow: "0 6px 12px rgba(20, 23, 18, 0.08)",
            borderCurve: "continuous",
          }}
        >
          <Text
            selectable
            style={{
              fontSize: 14,
              fontWeight: "700",
              color: "#141712",
              fontFamily: Fonts.rounded,
            }}
          >
            デバッグ通知
          </Text>
          <Pressable
            onPress={() => handleDebugNotification("morning")}
            style={{
              backgroundColor: "rgba(168, 223, 142, 0.15)",
              borderRadius: 12,
              paddingVertical: 12,
              paddingHorizontal: 14,
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}
          >
            <IconSymbol name="sun.max.fill" size={16} color="#A8DF8E" />
            <Text
              selectable
              style={{
                fontSize: 12,
                fontWeight: "700",
                color: "#3A4D39",
                fontFamily: Fonts.rounded,
              }}
            >
              朝の通知を出す
            </Text>
          </Pressable>
          <Pressable
            onPress={() => handleDebugNotification("night")}
            style={{
              backgroundColor: "rgba(255, 170, 184, 0.15)",
              borderRadius: 12,
              paddingVertical: 12,
              paddingHorizontal: 14,
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}
          >
            <IconSymbol name="moon.stars.fill" size={16} color="#FFAAB8" />
            <Text
              selectable
              style={{
                fontSize: 12,
                fontWeight: "700",
                color: "#6B3E45",
                fontFamily: Fonts.rounded,
              }}
            >
              夜の通知を出す
            </Text>
          </Pressable>
        </View>

        <Pressable
          onPress={handleLogout}
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 20,
            padding: 20,
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
            boxShadow: "0 6px 12px rgba(20, 23, 18, 0.08)",
            borderCurve: "continuous",
          }}
        >
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 999,
              backgroundColor: "rgba(255, 170, 184, 0.2)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconSymbol
              name="rectangle.portrait.and.arrow.right"
              size={20}
              color="#FFAAB8"
            />
          </View>
          <Text
            selectable
            style={{
              fontSize: 14,
              fontWeight: "700",
              color: "#FFAAB8",
              fontFamily: Fonts.rounded,
            }}
          >
            ログアウト
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
