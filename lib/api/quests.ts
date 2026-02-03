import { apiRequest } from "./client";
import type { Quest } from "./types";

/**
 * 当日分のクエストを取得する（表示用にあいうえお順で返す）
 */
export async function getTodayQuests(userUuid: string): Promise<Quest[]> {
  const data = await apiRequest<Quest[]>("/api/quests/get", {
    method: "GET",
    userUuid,
  });
  return data.slice().sort((a, b) => a.title.localeCompare(b.title, "ja"));
}

/**
 * クエストの完了状態をトグルする
 */
export async function toggleQuestComplete(
  userUuid: string,
  questId: number
): Promise<Quest> {
  return apiRequest<Quest>(`/api/quests/${questId}/complete`, {
    method: "POST",
    userUuid,
  });
}
