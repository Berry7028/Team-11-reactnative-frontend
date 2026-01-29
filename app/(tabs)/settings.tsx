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
      contentContainerStyle={{ paddingBottom: 32, paddingTop: 8, gap: 20 }}
    >
      <View style={{ paddingHorizontal: 24, gap: 16 }}>
        <View
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 20,
            padding: 20,
            borderWidth: 1,
            borderColor: "#EEF1ED",
            shadowColor: "#141712",
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.08,
            shadowRadius: 12,
            elevation: 6,
            borderCurve: "continuous",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 999,
                backgroundColor: "rgba(168, 223, 142, 0.2)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconSymbol name="person.fill" size={22} color="#A8DF8E" />
            </View>
            <View style={{ flex: 1, minWidth: 0, justifyContent: "center", gap: 2 }}>
              <Text
                selectable
                style={{
                  fontSize: 11,
                  fontWeight: "600",
                  color: "#718268",
                  fontFamily: Fonts.rounded,
                  letterSpacing: 0.5,
                }}
              >
                アカウント
              </Text>
              {session?.user && (
                <>
                  {session.user.user_metadata?.display_name ? (
                    <Text
                      selectable
                      numberOfLines={1}
                      style={{
                        fontSize: 15,
                        fontWeight: "700",
                        color: "#141712",
                        fontFamily: Fonts.rounded,
                      }}
                    >
                      {session.user.user_metadata.display_name}
                    </Text>
                  ) : null}
                  <Text
                    selectable
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      fontSize: 12,
                      color: "#718268",
                      fontFamily: Fonts.rounded,
                    }}
                  >
                    {session.user.email ?? ""}
                  </Text>
                </>
              )}
            </View>
          </View>
        </View>

        <View
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 20,
            padding: 20,
            gap: 12,
            borderWidth: 1,
            borderColor: "#EEF1ED",
            shadowColor: "#141712",
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.08,
            shadowRadius: 12,
            elevation: 6,
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
            borderWidth: 1,
            borderColor: "#EEF1ED",
            shadowColor: "#141712",
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.08,
            shadowRadius: 12,
            elevation: 6,
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
