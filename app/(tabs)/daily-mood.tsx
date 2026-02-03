import { type Href, useRouter } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Alert, AppState, AppStateStatus } from "react-native";
import * as Notifications from "expo-notifications";

import { MorningMoodScreen } from "@/components/daily-mood/MorningMoodScreen";
import { NightMoodScreen } from "@/components/daily-mood/NightMoodScreen";
import { type MoodInputData } from "@/components/mood-input-section";
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
  const router = useRouter();
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
  const appState = useRef<AppStateStatus>(AppState.currentState);
  const isProcessingAI = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setLastMorningSubmittedAt(getStoredTimestamp(STORAGE_KEYS.morning));
    setLastNightSubmittedAt(getStoredTimestamp(STORAGE_KEYS.night));
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      appState.current = nextAppState;
    });
    return () => subscription.remove();
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
    !skipLimit &&
    lastSubmittedAt !== null &&
    lastSubmittedAt >= windowStart.getTime();
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

  const processAIInBackground = async (userUuid: string) => {
    isProcessingAI.current = true;
    try {
      await generateRecommendations(userUuid);
      if (appState.current !== "active") {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "クエスト生成完了！",
            body: "新しいクエストが生成されました。確認してみてね！",
            data: { type: "quest_generated" },
          },
          trigger: null,
        });
      }
    } catch (error) {
      console.error("AI処理エラー:", error);
      if (appState.current !== "active") {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "クエスト生成",
            body: "クエストの生成に時間がかかっています。しばらくしてから確認してください。",
            data: { type: "quest_delayed" },
          },
          trigger: null,
        });
      }
    } finally {
      isProcessingAI.current = false;
    }
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

      const submittedAt = Date.now();
      setStoredTimestamp(STORAGE_KEYS.morning, submittedAt);
      setLastMorningSubmittedAt(submittedAt);

      Alert.alert("完了", "記録を保存しました！", [
        { text: "OK", onPress: () => router.replace("/(tabs)" as Href) },
      ]);

      processAIInBackground(userUuid);
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
      await markAsCompleted();

      Alert.alert(
        "おやすみなさい",
        "今日もお疲れ様でした。ゆっくり休んでね。\n\nログ画面ですれ違った仲間が見られます！",
      );
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

  const commonProps = {
    hasSubmittedThisWindow,
    nextCountdown,
    nextWindowLabel,
    moodData,
    onMoodChange: handleMoodChange,
    isSubmitting,
  };

  if (timeOfDay === "night") {
    return (
      <NightMoodScreen
        {...commonProps}
        onSubmit={handleSubmitNight}
      />
    );
  }

  return (
    <MorningMoodScreen
      {...commonProps}
      onSubmit={handleSubmitMorning}
    />
  );
}
