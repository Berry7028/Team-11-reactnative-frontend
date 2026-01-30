import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, Switch, Text, View } from "react-native";

import { GrassBackground } from "@/components/grass-background";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";
import { useAuth } from "@/hooks/use-auth";

const DEBUG_SKIP_QUESTIONNAIRE_LIMIT_KEY = "debug:skipQuestionnaireLimit";

const getDebugSkipLimit = (): boolean => {
  if (typeof localStorage === "undefined") return false;
  const raw = localStorage.getItem(DEBUG_SKIP_QUESTIONNAIRE_LIMIT_KEY);
  return raw === "true";
};

const setDebugSkipLimit = (value: boolean) => {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(DEBUG_SKIP_QUESTIONNAIRE_LIMIT_KEY, String(value));
};

export default function SettingsScreen() {
  const router = useRouter();
  const { signOut, session } = useAuth();
  const [skipQuestionnaireLimit, setSkipQuestionnaireLimit] = useState(false);

  useEffect(() => {
    setSkipQuestionnaireLimit(getDebugSkipLimit());
  }, []);

  const handleToggleSkipLimit = (value: boolean) => {
    setDebugSkipLimit(value);
    setSkipQuestionnaireLimit(value);
    Alert.alert(
      value ? "有効化" : "無効化",
      value
        ? "アンケートの回答制限がスキップされました"
        : "アンケートの回答制限が有効になりました"
    );
  };

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
    } catch {
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
    <GrassBackground>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ flex: 1, backgroundColor: "transparent" }}
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
            デバッグ設定
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "rgba(168, 223, 142, 0.1)",
              borderRadius: 12,
              paddingVertical: 12,
              paddingHorizontal: 14,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8, flex: 1 }}>
              <IconSymbol name="exclamationmark.triangle.fill" size={16} color="#FFA500" />
              <View style={{ flex: 1 }}>
                <Text
                  selectable
                  style={{
                    fontSize: 12,
                    fontWeight: "700",
                    color: "#3A4D39",
                    fontFamily: Fonts.rounded,
                  }}
                >
                  アンケート回答制限をスキップ
                </Text>
                <Text
                  selectable
                  style={{
                    fontSize: 10,
                    color: "#718268",
                    fontFamily: Fonts.rounded,
                    marginTop: 2,
                  }}
                >
                  デバッグ用: 時間制限なしで回答可能
                </Text>
              </View>
            </View>
            <Switch
              value={skipQuestionnaireLimit}
              onValueChange={handleToggleSkipLimit}
              trackColor={{ false: "#E5E5E5", true: "rgba(168, 223, 142, 0.5)" }}
              thumbColor={skipQuestionnaireLimit ? "#A8DF8E" : "#F4F3F4"}
            />
          </View>
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
    </GrassBackground>
  );
}
