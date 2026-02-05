# koko - メンタル連動型フィットネスアプリ（フロントエンド）

**koko** は、マスコット「ココ」によるメンタル可視化・朝夜アンケート・クエスト・すれ違い機能を組み合わせ、  
「変わりたいけど、傷つきたくない」層の運動・メンタル継続を支えるモバイルアプリです。  
React Native（Expo）で開発し、Supabase をデータベース・認証に利用しています。

### プロジェクト体制

- **開発実装メンバー**: 3人
  - **Berry7028**: 要件定義・実装・デザイン・デバック・レビュー
  - **Kamon-Tahara-504**: 要件定義・実装・デバック・レビュー
  - **motokiyamaguchi1026-dev**: 主にバックエンドを担当

- **資料制作メンバー**: 3人
  - **tokio0429**: 要件定義・市場調査・企画背景・アプリ概要・
  - **iizuka**: 要件定義・ターゲット層
  - **com-lang**: 要件定義・ペルソナ作成



### プロジェクト工程

- **開発開始日**: 2025/1/28
- **開発完了日**: 2025/2/4

> **重要: エージェントを使用する際は、まず [docs/skills.md](docs/skills.md) を読み込み、スキルを導入してください。**

## 主要機能

- **マスコット「ココ」** … 気分・体調に応じて見た目が変化し、メンタル状態を可視化。性格・言葉遣いを設定可能。
- **朝・夜アンケート** … 気分・体調を記録。結果に応じてクエストの内容・強度が変わる。
- **クエスト** … メンタルヘルス系とトレーニング系。調子に合わせて AI が提案。
- **すれ違い** … 1日の終わりに、すれ違った仲間のクリア状況を確認し「お疲れ様」スタンプでリアクション可能。
- 結果や優劣ではなく「姿勢」を重視し、他ユーザーとの共存を前提にした設計。

## 技術スタック

- Expo + Expo Router / React Native / TypeScript
- Supabase(データベース・認証)
- OpenAI API(クエスト生成・バックエンド経由)
- expo-location / expo-task-manager(バックグラウンド位置更新)
- expo-notifications(通知)

## プロジェクト構造

```
Team-11-reactnative-frontend/
├── app/                          # Expo Router のルート。ファイルベースルーティング
│   ├── _layout.tsx               # ルートレイアウト（プロバイダー・フォント等）
│   ├── modal.tsx                 # モーダル画面
│   ├── (auth)/                   # 認証グループ（サインイン・サインアップ）
│   │   ├── _layout.tsx
│   │   ├── index.tsx             # 認証フロー入口
│   │   ├── signin.tsx
│   │   └── signup.tsx
│   │
│   ├── (onboarding)/             # オンボーディング（初回設定）
│   │   ├── _layout.tsx
│   │   └── personality.tsx       # 性格・嗜好設定
│   │
│   └── (tabs)/                   # タブナビゲーション（メインアプリ）
│       ├── _layout.tsx           # タブレイアウト
│       ├── index.tsx             # ホーム
│       ├── daily-mood.tsx        # 朝・夜の気分入力
│       ├── log.tsx               # すれ違いログ
│       ├── quests.tsx            # クエスト一覧・管理
│       └── settings.tsx          # 設定
│
├── components/                   # 再利用可能な UI コンポーネント
│   ├── app-header-title.tsx      # 共通ヘッダータイトル
│   ├── themed-text.tsx           # テーマ対応テキスト
│   ├── themed-view.tsx           # テーマ対応ビュー
│   ├── mood-input-section.tsx    # 気分入力セクション
│   ├── grass-background.tsx      # 草背景
│   ├── fireworks-effect.tsx      # 花火エフェクト
│   ├── parallax-scroll-view.tsx
│   ├── external-link.tsx
│   ├── hello-wave.tsx
│   ├── haptic-tab.tsx
│   │
│   ├── auth/                     # 認証画面用
│   │   ├── AuthPrimaryButton.tsx
│   │   ├── AuthScreenHeader.tsx
│   │   ├── FormField.tsx
│   │   ├── PasswordField.tsx
│   │   ├── styles.ts
│   │   └── index.ts
│   │
│   ├── daily-mood/               # 朝・夜気分画面用
│   │   ├── MorningMoodScreen.tsx
│   │   ├── NightMoodScreen.tsx
│   │   ├── CountdownCard.tsx
│   │   ├── IconBadge.tsx
│   │   ├── MoodPrimaryButton.tsx
│   │   └── ...
│   │
│   ├── home/                     # ホームタブ用
│   │   ├── mascot-section.tsx
│   │   └── quest-list-section.tsx
│   │
│   ├── log/                      # すれ違いログ用
│   │   ├── EncounterRow.tsx
│   │   ├── LogEmptyView.tsx
│   │   ├── LogLockedView.tsx
│   │   ├── SummaryCard.tsx
│   │   ├── styles.ts
│   │   └── index.ts
│   │
│   ├── mood-input/               # 気分スライダー等
│   │   ├── constants.ts
│   │   ├── selection-header.tsx
│   │   └── step-slider.tsx
│   │   
│   └── ui/                       # 汎用 UI 部品
│       ├── avatar-image.tsx
│       ├── collapsible.tsx
│       ├── icon-symbol.tsx
│       └── icon-symbol.ios.tsx
│
├── hooks/                        # 共通カスタムフック
│   ├── use-auth.ts               # 認証状態・ログイン/ログアウト
│   ├── use-color-scheme.ts       # ダーク/ライトモード
│   ├── use-color-scheme.web.ts
│   ├── use-theme-color.ts        # テーマ色取得
│   ├── use-location.ts           # 位置情報
│   └── use-night-questionnaire.ts # 夜アンケート状態
│
├── lib/                          # 外部連携・API・インフラ
│   ├── supabase.ts               # Supabase クライアント初期化
│   ├── location-service.ts       # 位置情報サービス（バックグラウンド等）
│   └── api/                      # バックエンド API クライアント
│       ├── client.ts             # 共通 HTTP クライアント
│       ├── index.ts               # エクスポート集約
│       ├── types.ts               # API 型定義
│       ├── user.ts                # ユーザー API
│       ├── questionnaire.ts     # アンケート API
│       ├── quests.ts              # クエスト API
│       ├── ai.ts                  # AI 関連 API
│       ├── location.ts            # 位置・ログ API
│       └── stamps.ts              # スタンプ API
│
├── providers/                    # アプリ全体のコンテキスト
│   ├── AuthProvider.tsx          # 認証状態プロバイダー
│   └── NotificationProvider.tsx  # 通知プロバイダー
│
├── constants/
│   └── theme.ts                  # テーマ（色・フォント等）
│
├── assets/                       # 静的アセット
│   ├── images/                   # アイコン・ファビコン・スプラッシュ等
│   └── mascot/                   # マスコット画像（bad, good, great, okay, sad）
│
├── docs/                         # 設計・API ドキュメント
│   ├── API.md                    # API 仕様とフロー
│   ├── streetpass.md             # すれ違い機能の設計
│   ├── AGENTS.md                 # リポジトリガイドライン
│   ├── skills.md                 # エージェント用スキル
│   ├── iPhone_build.md           # iOS ビルド手順
│   └── supabase-log_likes-rls-recipient.sql
│
├── scripts/
│   └── reset-project.js          # プロジェクトリセット用
│
├── app.json                      # Expo 設定（名前・権限・スプラッシュ等）
├── package.json
├── tsconfig.json
├── eslint.config.js
└── .env.example                  # 環境変数サンプル
```

### ディレクトリの役割

- **app/**  
  Expo Router のファイルベースルーティング。`(auth)` / `(onboarding)` / `(tabs)` はグループで、URL には含まれない。認証 → オンボーディング → タブの流れで画面が切り替わる。

- **components/**  
  機能別（auth, daily-mood, home, log, mood-input）と汎用（ui）に分かれた UI コンポーネント。画面は `app/` に置き、部品はここで共有。

- **hooks/**  
  認証・テーマ・位置情報・夜アンケートなど、画面間で使う状態・副作用のロジック。

- **lib/**  
  Supabase クライアント、位置情報サービス、バックエンド API 呼び出し（`lib/api/`）。アプリのインフラ層。

- **providers/**  
  `AuthProvider` と `NotificationProvider` で、ルートレイアウトからアプリ全体にコンテキストを提供。

- **constants/**  
  テーマやアプリ全体で使う定数。

- **assets/**  
  画像・マスコットなど、バンドルする静的ファイル。

- **docs/**  
  開発者向けの API 仕様・設計・ビルド手順・エージェント用ドキュメント。

## ドキュメント

- [docs/API.md](docs/API.md): API 仕様とフロー（朝夜アンケート / AI / クエスト）
- [docs/streetpass.md](docs/streetpass.md): すれ違い機能の設計とデータフロー
- [docs/AGENTS.md](docs/AGENTS.md): リポジトリガイドライン

