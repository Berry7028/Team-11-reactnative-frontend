import { Image } from "expo-image";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import { GrassBackground } from "@/components/grass-background";
import { MoodInputSection, type MoodInputData } from "@/components/mood-input-section";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";
import { useAuth } from "@/hooks/use-auth";
import { useNightQuestionnaire } from "@/hooks/use-night-questionnaire";
import {
  ApiRequestError,
  generateRecommendations,
  submitMorningQuestionnaire,
  submitNightQuestionnaire,
} from "@/lib/api";

type TimeOfDay = "day" | "night";

const MORNING_START_HOUR = 5;
const NIGHT_START_HOUR = 18;
const STORAGE_KEYS = {
  morning: "questionnaire:lastSubmitted:morning",
  night: "questionnaire:lastSubmitted:night",
} as const;

const DEBUG_SKIP_QUESTIONNAIRE_LIMIT_KEY = "debug:skipQuestionnaireLimit";

const getDebugSkipLimit = (): boolean => {
  if (typeof localStorage === "undefined") return false;
  const raw = localStorage.getItem(DEBUG_SKIP_QUESTIONNAIRE_LIMIT_KEY);
  return raw === "true";
};

const padTime = (value: number) => value.toString().padStart(2, "0");

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const getTimeOfDay = (now: Date): TimeOfDay =>
  now.getHours() >= MORNING_START_HOUR && now.getHours() < NIGHT_START_HOUR
    ? "day"
    : "night";

const getWindowStart = (now: Date, timeOfDay: TimeOfDay) => {
  const start = new Date(now);

  if (timeOfDay === "day") {
    start.setHours(MORNING_START_HOUR, 0, 0, 0);
    return start;
  }

  if (now.getHours() >= NIGHT_START_HOUR) {
    start.setHours(NIGHT_START_HOUR, 0, 0, 0);
    return start;
  }

  start.setDate(start.getDate() - 1);
  start.setHours(NIGHT_START_HOUR, 0, 0, 0);
  return start;
};

const getNextWindowStart = (now: Date, timeOfDay: TimeOfDay) => {
  const next = new Date(now);
  if (timeOfDay === "day") {
    next.setHours(NIGHT_START_HOUR, 0, 0, 0);
    return next;
  }

  if (now.getHours() < MORNING_START_HOUR) {
    next.setHours(MORNING_START_HOUR, 0, 0, 0);
    return next;
  }

  next.setDate(next.getDate() + 1);
  next.setHours(MORNING_START_HOUR, 0, 0, 0);
  return next;
};

const formatClockTime = (date: Date) =>
  `${padTime(date.getHours())}:${padTime(date.getMinutes())}`;

const formatCountdown = (milliseconds: number) => {
  if (milliseconds <= 0) return "00:00:00";
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`;
};

const getStoredTimestamp = (key: string) => {
  if (typeof localStorage === "undefined") return null;
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  const value = Number(raw);
  return Number.isFinite(value) ? value : null;
};

const setStoredTimestamp = (key: string, value: number) => {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(key, String(value));
};

export default function DailyMoodScreen() {
  const [now, setNow] = useState(() => new Date());
  const timeOfDay = useMemo(() => getTimeOfDay(now), [now]);
  const { session } = useAuth();
  const { markAsCompleted } = useNightQuestionnaire();
  const [moodData, setMoodData] = useState<MoodInputData>({
    mood: null,
    condition: null,
    freeText: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastMorningSubmittedAt, setLastMorningSubmittedAt] =
    useState<number | null>(null);
  const [lastNightSubmittedAt, setLastNightSubmittedAt] =
    useState<number | null>(null);

  const userUuid = session?.user?.id;

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setLastMorningSubmittedAt(getStoredTimestamp(STORAGE_KEYS.morning));
    setLastNightSubmittedAt(getStoredTimestamp(STORAGE_KEYS.night));
  }, []);

  const windowStart = useMemo(
    () => getWindowStart(now, timeOfDay),
    [now, timeOfDay],
  );
  const nextWindowStart = useMemo(
    () => getNextWindowStart(now, timeOfDay),
    [now, timeOfDay],
  );

  const lastSubmittedAt =
    timeOfDay === "day" ? lastMorningSubmittedAt : lastNightSubmittedAt;
  const skipLimit = getDebugSkipLimit();
  const hasSubmittedThisWindow =
    !skipLimit && lastSubmittedAt !== null && lastSubmittedAt >= windowStart.getTime();
  const nextCountdown = useMemo(
    () => formatCountdown(nextWindowStart.getTime() - now.getTime()),
    [nextWindowStart, now],
  );
  const nextWindowLabel = useMemo(() => {
    const dayLabel = isSameDay(now, nextWindowStart) ? "今日" : "明日";
    return `${dayLabel} ${formatClockTime(nextWindowStart)}`;
  }, [now, nextWindowStart]);

  const handleMoodChange = (data: MoodInputData) => {
    setMoodData(data);
  };

  const handleSubmitMorning = async () => {
    if (hasSubmittedThisWindow) {
      Alert.alert("回答済み", "次のアンケートまでお待ちください。");
      return;
    }
    if (!userUuid) {
      Alert.alert("エラー", "ログインしてください");
      return;
    }
    if (!moodData.mood || !moodData.condition) {
      Alert.alert("入力エラー", "気分と体調を選択してください");
      return;
    }

    setIsSubmitting(true);
    try {
      await submitMorningQuestionnaire(userUuid, {
        mood: moodData.mood,
        condition: moodData.condition,
        free_text: moodData.freeText,
      });

      // AIレコメンデーション生成
      await generateRecommendations(userUuid);

      const submittedAt = Date.now();
      setStoredTimestamp(STORAGE_KEYS.morning, submittedAt);
      setLastMorningSubmittedAt(submittedAt);

      Alert.alert("完了", "記録を保存しました！クエストが生成されました。");
    } catch (error) {
      const message =
        error instanceof ApiRequestError
          ? error.message
          : "保存に失敗しました";
      Alert.alert("エラー", message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitNight = async () => {
    if (hasSubmittedThisWindow) {
      Alert.alert("回答済み", "次のアンケートまでお待ちください。");
      return;
    }
    if (!userUuid) {
      Alert.alert("エラー", "ログインしてください");
      return;
    }
    if (!moodData.mood || !moodData.condition) {
      Alert.alert("入力エラー", "気分と体調を選択してください");
      return;
    }

    setIsSubmitting(true);
    try {
      await submitNightQuestionnaire(userUuid, {
        mood: moodData.mood,
        condition: moodData.condition,
        free_text: moodData.freeText,
      });

      const submittedAt = Date.now();
      setStoredTimestamp(STORAGE_KEYS.night, submittedAt);
      setLastNightSubmittedAt(submittedAt);
      // 夜アンケート完了フラグを立てる
      await markAsCompleted();
      
      Alert.alert("おやすみなさい", "今日もお疲れ様でした。ゆっくり休んでね。\n\nログ画面ですれ違った仲間が見られます！");
    } catch (error) {
      const message =
        error instanceof ApiRequestError
          ? error.message
          : "保存に失敗しました";
      Alert.alert("エラー", message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (timeOfDay === "night") {
    // 夜モード: 簡略版振り返りUI
    return (
      <GrassBackground>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{ flex: 1, backgroundColor: "transparent" }}
          contentContainerStyle={{ paddingBottom: 32, paddingTop: 8, gap: 20 }}
        >
          {hasSubmittedThisWindow ? (
            // 回答済み: カウントダウンを画面全体に表示
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 24,
                minHeight: 500,
                gap: 24,
              }}
            >
              <View style={{ position: "relative" }}>
                <View
                  style={{
                    position: "absolute",
                    top: -20,
                    right: -20,
                    bottom: -20,
                    left: -20,
                    borderRadius: 999,
                    backgroundColor: "rgba(168, 223, 142, 0.2)",
                    boxShadow: "0 0 30px rgba(168, 223, 142, 0.5)",
                  }}
                />
                <Image
                  source={{
                    uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAnRhmMC5GjX_fjyyVvxSvdcURfBGboqlUhBitULtZAOxfPf3LTQB2zghqu2puS_Vf849jjUo759GxZ5Zt-xRCs2F78e_TzgvOr1FJelwwJpaB8PheAHy83gFCWbCSiFKLy_kZQZRsC_ggZvk9JXsUT_gRmTKxqK6O4BIfCHFbkAiUVfQ7rhbdcp9Cr-KGc7ZUdW_rWAvWC1Aevv6kQBErtZOXwFzYwinRNr9FVM606UNpFLuAZuiP6Ib37CmmTmzdVEj7Dva7AARhS",
                  }}
                  contentFit="contain"
                  style={{ width: 120, height: 120 }}
                />
              </View>

              <View style={{ alignItems: "center", gap: 8 }}>
                <Text
                  selectable
                  style={{
                    fontSize: 16,
                    fontWeight: "700",
                    color: "#475569",
                    fontFamily: Fonts.rounded,
                  }}
                >
                  今日もお疲れ様でした
                </Text>
                <Text
                  selectable
                  style={{
                    fontSize: 13,
                    color: "#94A3B8",
                    fontFamily: Fonts.rounded,
                  }}
                >
                  次のアンケート開始まで
                </Text>
              </View>

              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  gap: 12,
                  paddingVertical: 32,
                  paddingHorizontal: 24,
                  borderRadius: 24,
                  backgroundColor: "rgba(255,255,255,0.8)",
                  borderWidth: 1,
                  borderColor: "rgba(255,255,255,0.9)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                }}
              >
                <Text
                  selectable
                  style={{
                    fontSize: 48,
                    fontWeight: "700",
                    color: "#0F172A",
                    fontVariant: ["tabular-nums"],
                    fontFamily: Fonts.rounded,
                    letterSpacing: 2,
                  }}
                >
                  {nextCountdown}
                </Text>
                <Text
                  selectable
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: "#94A3B8",
                    fontFamily: Fonts.rounded,
                  }}
                >
                  {nextWindowLabel} に再回答できます
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                  backgroundColor: "rgba(255,255,255,0.6)",
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 999,
                  borderWidth: 1,
                  borderColor: "rgba(255,255,255,0.6)",
                }}
              >
                <IconSymbol name="moon.stars.fill" size={18} color="#FFAAB8" />
                <Text
                  selectable
                  style={{
                    fontSize: 13,
                    fontWeight: "700",
                    color: "#94A3B8",
                    fontFamily: Fonts.rounded,
                  }}
                >
                  ゆっくり休んでね
                </Text>
              </View>
            </View>
          ) : (
            <>
              <View style={{ paddingHorizontal: 20 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    selectable
                    style={{
                      fontSize: 14,
                      fontWeight: "700",
                      color: "#475569",
                      fontFamily: Fonts.rounded,
                    }}
                  >
                    今の気分を教えて？
                  </Text>
                  <View style={{ position: "relative" }}>
                    <View
                      style={{
                        position: "absolute",
                        top: -10,
                        right: -10,
                        bottom: -10,
                        left: -10,
                        borderRadius: 999,
                        backgroundColor: "rgba(168, 223, 142, 0.3)",
                        boxShadow: "0 0 18px rgba(168, 223, 142, 0.6)",
                      }}
                    />
                    <Image
                      source={{
                        uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAnRhmMC5GjX_fjyyVvxSvdcURfBGboqlUhBitULtZAOxfPf3LTQB2zghqu2puS_Vf849jjUo759GxZ5Zt-xRCs2F78e_TzgvOr1FJelwwJpaB8PheAHy83gFCWbCSiFKLy_kZQZRsC_ggZvk9JXsUT_gRmTKxqK6O4BIfCHFbkAiUVfQ7rhbdcp9Cr-KGc7ZUdW_rWAvWC1Aevv6kQBErtZOXwFzYwinRNr9FVM606UNpFLuAZuiP6Ib37CmmTmzdVEj7Dva7AARhS",
                      }}
                      contentFit="contain"
                      style={{ width: 84, height: 84 }}
                    />
                  </View>
                </View>
              </View>

              <MoodInputSection
                placeholder="今日あったことや、今の気持ちを全部吐き出してみてね..."
                onChange={handleMoodChange}
              />

              <View style={{ paddingHorizontal: 24, alignItems: "center", gap: 12 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                    backgroundColor: "rgba(255,255,255,0.6)",
                    paddingHorizontal: 16,
                    paddingVertical: 6,
                    borderRadius: 999,
                    borderWidth: 1,
                    borderColor: "rgba(255,255,255,0.6)",
                  }}
                >
                  <IconSymbol name="moon.stars.fill" size={16} color="#FFAAB8" />
                  <Text
                    selectable
                    style={{
                      fontSize: 11,
                      fontWeight: "700",
                      color: "#94A3B8",
                      fontFamily: Fonts.rounded,
                    }}
                  >
                    ゆっくり休んでね
                  </Text>
                </View>
                <Pressable
                  onPress={handleSubmitNight}
                  disabled={isSubmitting}
                  style={{
                    width: "100%",
                    backgroundColor: "#FFAAB8",
                    borderRadius: 999,
                    paddingVertical: 16,
                    alignItems: "center",
                    boxShadow: "0 8px 18px rgba(255, 170, 184, 0.4)",
                    opacity: isSubmitting ? 0.6 : 1,
                  }}
                >
                  {isSubmitting ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <Text
                      selectable
                      style={{
                        fontSize: 16,
                        fontWeight: "700",
                        color: "#FFFFFF",
                        fontFamily: Fonts.rounded,
                      }}
                    >
                      おやすみなさい
                    </Text>
                  )}
                </Pressable>
              </View>
            </>
          )}
        </ScrollView>
      </GrassBackground>
    );
  }

  // 日中モード
  return (
    <GrassBackground>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ flex: 1, backgroundColor: "transparent" }}
        contentContainerStyle={{ paddingBottom: 28, paddingTop: 8, gap: 20 }}
      >
      {!hasSubmittedThisWindow && (
        <View style={{ paddingHorizontal: 24, alignItems: "center", gap: 18 }}>
          <View style={{ alignItems: "center", gap: 12 }}>
            <View style={{ position: "relative" }}>
              <View
                style={{
                  backgroundColor: "#FFFFFF",
                  padding: 14,
                  borderRadius: 999,
                  borderWidth: 4,
                  borderColor: "#FFFFFF",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.08)",
                }}
              >
                <Image
                  source={{
                    uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDT_5wjRFwJoR7GXTvgMqmJikC5wzKm5Yvp3tZ51nbh9qIp_B2W5vM_4o64OZATfYIfg6m0K3rehQKcXyDgjP9w8NLa-LwsBvlWlkdLQcZoGiu7gHOgZuBUoMtPoI6M7uz3n4v34ciT3Slcdb-GcVeUm4o3RbxRiy_mwc_ykFJaN1NMKQh4Fgcp43GPnEDHjTTt562Sdo7IGg_z8IfEDgX8s_tcePmkWWR_byDWHNs6LZclP9uErItqdq0vbRnDf9aPmfOTXFIOglFG",
                  }}
                  contentFit="cover"
                  style={{ height: 96, width: 96, borderRadius: 48 }}
                />
              </View>
              <View
                style={{
                  position: "absolute",
                  top: -4,
                  right: -4,
                  backgroundColor: "#FFAAB8",
                  height: 28,
                  width: 28,
                  borderRadius: 999,
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 8px rgba(255, 170, 184, 0.4)",
                }}
              >
                <IconSymbol name="heart.fill" size={14} color="#FFFFFF" />
              </View>
            </View>
            <View
              style={{
                backgroundColor: "#FFFFFF",
                paddingVertical: 16,
                paddingHorizontal: 20,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: "rgba(168, 223, 142, 0.2)",
                boxShadow: "0 6px 12px rgba(20, 23, 18, 0.08)",
                borderCurve: "continuous",
              }}
            >
              <View
                style={{
                  position: "absolute",
                  top: -6,
                  left: "50%",
                  marginLeft: -6,
                  height: 12,
                  width: 12,
                  backgroundColor: "#FFFFFF",
                  transform: [{ rotate: "45deg" }],
                  borderLeftWidth: 1,
                  borderTopWidth: 1,
                  borderColor: "rgba(168, 223, 142, 0.2)",
                }}
              />
              <Text
                selectable
                style={{
                  fontSize: 16,
                  fontWeight: "700",
                  color: "#141712",
                  textAlign: "center",
                  fontFamily: Fonts.rounded,
                }}
              >
                今の気分を教えて？
              </Text>
              <Text
                selectable
                style={{
                  fontSize: 12,
                  color: "#718268",
                  textAlign: "center",
                  marginTop: 4,
                  fontFamily: Fonts.rounded,
                }}
              >
                いつでもお話聞くよ。
              </Text>
            </View>
          </View>
        </View>
      )}

      {hasSubmittedThisWindow ? (
        // 回答済み: カウントダウンを画面全体に表示
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 24,
            minHeight: 500,
            gap: 24,
          }}
        >
          <View style={{ alignItems: "center", gap: 12 }}>
            <View style={{ position: "relative" }}>
              <View
                style={{
                  backgroundColor: "#FFFFFF",
                  padding: 18,
                  borderRadius: 999,
                  borderWidth: 4,
                  borderColor: "#FFFFFF",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Image
                  source={{
                    uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDT_5wjRFwJoR7GXTvgMqmJikC5wzKm5Yvp3tZ51nbh9qIp_B2W5vM_4o64OZATfYIfg6m0K3rehQKcXyDgjP9w8NLa-LwsBvlWlkdLQcZoGiu7gHOgZuBUoMtPoI6M7uz3n4v34ciT3Slcdb-GcVeUm4o3RbxRiy_mwc_ykFJaN1NMKQh4Fgcp43GPnEDHjTTt562Sdo7IGg_z8IfEDgX8s_tcePmkWWR_byDWHNs6LZclP9uErItqdq0vbRnDf9aPmfOTXFIOglFG",
                  }}
                  contentFit="cover"
                  style={{ height: 100, width: 100, borderRadius: 50 }}
                />
              </View>
              <View
                style={{
                  position: "absolute",
                  top: -4,
                  right: -4,
                  backgroundColor: "#FFAAB8",
                  height: 32,
                  width: 32,
                  borderRadius: 999,
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(255, 170, 184, 0.5)",
                }}
              >
                <IconSymbol name="checkmark" size={18} color="#FFFFFF" />
              </View>
            </View>
            <Text
              selectable
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: "#141712",
                fontFamily: Fonts.rounded,
              }}
            >
              回答ありがとう！
            </Text>
            <Text
              selectable
              style={{
                fontSize: 13,
                color: "#718268",
                fontFamily: Fonts.rounded,
              }}
            >
              次のアンケート開始まで
            </Text>
          </View>

          <View
            style={{
              width: "100%",
              alignItems: "center",
              gap: 12,
              paddingVertical: 32,
              paddingHorizontal: 24,
              borderRadius: 24,
              backgroundColor: "rgba(255,255,255,0.8)",
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.9)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            }}
          >
            <Text
              selectable
              style={{
                fontSize: 48,
                fontWeight: "700",
                color: "#141712",
                fontVariant: ["tabular-nums"],
                fontFamily: Fonts.rounded,
                letterSpacing: 2,
              }}
            >
              {nextCountdown}
            </Text>
            <Text
              selectable
              style={{
                fontSize: 12,
                fontWeight: "600",
                color: "#718268",
                fontFamily: Fonts.rounded,
              }}
            >
              {nextWindowLabel} に再回答できます
            </Text>
          </View>
        </View>
      ) : (
        <>
          <MoodInputSection
            placeholder="今の気持ちを自由に書いてね..."
            onChange={handleMoodChange}
          />

          <View style={{ paddingHorizontal: 24 }}>
            <Pressable
              onPress={handleSubmitMorning}
              disabled={isSubmitting}
              style={{
                backgroundColor: "#A8DF8E",
                borderRadius: 999,
                paddingVertical: 16,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                gap: 8,
                boxShadow: "0 10px 18px rgba(168, 223, 142, 0.4)",
                opacity: isSubmitting ? 0.6 : 1,
              }}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <>
                  <Text
                    selectable
                    style={{
                      color: "#FFFFFF",
                      fontSize: 14,
                      fontWeight: "700",
                      fontFamily: Fonts.rounded,
                    }}
                  >
                    記録を保存する
                  </Text>
                  <IconSymbol
                    name="checkmark.circle.fill"
                    size={18}
                    color="#FFFFFF"
                  />
                </>
              )}
            </Pressable>
          </View>
        </>
      )}
      </ScrollView>
    </GrassBackground>
  );
}
