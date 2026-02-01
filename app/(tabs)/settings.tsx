import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";

import { GrassBackground } from "@/components/grass-background";
import { AccountCard } from "@/components/settings/account-card";
import { DebugNotificationsCard } from "@/components/settings/debug-notifications-card";
import { DebugSettingsCard } from "@/components/settings/debug-settings-card";
import { LogoutCard } from "@/components/settings/logout-card";
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
          <AccountCard
            avatarUrl={profileAvatarUrl}
            displayName={session?.user?.user_metadata?.display_name ?? null}
            email={session?.user?.email ?? null}
            avatarUrlInput={avatarUrlInput}
            onAvatarUrlChange={setAvatarUrlInput}
            onSaveAvatar={handleSaveAvatarUrl}
            isSavingAvatar={isSavingAvatar}
          />
          <DebugNotificationsCard
            onMorningPress={() => handleDebugNotification("morning")}
            onNightPress={() => handleDebugNotification("night")}
          />
          <DebugSettingsCard
            skipQuestionnaireLimit={skipQuestionnaireLimit}
            showEncountersWithoutNight={showEncountersWithoutNight}
            onToggleSkipLimit={handleToggleSkipLimit}
            onToggleShowEncounters={handleToggleShowEncounters}
          />
          <LogoutCard onLogout={handleLogout} />
        </View>
      </ScrollView>
    </GrassBackground>
  );
}
