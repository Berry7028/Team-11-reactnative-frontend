import { apiRequest } from "./client";
import type {
  QuestionnaireRequest,
  QuestionnaireResponse,
} from "./types";

/**
 * 朝アンケートを送信する
 */
export async function submitMorningQuestionnaire(
  userUuid: string,
  data: QuestionnaireRequest
): Promise<QuestionnaireResponse> {
  return apiRequest<QuestionnaireResponse>("/api/questionnaire/morning", {
    method: "POST",
    body: data,
    userUuid,
  });
}

/**
 * 夜アンケートを送信する
 */
export async function submitNightQuestionnaire(
  userUuid: string,
  data: QuestionnaireRequest
): Promise<QuestionnaireResponse> {
  return apiRequest<QuestionnaireResponse>("/api/questionnaire/night", {
    method: "POST",
    body: data,
    userUuid,
  });
}
