import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  AppState,
  AppStateStatus,
  ScrollView,
} from "react-native";
import * as Notifications from "expo-notifications";

import { GrassBackground } from "@/components/grass-background";
import { DayHeader } from "@/components/daily-mood/day-header";
import { DayMoodForm } from "@/components/daily-mood/day-mood-form";
import { DaySubmittedView } from "@/components/daily-mood/day-submitted-view";
import { NightMoodForm } from "@/components/daily-mood/night-mood-form";
import { NightSubmittedView } from "@/components/daily-mood/night-submitted-view";
import type { MoodInputData } from "@/components/mood-input-section";
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

const getDebugSkipLimit = async (): Promise<boolean> => {
  try {
    const raw = await AsyncStorage.getItem(DEBUG_SKIP_QUESTIONNAIRE_LIMIT_KEY);
    return raw === "true";
  } catch {
    return false;
  }
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

const getStoredTimestamp = async (key: string): Promise<number | null> => {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return null;
    const value = Number(raw);
    return Number.isFinite(value) ? value : null;
  } catch {
    return null;
  }
};

const setStoredTimestamp = async (key: string, value: number): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, String(value));
  } catch {
    // エラーは無視
  }
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
  const [skipLimit, setSkipLimit] = useState(false);

  const userUuid = session?.user?.id;
  const appState = useRef<AppStateStatus>(AppState.currentState);
  const isProcessingAI = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const morning = await getStoredTimestamp(STORAGE_KEYS.morning);
        const night = await getStoredTimestamp(STORAGE_KEYS.night);
        const skip = await getDebugSkipLimit();
        setLastMorningSubmittedAt(morning);
        setLastNightSubmittedAt(night);
        setSkipLimit(skip);
      } catch (error) {
        console.error("Failed to load stored data:", error);
        // Continue with default values on error
      }
    };
    loadStoredData();
  }, []);

  // アプリのフォアグラウンド/バックグラウンド状態を監視
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
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

  const processAIInBackground = async (userUuid: string) => {
    isProcessingAI.current = true;
    try {
      await generateRecommendations(userUuid);
      
      // アプリがバックグラウンドの場合のみ通知を表示
      if (appState.current !== 'active') {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "クエスト生成完了！",
            body: "新しいクエストが生成されました。確認してみてね！",
            data: { type: "quest_generated" },
          },
          trigger: null, // 即時表示
        });
      }
    } catch (error) {
      console.error("AI処理エラー:", error);
      // エラー時もバックグラウンドなら通知
      if (appState.current !== 'active') {
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
      await setStoredTimestamp(STORAGE_KEYS.morning, submittedAt);
      setLastMorningSubmittedAt(submittedAt);

      // 即時フィードバックを表示
      Alert.alert("完了", "記録を保存しました！");

      // AI処理はバックグラウンドで非同期実行
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
      await setStoredTimestamp(STORAGE_KEYS.night, submittedAt);
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
            <NightSubmittedView
              nextCountdown={nextCountdown}
              nextWindowLabel={nextWindowLabel}
            />
          ) : (
            <>
              <NightMoodForm
                onMoodChange={handleMoodChange}
                onSubmit={handleSubmitNight}
                isSubmitting={isSubmitting}
              />
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
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {!hasSubmittedThisWindow && <DayHeader />}
        {hasSubmittedThisWindow ? (
          <DaySubmittedView
            nextCountdown={nextCountdown}
            nextWindowLabel={nextWindowLabel}
          />
        ) : (
          <DayMoodForm
            onMoodChange={handleMoodChange}
            onSubmit={handleSubmitMorning}
            isSubmitting={isSubmitting}
          />
        )}
      </ScrollView>
    </GrassBackground>
  );
}
