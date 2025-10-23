# フロントエンド開発環境

このプロジェクトは、Vite + React + TypeScript を使用したフロントエンドアプリケーションです。

## 環境構築手順

### 前提条件

- Node.js 18.0.0 以降
- npm または yarn、pnpm などのパッケージマネージャー

### 1. リポジトリのクローン

```bash
git clone <リポジトリのURL>
cd oby_app/oby-frontend
```

### 2. 依存パッケージのインストール

```bash
npm install
# または
yarn install
# または
pnpm install
```

### 3. 環境変数の設定

`.env` ファイルを作成し、必要な環境変数を設定します。

```env
VITE_API_BASE_URL=http://localhost:3000/api
# その他の環境変数...
```

### 4. 開発サーバーの起動

```bash
npm run dev
# または
yarn dev
# または
pnpm dev
```

開発サーバーが起動したら、ブラウザで [http://localhost:5173](http://localhost:5173) にアクセスしてください。

## 主なスクリプト

- `dev`: 開発サーバーを起動
- `build`: 本番用にビルド
- `preview`: ビルドしたアプリをプレビュー
- `test`: テストを実行
- `lint`: コードのリントを実行
- `type-check`: TypeScriptの型チェックを実行

## 技術スタック

- **フレームワーク**: [React](https://react.dev/)
- **言語**: [TypeScript](https://www.typescriptlang.org/)
- **ビルドツール**: [Vite](https://vitejs.dev/)
- **スタイリング**: [Tailwind CSS](https://tailwindcss.com/) または [CSS Modules](https://github.com/css-modules/css-modules)
- **状態管理**: [Jotai](https://jotai.org/) または [Zustand](https://zustand-demo.pmnd.rs/)
- **APIクライアント**: [TanStack Query](https://tanstack.com/query/latest) または [SWR](https://swr.vercel.app/ja)
- **フォーム管理**: [React Hook Form](https://react-hook-form.com/)
- **テスト**: [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/)

## ディレクトリ構成

```
src/
├── assets/          # 画像やフォントなどの静的ファイル
├── components/      # 共通コンポーネント
├── features/        # 機能ごとのコンポーネント
├── hooks/           # カスタムフック
├── lib/             # ユーティリティ関数
├── pages/           # ページコンポーネント
├── routes/          # ルーティング設定
├── services/        # APIクライアント
├── store/           # グローバルステート
├── styles/          # グローバルスタイル
└── types/           # 型定義
```

## 開発ガイドライン

- コンポーネントはAtomic Designに基づいて構成します
- TypeScriptの型定義を適切に使用します
- コンポーネントは可能な限り小さく、単一責任の原則に従います
- スタイリングにはCSS ModulesまたはTailwind CSSを使用します
- 状態管理は必要に応じて導入し、適切にスコープを限定します

## デプロイ

```bash
# 本番用ビルド
npm run build

# ビルド結果の確認
npm run preview
```

ビルドされたファイルは `dist` ディレクトリに出力されます。
