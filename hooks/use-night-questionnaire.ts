import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const NIGHT_QUESTIONNAIRE_KEY = "night_questionnaire_completed";

/**
 * 夜アンケート回答フラグを管理するフック
 */
export function useNightQuestionnaire() {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 初期化: ストレージから読み込む
  useEffect(() => {
    const loadCompletionStatus = async () => {
      try {
        const today = new Date().toISOString().split("T")[0];
        const stored = await AsyncStorage.getItem(NIGHT_QUESTIONNAIRE_KEY);

        if (stored) {
          const data = JSON.parse(stored);
          // 日付が今日なら完了済み、それ以外はリセット
          if (data.date === today) {
            setIsCompleted(true);
          } else {
            // 日付が変わっていればリセット
            await AsyncStorage.removeItem(NIGHT_QUESTIONNAIRE_KEY);
            setIsCompleted(false);
          }
        }
      } catch (error) {
        console.error("夜アンケートフラグの読み込みに失敗:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCompletionStatus();
  }, []);

  // アンケート完了を記録
  const markAsCompleted = async () => {
    try {
      const today = new Date().toISOString().split("T")[0];
      await AsyncStorage.setItem(
        NIGHT_QUESTIONNAIRE_KEY,
        JSON.stringify({ date: today, completed: true })
      );
      setIsCompleted(true);
    } catch (error) {
      console.error("夜アンケートフラグの保存に失敗:", error);
    }
  };

  // 手動リセット（テスト用）
  const reset = async () => {
    try {
      await AsyncStorage.removeItem(NIGHT_QUESTIONNAIRE_KEY);
      setIsCompleted(false);
    } catch (error) {
      console.error("夜アンケートフラグのリセットに失敗:", error);
    }
  };

  return {
    isCompleted,
    isLoading,
    markAsCompleted,
    reset,
  };
}
