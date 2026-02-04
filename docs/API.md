# API ドキュメント

ユーザーのメンタルヘルスをサポートするAPIの統合ドキュメントです。

## 目次

- [概要](#概要)
- [認証](#認証)
- [APIエンドポイント一覧](#apiエンドポイント一覧)
- [朝夜アンケートAPI](#朝夜アンケートapi)
- [AIレコメンデーションAPI](#aiレコメンデーションapi)
- [マスコットAPI](#マスコットapi)
- [クエストAPI](#クエストapi)
- [完全なフロー](#完全なフロー)
- [データベーススキーマ](#データベーススキーマ)
- [環境変数](#環境変数)
- [エラーハンドリング](#エラーハンドリング)
- [使用例](#使用例)

---

## 概要

本APIは、ユーザーのメンタルヘルスをサポートするための以下の機能を提供します：

1. **朝夜アンケート**: ユーザーの気分と体調を記録
2. **AIレコメンデーション**: アンケート結果を基にAIがクエストとマスコット状態を生成
3. **クエスト管理**: 生成されたクエストの取得と完了状態の管理

すべてのデータはSupabaseに保存されます。

---

## 認証

現在、すべてのAPIエンドポイントは認証不要（`AllowAny`）ですが、**`X-User-UUID`ヘッダーは必須**です。

### 必須ヘッダー

| ヘッダー名 | 説明 | 例 |
|-----------|------|-----|
| `X-User-UUID` | Supabaseの`public.users`テーブルの`uuid` | `550e8400-e29b-41d4-a716-446655440000` |

---

## APIエンドポイント一覧

### 朝夜アンケート

- `POST /api/questionnaire/morning` - 朝アンケート送信
- `POST /api/questionnaire/night` - 夜アンケート送信

### AIレコメンデーション

- `POST /api/ai/recommendations/` - クエストとマスコット状態を生成
- `POST /api/ai/hints/` - プロンプトに対するヒントを返す（ダミー実装）
- `GET /api/ai/mascot-state/` - マスコット状態を取得
- `POST /api/ai/onboarding/complete/` - マスコット生成オンボーディング

### クエスト管理

- `GET /api/quests/get` - 当日分のクエスト取得
- `POST /api/quests/:quest_id/complete` - クエスト完了/取り消し

---

## 朝夜アンケートAPI

### POST /api/questionnaire/morning

朝のアンケート回答を受け付け、Supabaseの`users_condition`テーブルに保存します。

#### リクエスト

**ヘッダー:**
```
X-User-UUID: <ユーザーのUUID> (必須)
Content-Type: application/json
```

**ボディ:**
```json
{
  "mood": "普通",
  "condition": "軽い",
  "free_text": ""
}
```

**フィールド説明:**

| フィールド名 | 型 | 必須 | 説明 |
|------------|-----|------|------|
| `mood` | string | 必須 | 気分（選択肢: `"絶好調"`, `"普通"`, `"モヤモヤ"`, `"つらい"`） |
| `condition` | string | 必須 | 体調（選択肢: `"軽い"`, `"ふつう"`, `"だるい"`） |
| `free_text` | string | 任意 | 自由入力テキスト（最大1000文字、`morning_note`として保存） |

#### レスポンス

**成功時 (201 Created):**
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "morning_mood": "普通",
  "morning_condition": "軽い",
  "morning_note": "今日は調子が良いです",
  "night_mood": null,
  "night_condition": null,
  "night_note": null,
  "created_at": "2026-01-29T02:00:00.000Z",
  "updated_at": "2026-01-29T02:00:00.000Z"
}
```

**エラー時 (400 Bad Request):**
```json
{
  "detail": "X-User-UUID ヘッダーが必要です。"
}
```

または

```json
{
  "mood": ["このフィールドは必須です。"],
  "condition": ["有効な選択肢ではありません。"]
}
```

---

### POST /api/questionnaire/night

夜のアンケート回答を受け付け、Supabaseの`users_condition`テーブルに保存します。

#### リクエスト

**ヘッダー:**
```
X-User-UUID: <ユーザーのUUID> (必須)
Content-Type: application/json
```

**ボディ:**
```json
{
  "mood": "モヤモヤ",
  "condition": "だるい",
  "free_text": ""
}
```

**フィールド説明:**

| フィールド名 | 型 | 必須 | 説明 |
|------------|-----|------|------|
| `mood` | string | 必須 | 気分（選択肢: `"絶好調"`, `"普通"`, `"モヤモヤ"`, `"つらい"`） |
| `condition` | string | 必須 | 体調（選択肢: `"軽い"`, `"ふつう"`, `"だるい"`） |
| `free_text` | string | 任意 | 自由入力テキスト（最大1000文字、`night_note`として保存） |

#### レスポンス

**成功時 (201 Created):**
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "morning_mood": "普通",
  "morning_condition": "軽い",
  "morning_note": "今日は調子が良いです",
  "night_mood": "モヤモヤ",
  "night_condition": "だるい",
  "night_note": "少し疲れました",
  "created_at": "2026-01-29T02:00:00.000Z",
  "updated_at": "2026-01-29T14:00:00.000Z"
}
```

**エラー時 (400 Bad Request):**
```json
{
  "detail": "X-User-UUID ヘッダーが必要です。"
}
```

または

```json
{
  "mood": ["このフィールドは必須です。"],
  "condition": ["有効な選択肢ではありません。"]
}
```

---

## AIレコメンデーションAPI

### POST /api/ai/recommendations/

ユーザーの`users_condition`を元に、AIがクエスト（5件）とマスコット状態を生成し、Supabaseに保存します。

#### リクエスト

**ヘッダー:**
```
X-User-UUID: <ユーザーのUUID> (必須)
```

**ボディ:** 不要

#### レスポンス

**成功時 (200 OK):**
```json
{
  "quests": [
    {
      "title": "5分間の深呼吸",
      "description": "朝の気分が少し重そうなので、リラックスのための深呼吸をおすすめします。"
    },
    {
      "title": "10分間の散歩",
      "description": "軽い運動で気分転換しましょう。"
    },
    ...
  ],
  "mascot": {
    "status": "Okay",
    "message": "今日は少しゆっくりいこう！無理しないでね。"
  }
}
```

**エラー時 (400 Bad Request):**
```json
{
  "error": "X-User-UUID ヘッダーが必要です"
}
```

または

```json
{
  "error": "users_condition が見つかりません"
}
```

#### 保存先

- **quests テーブル**: 当日分のクエストを5件保存（既存の当日分は削除してから挿入）
- **mascots テーブル**: マスコット状態を保存（既存があれば更新）

---

### POST /api/ai/hints/

プロンプトに対するヒントを返す（ダミー実装）。

#### リクエスト

**ボディ:**
```json
{
  "prompt": "質問やプロンプト"
}
```

#### レスポンス

```json
{
  "hint": "Hint for: 質問やプロンプト..."
}
```

---

## マスコットAPI

### GET /api/ai/mascot-state/

マスコット状態（status/message/生成画像URL）を取得します。

#### リクエスト

**ヘッダー:**
```
X-User-UUID: <ユーザーのUUID> (必須)
```

#### レスポンス

**成功時 (200 OK):**
```json
{
  "status": "Good",
  "message": "今日もよく頑張ったね！",
  "image_urls": {
    "Sad": "https://.../sad.png",
    "Bad": "https://.../bad.png",
    "Okay": "https://.../okay.png",
    "Good": "https://.../good.png",
    "Great": "https://.../great.png"
  }
}
```

**エラー時 (404 Not Found):**
```json
{
  "error": "mascot not found"
}
```

---

### POST /api/ai/onboarding/complete/

アンケート回答を元に、ユーザー専用のマスコット画像（5表情）を生成し保存します。

#### リクエスト

**ヘッダー:**
```
X-User-UUID: <ユーザーのUUID> (必須)
Content-Type: application/json
```

**ボディ:**
```json
{
  "personality": "元気いっぱい",
  "favorite_color": "赤系",
  "support_style": "元気に励ます",
  "activity_level": "アクティブ"
}
```

#### レスポンス

**成功時 (201 Created):**
```json
{
  "mascot_id": "550e8400-e29b-41d4-a716-446655440000",
  "image_urls": {
    "Sad": "https://.../sad.png",
    "Bad": "https://.../bad.png",
    "Okay": "https://.../okay.png",
    "Good": "https://.../good.png",
    "Great": "https://.../great.png"
  },
  "message": "あなた専用のキャラクターが完成しました！"
}
```

---

## クエストAPI

### GET /api/quests/get

当日分（`date.today().isoformat()`）のクエストをSupabaseから取得します。

#### リクエスト

**ヘッダー:**
```
X-User-UUID: <ユーザーのUUID> (必須)
```

**ボディ:** 不要

#### レスポンス

**成功時 (200 OK):**
```json
[
  {
    "id": 1,
    "uuid": "550e8400-e29b-41d4-a716-446655440000",
    "title": "5分間の深呼吸",
    "description": "朝の気分が少し重そうなので、リラックスのための深呼吸をおすすめします。",
    "completed": false,
    "day": "2026-01-29",
    "created_at": "2026-01-29T02:00:00.000Z",
    "updated_at": "2026-01-29T02:00:00.000Z"
  },
  {
    "id": 2,
    "uuid": "550e8400-e29b-41d4-a716-446655440000",
    "title": "10分間の散歩",
    "description": "軽い運動で気分転換しましょう。",
    "completed": false,
    "day": "2026-01-29",
    "created_at": "2026-01-29T02:00:00.000Z",
    "updated_at": "2026-01-29T02:00:00.000Z"
  }
]
```

**クエストが0件の場合 (200 OK):**
```json
[]
```

**エラー時 (400 Bad Request):**
```json
{
  "detail": "X-User-UUID ヘッダーが必要です。"
}
```

**エラー時 (500 Internal Server Error):**
```json
{
  "detail": "Supabase設定エラー",
  "error": "SUPABASE_URL または SUPABASE_KEY が未設定です。"
}
```

---

### POST /api/quests/:quest_id/complete

指定されたクエストの`completed`フラグをトグル（反転）します。未完了の場合は完了に、完了の場合は未完了に変更します。

#### リクエスト

**ヘッダー:**
```
X-User-UUID: <ユーザーのUUID> (必須)
```

**ボディ:** 不要（quest_idはURLパラメータで指定）

#### レスポンス

**成功時 (200 OK):**
```json
{
  "id": 123,
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "title": "5分間の深呼吸",
  "description": "朝の気分が少し重そうなので、リラックスのための深呼吸をおすすめします。",
  "completed": true,
  "day": "2026-01-29",
  "created_at": "2026-01-29T02:00:00.000Z",
  "updated_at": "2026-01-29T04:00:00.000Z"
}
```

**エラー時 (400 Bad Request):**
```json
{
  "detail": "X-User-UUID ヘッダーが必要です。"
}
```

**エラー時 (404 Not Found):**
```json
{
  "detail": "クエストが見つかりません。"
}
```

**エラー時 (500 Internal Server Error):**
```json
{
  "detail": "Supabase設定エラー",
  "error": "SUPABASE_URL または SUPABASE_KEY が未設定です。"
}
```

---

## 完全なフロー

### 1. 朝アンケート送信

```bash
POST /api/questionnaire/morning
Headers: X-User-UUID: <uuid>
Body: {
  "mood": "普通",
  "condition": "軽い",
  "free_text": ""
}
```

**レスポンス:**
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "morning_mood": "普通",
  "morning_condition": "軽い",
  "morning_note": "",
  "night_mood": null,
  "night_condition": null,
  "night_note": null,
  "created_at": "2026-01-29T02:00:00.000Z",
  "updated_at": "2026-01-29T02:00:00.000Z"
}
```

### 2. AI レコメンデーション生成

```bash
POST /api/ai/recommendations/
Headers: X-User-UUID: <uuid>
```

**レスポンス:**
```json
{
  "quests": [
    { "title": "5分間の深呼吸", "description": "..." },
    { "title": "10分間の散歩", "description": "..." },
    ...
  ],
  "mascot": {
    "status": "Okay",
    "message": "今日は少しゆっくりいこう！"
  }
}
```

**内部動作:**
- `users_condition`テーブルから最新のconditionを取得
- OpenAI APIで5件のクエストとマスコット状態を生成
- `quests`テーブルに保存（既存の当日分は削除）
- `mascots`テーブルに保存（既存があれば更新）

### 3. 当日分クエスト取得

```bash
GET /api/quests/get
Headers: X-User-UUID: <uuid>
```

**レスポンス:**
```json
[
  {
    "id": 1,
    "uuid": "550e8400-e29b-41d4-a716-446655440000",
    "title": "5分間の深呼吸",
    "description": "朝の気分が少し重そうなので、リラックスのための深呼吸をおすすめします。",
    "completed": false,
    "day": "2026-01-29"
  },
  ...
]
```

### 4. クエスト完了/取り消し

```bash
POST /api/quests/1/complete
Headers: X-User-UUID: <uuid>
```

**レスポンス:**
```json
{
  "id": 1,
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "title": "5分間の深呼吸",
  "description": "朝の気分が少し重そうなので、リラックスのための深呼吸をおすすめします。",
  "completed": true,
  "day": "2026-01-29"
}
```

### 5. 夜アンケート送信

```bash
POST /api/questionnaire/night
Headers: X-User-UUID: <uuid>
Body: {
  "mood": "モヤモヤ",
  "condition": "だるい",
  "free_text": ""
}
```

**レスポンス:**
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "morning_mood": "普通",
  "morning_condition": "軽い",
  "morning_note": "",
  "night_mood": "モヤモヤ",
  "night_condition": "だるい",
  "night_note": "",
  "created_at": "2026-01-29T02:00:00.000Z",
  "updated_at": "2026-01-29T14:00:00.000Z"
}
```

---

## データベーススキーマ

### users_condition テーブル

| カラム名 | 型 | 説明 |
|---------|-----|------|
| `uuid` | text | Supabaseの`public.users`テーブルの`uuid`（主キー） |
| `morning_mood` | text | 朝の気分（`"絶好調"`, `"普通"`, `"モヤモヤ"`, `"つらい"`のいずれか） |
| `morning_condition` | text | 朝の体調（`"軽い"`, `"ふつう"`, `"だるい"`のいずれか） |
| `morning_note` | text | 朝の自由入力テキスト（最大1000文字） |
| `night_mood` | text | 夜の気分（`"絶好調"`, `"普通"`, `"モヤモヤ"`, `"つらい"`のいずれか） |
| `night_condition` | text | 夜の体調（`"軽い"`, `"ふつう"`, `"だるい"`のいずれか） |
| `night_note` | text | 夜の自由入力テキスト（最大1000文字） |
| `created_at` | timestamp | レコード作成日時 |
| `updated_at` | timestamp | レコード更新日時 |

### quests テーブル

| カラム名 | 型 | 説明 |
|---------|-----|------|
| `id` | integer | クエストID（主キー） |
| `uuid` | text | Supabaseの`public.users`テーブルの`uuid` |
| `title` | text | クエストのタイトル |
| `description` | text | クエストの説明 |
| `completed` | boolean | 完了フラグ（`true`: 完了、`false`: 未完了） |
| `day` | text | 日付（ISO 8601形式: `"2026-01-29"`） |
| `created_at` | timestamp | レコード作成日時 |
| `updated_at` | timestamp | レコード更新日時 |

### mascots テーブル

| カラム名 | 型 | 説明 |
|---------|-----|------|
| `uuid` | text | Supabaseの`public.users`テーブルの`uuid`（主キー） |
| `status` | text | マスコット状態（`Sad` / `Bad` / `Okay` / `Good` / `Great`） |
| `message` | text | マスコットからのメッセージ |
| `personality_tags` | text[] | 性格タグ（最大5個） |
| `personality_note` | text | 性格に関する自由入力 |
| `image_urls` | jsonb | 表情ごとの画像URL |

---

## 環境変数

| 変数名 | 説明 |
|--------|------|
| `OPENAI_API_KEY` | OpenAI APIキー |
| `SUPABASE_URL` | Supabase プロジェクトURL |
| `SUPABASE_KEY` | Supabase APIキー（anon） |
| `SUPABASE_SERVICE_KEY` | Supabase service roleキー（サーバー専用） |
| `GOOGLE_GENAI_API_KEY` | Gemini 画像生成APIキー |
| `MASCOT_REFERENCE_BUCKET` | 参照画像バケット名（例: `mascot-references`） |
| `MASCOT_REFERENCE_PREFIX` | 参照画像フォルダー（例: `references`、未指定ならバケット直下） |
| `MASCOT_REFERENCE_PATHS` | 参照画像のパス（カンマ区切り、指定時はこの順で使用） |
| `MASCOT_IMAGES_BUCKET` | 生成画像バケット名（例: `mascot-images`） |

---

## エラーハンドリング

### ステータスコード一覧

| ステータスコード | 説明 | 対象エンドポイント |
|----------------|------|--------------------|
| `200 OK` | リクエストが正常に処理されました | GET /api/quests/get, POST /api/quests/:quest_id/complete, POST /api/ai/recommendations/ |
| `201 Created` | リソースが正常に作成されました | POST /api/questionnaire/morning, POST /api/questionnaire/night |
| `400 Bad Request` | リクエストが不正です（UUIDヘッダー未設定、バリデーションエラーなど） | 全エンドポイント |
| `404 Not Found` | リソースが見つかりません | POST /api/quests/:quest_id/complete |
| `500 Internal Server Error` | サーバー内部エラー（Supabase接続エラーなど） | 全エンドポイント |

### エラーレスポンス例

**UUIDヘッダー未設定:**
```json
{
  "detail": "X-User-UUID ヘッダーが必要です。"
}
```

**バリデーションエラー:**
```json
{
  "mood": ["このフィールドは必須です。"],
  "condition": ["有効な選択肢ではありません。"]
}
```

**Supabase設定エラー:**
```json
{
  "detail": "Supabase設定エラー",
  "error": "SUPABASE_URL または SUPABASE_KEY が未設定です。"
}
```

**リソースが見つからない:**
```json
{
  "detail": "クエストが見つかりません。"
}
```

または

```json
{
  "error": "users_condition が見つかりません"
}
```

---

## 使用例

### cURL

#### 朝アンケート送信
```bash
curl -X POST http://localhost:8000/api/questionnaire/morning \
  -H "Content-Type: application/json" \
  -H "X-User-UUID: 550e8400-e29b-41d4-a716-446655440000" \
  -d '{
    "mood": "普通",
    "condition": "軽い",
    "free_text": ""
  }'
```

#### 夜アンケート送信
```bash
curl -X POST http://localhost:8000/api/questionnaire/night \
  -H "Content-Type: application/json" \
  -H "X-User-UUID: 550e8400-e29b-41d4-a716-446655440000" \
  -d '{
    "mood": "モヤモヤ",
    "condition": "だるい",
    "free_text": ""
  }'
```

#### AIレコメンデーション生成
```bash
curl -X POST http://localhost:8000/api/ai/recommendations/ \
  -H "X-User-UUID: 550e8400-e29b-41d4-a716-446655440000"
```

#### クエスト取得
```bash
curl -X GET http://localhost:8000/api/quests/get \
  -H "X-User-UUID: 550e8400-e29b-41d4-a716-446655440000"
```

#### クエスト完了
```bash
curl -X POST http://localhost:8000/api/quests/123/complete \
  -H "X-User-UUID: 550e8400-e29b-41d4-a716-446655440000"
```

### JavaScript / TypeScript (fetch API)

```typescript
const API_BASE_URL = "http://localhost:8000";
const USER_UUID = "550e8400-e29b-41d4-a716-446655440000";

// 朝アンケート送信
async function submitMorningQuestionnaire(
  mood: "絶好調" | "普通" | "モヤモヤ" | "つらい",
  condition: "軽い" | "ふつう" | "だるい",
  freeText: string = ""
) {
  const response = await fetch(`${API_BASE_URL}/api/questionnaire/morning`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-User-UUID": USER_UUID,
    },
    body: JSON.stringify({
      mood,
      condition,
      free_text: freeText,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "アンケート送信に失敗しました");
  }

  return await response.json();
}

// 夜アンケート送信
async function submitNightQuestionnaire(
  mood: "絶好調" | "普通" | "モヤモヤ" | "つらい",
  condition: "軽い" | "ふつう" | "だるい",
  freeText: string = ""
) {
  const response = await fetch(`${API_BASE_URL}/api/questionnaire/night`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-User-UUID": USER_UUID,
    },
    body: JSON.stringify({
      mood,
      condition,
      free_text: freeText,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "アンケート送信に失敗しました");
  }

  return await response.json();
}

// AIレコメンデーション生成
async function generateRecommendations() {
  const response = await fetch(`${API_BASE_URL}/api/ai/recommendations/`, {
    method: "POST",
    headers: {
      "X-User-UUID": USER_UUID,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "レコメンデーション生成に失敗しました");
  }

  return await response.json();
}

// 当日分クエスト取得
async function getTodayQuests() {
  const response = await fetch(`${API_BASE_URL}/api/quests/get`, {
    method: "GET",
    headers: {
      "X-User-UUID": USER_UUID,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "クエスト取得に失敗しました");
  }

  return await response.json();
}

// クエスト完了/取り消し
async function toggleQuestComplete(questId: number) {
  const response = await fetch(`${API_BASE_URL}/api/quests/${questId}/complete`, {
    method: "POST",
    headers: {
      "X-User-UUID": USER_UUID,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "クエスト完了に失敗しました");
  }

  return await response.json();
}

// 使用例: 完全なフロー
async function dailyFlow() {
  try {
    // 1. 朝アンケート送信
    const morningResult = await submitMorningQuestionnaire("普通", "軽い", "");
    console.log("朝アンケート送信成功:", morningResult);

    // 2. AIレコメンデーション生成
    const recommendations = await generateRecommendations();
    console.log("レコメンデーション:", recommendations);
    console.log("生成されたクエスト数:", recommendations.quests.length);
    console.log("マスコット状態:", recommendations.mascot.status);

    // 3. 当日分クエスト取得
    const quests = await getTodayQuests();
    console.log("当日のクエスト:", quests);
    console.log(`${quests.length}件のクエストがあります`);

    // 4. 最初のクエストを完了
    if (quests.length > 0) {
      const updatedQuest = await toggleQuestComplete(quests[0].id);
      console.log("クエスト完了:", updatedQuest);
    }

    // 5. 夜アンケート送信（例）
    // const nightResult = await submitNightQuestionnaire("モヤモヤ", "だるい", "");
    // console.log("夜アンケート送信成功:", nightResult);
  } catch (error) {
    console.error("エラー:", error);
  }
}
```

### React Native

```typescript
import { useEffect, useState } from "react";

interface Quest {
  id: number;
  uuid: string;
  title: string;
  description: string;
  completed: boolean;
  day: string;
  created_at: string;
  updated_at: string;
}

const API_BASE_URL = "http://localhost:8000";

// クエスト取得フック
function useQuests(userUuid: string) {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchQuests() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/quests/get`, {
          method: "GET",
          headers: {
            "X-User-UUID": userUuid,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || "クエスト取得に失敗しました");
        }

        const data = await response.json();
        setQuests(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "不明なエラー");
      } finally {
        setLoading(false);
      }
    }

    fetchQuests();
  }, [userUuid]);

  return { quests, loading, error };
}

// クエスト完了トグル関数
async function toggleQuestComplete(userUuid: string, questId: number): Promise<Quest> {
  const response = await fetch(`${API_BASE_URL}/api/quests/${questId}/complete`, {
    method: "POST",
    headers: {
      "X-User-UUID": userUuid,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "クエスト完了に失敗しました");
  }

  return await response.json();
}

// コンポーネントでの使用例
function QuestList({ userUuid }: { userUuid: string }) {
  const { quests, loading, error } = useQuests(userUuid);
  const [updating, setUpdating] = useState<number | null>(null);

  const handleToggleComplete = async (questId: number) => {
    try {
      setUpdating(questId);
      const updatedQuest = await toggleQuestComplete(userUuid, questId);
      
      // ローカルステートを更新
      setQuests(prevQuests =>
        prevQuests.map(q => q.id === questId ? updatedQuest : q)
      );
    } catch (err) {
      console.error("クエスト完了エラー:", err);
      alert(err instanceof Error ? err.message : "クエスト完了に失敗しました");
    } finally {
      setUpdating(null);
    }
  };

  if (loading) return <Text>読み込み中...</Text>;
  if (error) return <Text>エラー: {error}</Text>;
  if (quests.length === 0) return <Text>今日のクエストはありません</Text>;

  return (
    <View>
      {quests.map((quest) => (
        <TouchableOpacity
          key={quest.id}
          onPress={() => handleToggleComplete(quest.id)}
          disabled={updating === quest.id}
        >
          <Text>{quest.title}</Text>
          <Text>{quest.description}</Text>
          <Text>完了: {quest.completed ? "✓" : "✗"}</Text>
          {updating === quest.id && <Text>更新中...</Text>}
        </TouchableOpacity>
      ))}
    </View>
  );
}
```

---

## 注意事項

1. **認証**: 現在は認証不要（`AllowAny`）ですが、`X-User-UUID`ヘッダーは必須です
2. **日付判定**: `date.today().isoformat()`で当日分を判定（`"2026-01-29"`形式）
3. **Supabase設定**: `SUPABASE_URL`と`SUPABASE_KEY`の環境変数が設定されている必要があります
4. **AI生成が前提**: `/api/ai/recommendations/`でクエストが生成される前提です
5. **クエスト数**: AIは5件のクエストを生成しますが、取得時は0件以上の任意の件数が返される可能性があります
6. **完了トグル**: `/api/quests/:quest_id/complete`で`completed`フラグを反転できます
7. **セキュリティ**: UUIDで他ユーザーのクエストへのアクセスを防止しています
8. **データ更新**: 同じ日の既存レコードは削除してから新規作成されます（最新1件のみ保持）

---

## 関連ファイル

### quests アプリ
- `backend/apps/quests/views.py`: APIビューの実装
- `backend/apps/quests/supabase_client.py`: Supabaseクライアントの初期化
- `backend/apps/quests/urls.py`: URLルーティング設定

### ai アプリ
- `backend/apps/ai/views.py`: AIレコメンデーションAPIの実装
- `backend/apps/ai/supabase_client.py`: Supabaseクライアントの初期化

### questionnaires アプリ
- `backend/apps/questionnaires/views.py`: アンケートAPIの実装
- `backend/apps/questionnaires/serializers.py`: リクエスト/レスポンスのシリアライザー
- `backend/apps/questionnaires/supabase_client.py`: Supabaseクライアントの初期化
- `backend/apps/questionnaires/urls.py`: URLルーティング設定
