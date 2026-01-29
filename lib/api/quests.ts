import { apiRequest } from "./client";
import type { Quest } from "./types";

/**
 * 当日分のクエストを取得する
 */
export async function getTodayQuests(userUuid: string): Promise<Quest[]> {
  return apiRequest<Quest[]>("/api/quests/get", {
    method: "GET",
    userUuid,
  });
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
