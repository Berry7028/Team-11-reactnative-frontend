import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, Switch, Text, TextInput, View } from "react-native";

import { GrassBackground } from "@/components/grass-background";
import { AvatarImage } from "@/components/ui/avatar-image";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";
import { useAuth } from "@/hooks/use-auth";
import { getMyProfile, updateMyAvatar } from "@/lib/api";

const DEBUG_SKIP_QUESTIONNAIRE_LIMIT_KEY = "debug:skipQuestionnaireLimit";
const DEBUG_SHOW_ENCOUNTERS_WITHOUT_NIGHT_KEY = "debug:showEncountersWithoutNight";

const getDebugSkipLimit = async (): Promise<boolean> => {
  try {
    const raw = await AsyncStorage.getItem(DEBUG_SKIP_QUESTIONNAIRE_LIMIT_KEY);
    return raw === "true";
  } catch {
    return false;
  }
};

const setDebugSkipLimit = async (value: boolean) => {
  try {
    await AsyncStorage.setItem(DEBUG_SKIP_QUESTIONNAIRE_LIMIT_KEY, String(value));
  } catch {
    // エラーは無視
  }
};

const getDebugShowEncountersWithoutNight = async (): Promise<boolean> => {
  try {
    const raw = await AsyncStorage.getItem(DEBUG_SHOW_ENCOUNTERS_WITHOUT_NIGHT_KEY);
    return raw === "true";
  } catch {
    return false;
  }
};

const setDebugShowEncountersWithoutNight = async (value: boolean) => {
  try {
    await AsyncStorage.setItem(DEBUG_SHOW_ENCOUNTERS_WITHOUT_NIGHT_KEY, String(value));
  } catch {
    // エラーは無視
  }
};

export default function SettingsScreen() {
  const router = useRouter();
  const { signOut, session } = useAuth();
  const [skipQuestionnaireLimit, setSkipQuestionnaireLimit] = useState(false);
  const [showEncountersWithoutNight, setShowEncountersWithoutNight] = useState(false);
  const [profileAvatarUrl, setProfileAvatarUrl] = useState<string | null>(null);
  const [avatarUrlInput, setAvatarUrlInput] = useState("");
  const [isSavingAvatar, setIsSavingAvatar] = useState(false);

  const loadProfile = useCallback(async () => {
    try {
      const profile = await getMyProfile();
      const avatarUrl = profile?.avatar_url ?? null;
      setProfileAvatarUrl(avatarUrl);
      setAvatarUrlInput(avatarUrl ?? "");
    } catch (error) {
      console.error("プロフィールの取得に失敗:", error);
    }
  }, []);

  useEffect(() => {
    const loadDebugSettings = async () => {
      const skipLimit = await getDebugSkipLimit();
      const showEncounters = await getDebugShowEncountersWithoutNight();
      setSkipQuestionnaireLimit(skipLimit);
      setShowEncountersWithoutNight(showEncounters);
    };
    loadDebugSettings();
  }, []);

  useEffect(() => {
    if (session?.user) {
      loadProfile();
    }
  }, [session?.user, loadProfile]);

  const handleToggleSkipLimit = async (value: boolean) => {
    await setDebugSkipLimit(value);
    setSkipQuestionnaireLimit(value);
    Alert.alert(
      value ? "有効化" : "無効化",
      value
        ? "アンケートの回答制限がスキップされました"
        : "アンケートの回答制限が有効になりました"
    );
  };

  const handleToggleShowEncounters = async (value: boolean) => {
    await setDebugShowEncountersWithoutNight(value);
    setShowEncountersWithoutNight(value);
    Alert.alert(
      value ? "有効化" : "無効化",
      value
        ? "夜のアンケートを答えなくてもすれ違いを見れるようになりました"
        : "夜のアンケート完了が必要になりました"
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

  const handleSaveAvatarUrl = async () => {
    setIsSavingAvatar(true);
    try {
      await updateMyAvatar(avatarUrlInput);
      await loadProfile();
    } catch {
      Alert.alert("エラー", "アバターURLの保存に失敗しました");
    } finally {
      setIsSavingAvatar(false);
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
        contentContainerStyle={{ paddingBottom: 32, paddingTop: 16, gap: 20 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
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
            <AvatarImage avatarUrl={profileAvatarUrl} size={48} />
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

          {/* アバターURL入力 */}
          <View style={{ marginTop: 16, gap: 8 }}>
            <Text
              selectable
              style={{
                fontSize: 12,
                fontWeight: "700",
                color: "#718268",
                fontFamily: Fonts.rounded,
              }}
            >
              アバターURL
            </Text>
            <TextInput
              placeholder="https://..."
              placeholderTextColor="rgba(113, 130, 104, 0.5)"
              value={avatarUrlInput}
              onChangeText={setAvatarUrlInput}
              style={{
                height: 44,
                borderRadius: 12,
                backgroundColor: "rgba(168, 223, 142, 0.1)",
                paddingHorizontal: 14,
                fontSize: 13,
                color: "#141712",
                fontFamily: Fonts.rounded,
              }}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Pressable
              onPress={handleSaveAvatarUrl}
              disabled={isSavingAvatar}
              style={{
                backgroundColor: "rgba(168, 223, 142, 0.3)",
                borderRadius: 12,
                paddingVertical: 10,
                alignItems: "center",
                opacity: isSavingAvatar ? 0.7 : 1,
              }}
            >
              <Text
                selectable
                style={{
                  fontSize: 13,
                  fontWeight: "700",
                  color: "#3A4D39",
                  fontFamily: Fonts.rounded,
                }}
              >
                {isSavingAvatar ? "保存中..." : "保存"}
              </Text>
            </Pressable>
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "rgba(255, 170, 184, 0.1)",
              borderRadius: 12,
              paddingVertical: 12,
              paddingHorizontal: 14,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8, flex: 1 }}>
              <IconSymbol name="eye.fill" size={16} color="#FFAAB8" />
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
                  すれ違いをデバッグモードで見る
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
                  デバッグ用: 夜のアンケート未回答でもすれ違いを表示
                </Text>
              </View>
            </View>
            <Switch
              value={showEncountersWithoutNight}
              onValueChange={handleToggleShowEncounters}
              trackColor={{ false: "#E5E5E5", true: "rgba(255, 170, 184, 0.5)" }}
              thumbColor={showEncountersWithoutNight ? "#FFAAB8" : "#F4F3F4"}
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
