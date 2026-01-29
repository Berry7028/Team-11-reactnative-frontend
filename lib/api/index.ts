// API Client
export { apiRequest, ApiRequestError } from "./client";

// Questionnaire API
export {
  submitMorningQuestionnaire,
  submitNightQuestionnaire,
} from "./questionnaire";

// AI API
export { generateRecommendations, getHint } from "./ai";

// Quests API
export { getTodayQuests, toggleQuestComplete } from "./quests";

// Types
export type {
  Mood,
  Condition,
  MascotStatus,
  QuestionnaireRequest,
  QuestionnaireResponse,
  Quest,
  RecommendedQuest,
  Mascot,
  RecommendationsResponse,
  HintRequest,
  HintResponse,
  ApiError,
} from "./types";
