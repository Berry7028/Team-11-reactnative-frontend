// API Client
export { apiRequest, ApiRequestError } from "./client";

// Questionnaire API
export {
  submitMorningQuestionnaire,
  submitNightQuestionnaire,
} from "./questionnaire";

// AI API
export { generateRecommendations, getMascotState, getHint } from "./ai";

// Quests API
export { getTodayQuests, toggleQuestComplete } from "./quests";

// Location API
export { recordLocation, getMyEncounters } from "./location";

// User API
export { getMyProfile, updateMyAvatar } from "./user";
export type { MyProfile } from "./user";

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
  EncounterSession,
  EncounterWithQuests,
  CompletedQuest,
} from "./types";
