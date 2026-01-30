// 気分の選択肢
export type Mood =
  | "絶好調"
  | "いい感じ"
  | "普通"
  | "モヤモヤ"
  | "つらい";

// 体調の選択肢
export type Condition =
  | "絶好調"
  | "いい感じ"
  | "ふつう"
  | "少しだるい"
  | "つらい";

// マスコットの状態
export type MascotStatus = "Sad" | "Bad" | "Okay" | "Good" | "Great";

// アンケートリクエスト
export interface QuestionnaireRequest {
  mood: Mood;
  condition: Condition;
  free_text?: string;
}

// アンケートレスポンス
export interface QuestionnaireResponse {
  uuid: string;
  morning_mood: Mood | null;
  morning_condition: Condition | null;
  morning_note: string | null;
  night_mood: Mood | null;
  night_condition: Condition | null;
  night_note: string | null;
  created_at: string;
  updated_at: string;
}

// クエスト
export interface Quest {
  id: number;
  uuid: string;
  title: string;
  description: string;
  completed: boolean;
  day: string;
  created_at: string;
  updated_at: string;
}

// AIレコメンデーションのクエスト（生成時）
export interface RecommendedQuest {
  title: string;
  description: string;
}

// マスコット状態
export interface Mascot {
  status: MascotStatus;
  message: string;
}

// AIレコメンデーションレスポンス
export interface RecommendationsResponse {
  quests: RecommendedQuest[];
  mascot: Mascot;
}

// ヒントリクエスト
export interface HintRequest {
  prompt: string;
}

// ヒントレスポンス
export interface HintResponse {
  hint: string;
}

// APIエラー
export interface ApiError {
  detail?: string;
  error?: string;
  [key: string]: unknown;
}
