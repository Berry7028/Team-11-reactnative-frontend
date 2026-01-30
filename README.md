
# Team 11 Frontend (React Native)

> **重要: エージェントを使用する際は、まず [docs/skills.md](docs/skills.md) を読み込み、スキルを導入してください。**

ユーザーのメンタルヘルスをサポートするモバイルアプリです。朝・夜の気分記録、AIによるクエスト提案、すれ違い（StreetPass）機能を提供します。

## 主な機能

- 朝夜アンケートによる気分・体調の記録
- AIレコメンデーションによるクエスト生成
- クエストの取得・完了管理
- 位置情報を利用した「すれ違い」ログ表示

## 技術スタック

- Expo + Expo Router
- React Native / TypeScript
- Supabase（認証・データ保存）
- OpenAI API（クエスト生成）
- expo-location / expo-task-manager（バックグラウンド位置更新）
- expo-notifications（通知）

## セットアップ

1. 依存関係をインストール

   ```bash
   npm install
   ```

2. 環境変数を準備

   ```bash
   cp .env.example .env
   ```

   `.env` を開き、以下を設定してください。

   - `EXPO_PUBLIC_SUPABASE_URL`
   - `EXPO_PUBLIC_SUPABASE_KEY`
   - `EXPO_PUBLIC_SUPABASE_ANON_KEY`
   - `EXPO_PUBLIC_API_URL`

3. アプリを起動

   ```bash
   npm run start
   ```

## スクリプト

- `npm run start`: Expo 開発サーバー起動
- `npm run android`: Android エミュレーターで起動
- `npm run ios`: iOS シミュレーターで起動
- `npm run web`: Web で起動
- `npm run lint`: ESLint 実行

## ドキュメント

- `docs/API.md`: API 仕様とフロー（朝夜アンケート / AI / クエスト）
- `docs/streetpass.md`: すれ違い機能の設計とデータフロー
- `docs/AGENTS.md`: リポジトリガイドライン

## ディレクトリ構成（抜粋）

```
app/           # Expo Router 画面とレイアウト
components/    # 再利用可能なUI
hooks/         # 共通フック
lib/           # API / Supabase / 位置情報サービス
assets/        # 画像などの静的アセット
```

## 補足

- 位置情報の権限設定は `app.json` に定義しています（iOS/Androidともにバックグラウンド対応）。
- すれ違い機能は夜アンケート完了後にログ画面で閲覧できます。
