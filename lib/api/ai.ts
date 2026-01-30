import { apiRequest } from "./client";
import type {
  HintRequest,
  HintResponse,
  Mascot,
  RecommendationsResponse,
} from "./types";

/**
 * AIレコメンデーション（クエストとマスコット状態）を生成する
 */
export async function generateRecommendations(
  userUuid: string
): Promise<RecommendationsResponse> {
  return apiRequest<RecommendationsResponse>("/api/ai/recommendations/", {
    method: "POST",
    userUuid,
  });
}

/**
 * マスコット状態を取得する
 */
export async function getMascotState(userUuid: string): Promise<Mascot> {
  return apiRequest<Mascot>("/api/ai/mascot-state/", {
    method: "GET",
    userUuid,
  });
}

/**
 * プロンプトに対するヒントを取得する（ダミー実装）
 */
export async function getHint(
  userUuid: string,
  data: HintRequest
): Promise<HintResponse> {
  return apiRequest<HintResponse>("/api/ai/hints/", {
    method: "POST",
    body: data,
    userUuid,
  });
}
