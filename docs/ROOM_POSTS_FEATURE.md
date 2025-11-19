# 部屋投稿機能 - フロントエンド実装計画

## 概要

バックエンドで実装された部屋投稿機能（P1-P4）のフロントエンド実装計画。

**実装済みバックエンドAPI**
- P1: POST `/api/v1/room-posts` - 部屋投稿作成（写真＋説明）
- P2: GET `/api/v1/room-posts` - 投稿一覧（カーソルベースページネーション）
- P3: GET `/api/v1/room-posts/{roomPostId}` - 投稿詳細
- P4: DELETE `/api/v1/room-posts/{roomPostId}` - 自分の投稿削除

## API型定義の生成

### 1. Orvalによる型定義生成 ✅ 完了

バックエンドのOpenAPI仕様からTypeScript型定義とReact Queryフックを自動生成済み。

**生成されたファイル**
- `src/api/generated/room-post.ts` - React QueryフックとAPI関数
- `src/api/generated/openAPIDefinition.schemas.ts` - TypeScript型定義

**生成された関数とフック**

**API関数**
- `getRoomPosts(params?: GetRoomPostsParams)` - 投稿一覧取得
- `createRoomPost(createRoomPostRequest: CreateRoomPostRequest)` - 投稿作成（multipart/form-data）
- `getRoomPostDetail(roomPostId: string)` - 投稿詳細取得
- `deleteRoomPost(roomPostId: string)` - 投稿削除

**React Queryフック**
- `useGetRoomPosts(params?: GetRoomPostsParams)` - 投稿一覧取得
- `useCreateRoomPost()` - 投稿作成
- `useGetRoomPostDetail(roomPostId: string)` - 投稿詳細取得
- `useDeleteRoomPost()` - 投稿削除

**型定義**
- `CreateRoomPostRequest` - 投稿作成リクエスト（image: Blob, title: string, description?: string）
- `RoomPostResponse` - 投稿レスポンス
- `RoomPostListItemResponse` - 一覧アイテム（userNickname, userAvatarUrl含む）
- `RoomPostListResponse` - 一覧レスポンス（items, nextCursor, hasMore）
- `RoomPostDetailResponse` - 詳細レスポンス（ユーザー情報含む）
- `GetRoomPostsParams` - 一覧取得パラメータ（cursor?, limit?）

## ページ構成

### 1. 投稿一覧ページ (`/room-posts`)

**責務**
- 投稿一覧の表示（Twitter/Xスタイルのタイムライン形式）
- 無限スクロールによるページネーション
- FABボタンによる投稿作成ページへの遷移（認証済みユーザーのみ）

**UIデザイン方針（Twitter/Xスタイル）**
- **レイアウト**: 縦スクロールのタイムライン形式（1列表示、全画面サイズで統一）
- **配置**: 中央配置（最大幅を設定してコンテンツを中央に配置）
- **投稿カード**: 各投稿は縦に並ぶカード形式
  - 投稿者情報（アバター、ニックネーム）を上部に表示
  - 投稿日時を表示
  - 画像は投稿内に表示（アスペクト比を維持、Twitter風の自由な比率）
  - タイトルと説明文を表示
- **スクロール**: 画面下部に到達すると自動的に次のページを読み込む（無限スクロール）
- **固定要素**: 投稿作成ボタンは画面右下に固定（FAB: Floating Action Button）
  - FABクリックで `/room-posts/new` へ遷移

**UIコンポーネント**
- `shadcn/ui` の `Card` コンポーネントで各投稿を表示
- `shadcn/ui` の `Avatar` で投稿者アバター表示
- `shadcn/ui` の `Button` で投稿作成ボタン（FAB）
- 画像は `aspect-ratio` で自由な比率を維持

**実装ファイル**
- `src/pages/RoomPostsPage.tsx` - メインページコンポーネント
- `src/components/room-posts/RoomPostCard.tsx` - 個別投稿カードコンポーネント（画像表示ロジックを含む）
- `src/components/room-posts/CreatePostFAB.tsx` - 投稿作成FABボタン

**機能詳細**
- カーソルベースページネーション実装（`useInfiniteQuery`を使用）
- 無限スクロール実装（Intersection Observerで画面下部検知）
- 画像の遅延読み込み（Intersection Observer）
- エラーハンドリングとリトライ機能
- ローディング状態の表示（各投稿カードの下にスケルトン表示）
- スクロール位置の保持（オプション）

### 2. 投稿詳細ページ (`/room-posts/:roomPostId`)

**責務**
- 単一投稿の詳細表示
- 投稿者のプロフィール情報表示
- 自分の投稿の場合、削除ボタンを表示

**UIコンポーネント**
- `shadcn/ui` の `Card` で投稿情報を表示
- `shadcn/ui` の `Avatar` で投稿者アバター表示
- `shadcn/ui` の `Button` で削除ボタン
- `shadcn/ui` の `Dialog` で削除確認モーダル

**実装ファイル**
- `src/pages/RoomPostDetailPage.tsx` - 詳細ページコンポーネント
- `src/components/room-posts/RoomPostDetail.tsx` - 投稿詳細表示コンポーネント
- `src/components/room-posts/DeleteRoomPostDialog.tsx` - 削除確認ダイアログ

**機能詳細**
- 404エラーハンドリング（投稿が見つからない場合）
- 削除後のリダイレクト処理（投稿一覧ページへ）

### 3. 投稿作成ページ (`/room-posts/new`)

**責務**
- 画像アップロード（ドラッグ&ドロップ対応）
- タイトル入力（最大100文字）
- 説明文入力（最大1000文字、任意）
- フォームバリデーション
- 投稿送信

**UIデザイン方針**
- **独立ページ形式**（モーダルではなく専用ページ）
- 中央配置のフォームレイアウト
- 画像プレビューとフォームを縦に配置（モバイル）または横並び（デスクトップ）
- 「キャンセル」ボタンで一覧ページへ戻る
- 投稿成功後は作成した投稿の詳細ページへリダイレクト

**UIコンポーネント**
- `shadcn/ui` の `Card` でフォームを囲む
- `shadcn/ui` の `Input` でタイトル入力
- `shadcn/ui` の `Textarea` で説明文入力
- `shadcn/ui` の `Button` で送信・キャンセルボタン
- 画像プレビュー機能

**実装ファイル**
- `src/pages/CreateRoomPostPage.tsx` - 投稿作成ページ
- `src/components/room-posts/RoomPostForm.tsx` - 投稿フォームコンポーネント
- `src/components/room-posts/ImageUpload.tsx` - 画像アップロードコンポーネント

**機能詳細**
- 画像ファイル形式チェック（JPEG/PNG）
- ファイルサイズチェック（最大5MB）
- 画像プレビュー表示
- フォームバリデーション（クライアント側）
- 送信中のローディング状態
- 成功時は作成した投稿の詳細ページへリダイレクト

**ページ形式を採用する理由**
- **フォーカス**: 投稿作成に集中できる環境
- **URL共有**: 投稿作成ページのURLを共有可能（将来の拡張性）
- **ブラウザ履歴**: ブラウザの戻るボタンで一覧に戻れる
- **実装の簡潔性**: モーダルの開閉状態管理が不要
- **モバイル対応**: モバイルでも画面全体を使えるため操作しやすい

## コンポーネント設計

### 1. RoomPostCard コンポーネント

**責務**
- 投稿カードの表示（Twitter/Xスタイル）
- クリックで詳細ページへ遷移

**レイアウト構造（Twitter/Xスタイル）**
- **上部**: 投稿者情報（アバター + ニックネーム + 投稿日時）
- **中央**: 投稿画像（アスペクト比を維持、自由な比率）
- **下部**: タイトルと説明文
- **全体**: カード形式で縦に並ぶ

**Props**
- `post`: `RoomPostListItemResponse` 型（生成された型定義を使用）
- `RoomPostListItemResponse` には `userNickname`, `userAvatarUrl` が含まれるため、投稿者情報も表示可能

**デザイン詳細**
- カード全体にホバー効果（カーソルポインター、軽い影の変化）
- 投稿画像はクリック可能（詳細ページへ遷移）
- 投稿者情報はクリック可能（将来: 投稿者のプロフィールページへ遷移）
- 投稿日時は相対時間表示（例: "2時間前"、"3日前"）
- 画像表示ロジックは`RoomPostCard`コンポーネント内に含める（分離しない）

### 2. RoomPostForm コンポーネント

**責務**
- 投稿作成フォームの表示とバリデーション
- 画像、タイトル、説明文の入力管理

**Props**
- `onSubmit`: `CreateRoomPostRequest` 型のデータを受け取るコールバック関数
- `onCancel`: キャンセル時のコールバック関数（オプション）
- `isLoading`: ローディング状態（オプション）

**注意事項**
- `CreateRoomPostRequest.image` は `Blob` 型だが、実際には `File` オブジェクトを渡す（FileはBlobのサブクラス）

### 3. ImageUpload コンポーネント

**責務**
- 画像ファイルの選択（ファイル選択ダイアログ）
- ドラッグ&ドロップ対応
- 画像プレビュー表示
- バリデーション（形式、サイズ）

**Props**
- `onImageSelect`: 画像ファイル選択時のコールバック関数
- `maxSize`: 最大ファイルサイズ（バイト単位、デフォルト5MB）
- `acceptedFormats`: 受け付ける画像形式の配列（デフォルト: JPEG, PNG）

### 4. DeleteRoomPostDialog コンポーネント

**責務**
- 投稿削除の確認ダイアログ表示
- 削除実行

**Props**
- `open`: ダイアログの表示状態
- `onOpenChange`: ダイアログの表示状態変更コールバック
- `postId`: 削除対象の投稿ID
- `onDeleteSuccess`: 削除成功時のコールバック（オプション）

## ルーティング

**追加するルート**
- `/room-posts` → `RoomPostsPage`（認証不要）
- `/room-posts/new` → `CreateRoomPostPage`（`ProtectedRoute`で保護、認証必須）
- `/room-posts/:roomPostId` → `RoomPostDetailPage`（認証不要）

**注意事項**
- URLパスは `/room-posts` を使用（バックエンドのエンドポイントに合わせる）
- パラメータ名は `roomPostId` を使用（`useGetRoomPostDetail` の引数名に合わせる）
- 投稿一覧ページは認証不要（公開）
- 投稿作成ページは認証必須（`ProtectedRoute`で保護）

## 画面遷移設計

### ナビゲーションフロー図

```
┌─────────────────┐
│   Header        │
│  (全ページ共通)  │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌─────────┐ ┌─────────────┐
│ ロゴ    │ │ ナビゲーション│
│ (/)     │ │ リンク       │
└─────────┘ └─────────────┘
```

### 各画面からの遷移

#### 1. 投稿一覧ページ (`/room-posts`)

**アクセス方法**
- Headerのロゴクリック → `/room-posts`（デフォルトページ）
- Headerの「投稿一覧」リンク → `/room-posts`
- 直接URL入力 → `/room-posts`
- `/` → `/room-posts`（リダイレクト）

**このページから遷移できる画面**
- 各投稿カードクリック → `/room-posts/:roomPostId`（投稿詳細ページ）
- 「＋」FABボタン（認証済みユーザーのみ） → `/room-posts/new`（投稿作成ページ）
- Headerの「プロフィール」リンク → `/profile`

**実装コンポーネント**
- `RoomPostCard` - クリックで詳細ページへ遷移（`Link`を使用）
- `CreatePostFAB` - FABボタンで`/room-posts/new`へ遷移（認証済みユーザーのみ表示）

#### 2. 投稿詳細ページ (`/room-posts/:roomPostId`)

**アクセス方法**
- 投稿一覧ページの投稿カードクリック → `/room-posts/:roomPostId`
- 直接URL入力 → `/room-posts/:roomPostId`
- 投稿作成成功後のリダイレクト → `/room-posts/:roomPostId`（作成した投稿の詳細）

**このページから遷移できる画面**
- 「戻る」ボタン → `/room-posts`（投稿一覧ページ）
- 投稿者のアバター/ニックネームクリック → `/users/:userId`（投稿者のプロフィールページ、将来実装）
- 「削除」ボタン（自分の投稿のみ） → 削除後、`/room-posts`（投稿一覧ページ）へリダイレクト
- Headerの「投稿一覧」リンク → `/room-posts`
- Headerの「プロフィール」リンク → `/profile`

**実装コンポーネント**
- 「戻る」ボタン - `useNavigate`で`/room-posts`へ
- 削除成功後 - `useNavigate`で`/room-posts`へリダイレクト

#### 3. 投稿作成ページ (`/room-posts/new`)

**アクセス方法**
- 投稿一覧ページのFABボタン（画面右下、認証済みユーザーのみ） → `/room-posts/new`
- Headerの「新規投稿」リンク（認証済みユーザーのみ） → `/room-posts/new`
- 直接URL入力 → 認証チェック後、認証済みなら表示（`ProtectedRoute`で保護）

**このページから遷移できる画面**
- 「キャンセル」ボタン → `/room-posts`（投稿一覧ページ）
- ブラウザの戻るボタン → `/room-posts`（投稿一覧ページ）
- 投稿成功後 → `/room-posts/:roomPostId`（作成した投稿の詳細ページへリダイレクト）
- 投稿失敗時 → 同じページに留まり、エラーメッセージ表示
- Headerの「投稿一覧」リンク → `/room-posts`
- Headerの「プロフィール」リンク → `/profile`

**実装コンポーネント**
- 「キャンセル」ボタン - `useNavigate`で`/room-posts`へ
- 投稿成功後 - `useNavigate`で作成した投稿の詳細ページへ（`data.id`を使用）
- ブラウザの戻るボタンは標準動作で対応

#### 4. Headerコンポーネント

**現在の実装**
- ロゴリンク → `/`（現在は`/login`へリダイレクト）
- ログイン/新規登録リンク（認証前）

**追加するナビゲーション**

**認証済みユーザー向け**
- 「投稿一覧」リンク → `/room-posts`
- 「新規投稿」リンク → `/room-posts/new`
- 「プロフィール」リンク → `/profile`
- 「ログアウト」ボタン → `/login`（ログアウト処理後）

**認証前ユーザー向け**
- 「投稿一覧」リンク → `/room-posts`（認証不要なので表示可能）
- ログイン/新規登録リンク（既存）

**実装方針**
- 認証状態に応じてナビゲーションリンクを条件分岐で表示
- 認証済み: 投稿一覧、新規投稿、プロフィール、ログアウト
- 認証前: 投稿一覧、ログイン、新規登録
- 投稿一覧ページにはFABボタンも表示（認証済みユーザーのみ）

### 遷移パターン一覧

| 遷移元 | 遷移先 | 遷移方法 | 認証要件 |
|--------|--------|----------|----------|
| Header（ロゴ） | `/room-posts` | `Link` | なし |
| Header（投稿一覧） | `/room-posts` | `Link` | なし |
| Header（新規投稿） | `/room-posts/new` | `Link` | 要認証 |
| Header（プロフィール） | `/profile` | `Link` | 要認証 |
| 投稿一覧ページ | `/room-posts/:roomPostId` | `Link`（カードクリック） | なし |
| 投稿一覧ページ | `/room-posts/new` | `Link`（FABボタンクリック） | 要認証 |
| 投稿詳細ページ | `/room-posts` | `navigate`（戻るボタン） | なし |
| 投稿詳細ページ | `/room-posts` | `navigate`（削除成功後） | 要認証 |
| 投稿作成ページ | `/room-posts` | `navigate`（キャンセル） | 要認証 |
| 投稿作成ページ | `/room-posts/:roomPostId` | `navigate`（投稿成功後） | 要認証 |

### 実装コンポーネント

#### 1. Headerコンポーネントの更新

**責務**
- 認証状態に応じたナビゲーションリンクの表示
- ログアウト機能

**実装ファイル**
- `src/components/layout/Header.tsx` - 既存ファイルを更新

**追加する機能**
- 認証状態の取得（`useAuth`フック）
- 投稿一覧、新規投稿、プロフィールへのリンク
- ログアウトボタン
- 認証状態に応じたナビゲーション表示の切り替え

#### 2. RoomPostCardコンポーネント

**責務**
- 投稿カードの表示
- クリックで詳細ページへ遷移

**実装方針**
- `react-router-dom`の`Link`コンポーネントを使用して`/room-posts/:roomPostId`へ遷移

#### 3. 各ページのナビゲーションボタン

**投稿詳細ページ**
- 「戻る」ボタン - `useNavigate`で`/room-posts`へ
- 削除成功後 - `useNavigate`で`/room-posts`へ

**投稿作成ページ**
- 「キャンセル」ボタン - `useNavigate`で`/room-posts`へ
- 投稿成功後 - `useNavigate`で`/room-posts/${createdPost.id}`へ

### デフォルトページの変更

現在、`/`は`/login`へリダイレクトしていますが、部屋投稿機能追加後は以下のように変更：

**実装方針**
- `/` → `/room-posts` へリダイレクト（投稿一覧をデフォルトに）
- 認証不要で閲覧可能なため、ユーザー体験が良い

## 状態管理

### React Query の使用

- `useGetRoomPosts` - 投稿一覧取得（カーソルベースページネーション）
- `useGetRoomPostDetail` - 投稿詳細取得
- `useCreateRoomPost` - 投稿作成（成功時に一覧を再取得）
- `useDeleteRoomPost` - 投稿削除（成功時に一覧を再取得またはリダイレクト）

### カーソルベースページネーション実装（Twitter/Xスタイル）

**実装方法: useInfiniteQueryを使用（推奨）**
- React Queryの`useInfiniteQuery`を使用
- `getRoomPosts`関数と`getGetRoomPostsQueryKey`を使用
- `getNextPageParam`で`nextCursor`を次のページパラメータとして使用

**無限スクロール実装**
- Intersection Observer APIを使用して画面下部の検知要素を監視
- 検知要素が画面に入ったら`fetchNextPage`を実行
- ローディング中はスケルトンまたはローディングインジケーターを表示
- すべてのページを読み込んだら検知要素を非表示

**レスポンス構造**
- `data.pages` - 各ページのデータ配列
- `data.pages[].items` - そのページの投稿一覧
- `data.pages[].nextCursor` - 次のページのカーソル（undefinedの場合は最後のページ）
- `data.pages[].hasMore` - 次のページが存在するか

**実装のポイント**
- パフォーマンス最適化（仮想スクロールは不要、通常のスクロールで十分）
- エラー時のリトライ機能

## バリデーション

### 推奨ライブラリ

**react-hook-form + zod の使用を推奨**

フォーム管理とバリデーションを効率的に行うため、以下のライブラリをインストールすることを推奨します：

```bash
npm install react-hook-form zod @hookform/resolvers
```

**理由**
- `react-hook-form`: パフォーマンスが高く、再レンダリングが少ない
- `zod`: TypeScriptと相性が良く、型安全なバリデーション
- `@hookform/resolvers`: react-hook-formとzodを統合

**既存コードとの比較**
- 現在の`ProfileEditPage`では手動バリデーションを使用
- 部屋投稿フォームは複雑なため、ライブラリの使用で保守性が向上

### クライアント側バリデーション

**画像**
- ファイル形式: JPEG, PNG のみ
- ファイルサイズ: 最大5MB
- 必須項目

**タイトル**
- 最大100文字
- 最小1文字（空文字不可）
- 必須項目

**説明文**
- 最大1000文字
- 任意項目

### Zodスキーマ定義

**スキーマ要件**
- `image`: File型、最大5MB、JPEG/PNG形式のみ
- `title`: 文字列、1-100文字、必須
- `description`: 文字列、最大1000文字、任意

**実装場所**
- `src/schemas/roomPostSchema.ts` - Zodスキーマ定義
- `src/components/room-posts/RoomPostForm.tsx` - react-hook-formを使用したフォームコンポーネント

**実装方針**
- `zodResolver`を使用してreact-hook-formと統合
- `useForm`フックでフォーム状態を管理
- バリデーションエラーは`formState.errors`から取得して表示

## エラーハンドリング

### APIエラーの処理

- 401: 未認証 → ログインページへリダイレクト
- 400: バリデーションエラー → エラーメッセージをフォームに表示
- 403: 権限エラー → エラーメッセージ表示
- 404: 投稿が見つからない → 404ページまたはエラーメッセージ
- 500: サーバーエラー → エラーメッセージ表示

**実装**
- `src/utils/errorHandler.ts` - エラーハンドリングユーティリティ
- React Queryの `onError` でグローバルエラーハンドリング

## UI/UX考慮事項

### 画像表示

- 画像の遅延読み込み（Intersection Observerでパフォーマンス向上）
- 画像読み込み中のプレースホルダー表示（スケルトンまたはぼかし効果）
- 画像エラー時のフォールバック表示
- 画像のアスペクト比を維持（Twitter/X風の自由な比率）
- 画像は投稿カード内に表示（カード幅に合わせて伸縮）

### レスポンシブデザイン

**投稿一覧ページ（Twitter/Xスタイル）**
- **全画面サイズで1列表示**（モバイル、タブレット、デスクトップ共通）
- 中央配置（最大幅を設定: `max-w-3xl`）
- 左右に適切なパディングを設定
- 投稿カードは画面幅に応じて伸縮

**投稿詳細ページ**
- 中央配置のカードレイアウト
- 最大幅を設定（`max-w-4xl`）

**投稿作成ページ**
- 中央配置のフォームレイアウト
- 最大幅を設定（`max-w-3xl`）
- モバイル・デスクトップ共に1列レイアウト（画像プレビューとフォームを縦に配置）

### レイアウトシステム

**投稿一覧ページ**
- **12グリッドシステムは不要**（1列表示のため）
- `max-w-*` と `mx-auto` で中央配置
- `flex flex-col` または `space-y-*` で縦並びレイアウト

**投稿詳細ページ**
- **12グリッドシステムは不使用**
- 中央配置のカードレイアウトのため、`max-w-*`で十分

**投稿作成ページ**
- **12グリッドシステムは不使用**
- 1列レイアウトのため、`max-w-*`で十分

### アクセシビリティ

- 画像に適切な `alt` 属性
- キーボードナビゲーション対応
- ARIA属性の適切な使用

## 必要なshadcn/uiコンポーネント

既存のコンポーネント:
- `card` ✅
- `button` ✅
- `dialog` ✅
- `input` ✅
- `textarea` ✅
- `label` ✅
- `avatar` ✅

追加で必要なコンポーネント:
- `alert` - エラーメッセージ表示用
- `skeleton` - ローディング状態表示用
- `badge` - 投稿者情報表示用

**インストールコマンド**
```bash
# shadcn/uiコンポーネント
npx shadcn@latest add alert
npx shadcn@latest add skeleton
npx shadcn@latest add badge

# バリデーションライブラリ
npm install react-hook-form zod @hookform/resolvers
```

## 実装順序

1. **API型定義生成** ✅ 完了
   - バックエンドサーバー起動確認
   - `npm run orval` で型定義生成
   - 生成された型定義の確認
   - `src/api/generated/room-post.ts` と `openAPIDefinition.schemas.ts` が生成済み

2. **基本コンポーネント作成**
   - `RoomPostCard` コンポーネント（`RoomPostListItemResponse` を使用、画像表示ロジックを含む）
   - `ImageUpload` コンポーネント
   - `CreatePostFAB` コンポーネント

3. **投稿一覧ページ**
   - `RoomPostsPage` コンポーネント
   - `useInfiniteQuery` でカーソルベースページネーション実装
   - 無限スクロール実装（Intersection Observer）
   - `CreatePostFAB` コンポーネント
   - エラーハンドリング

4. **投稿詳細ページ**
   - `RoomPostDetailPage` コンポーネント
   - `useGetRoomPostDetail(roomPostId)` でデータ取得
   - `DeleteRoomPostDialog` コンポーネント
   - `useDeleteRoomPost` で削除機能実装

5. **投稿作成機能**
   - `CreateRoomPostPage` コンポーネント
   - `RoomPostForm` コンポーネント
   - `react-hook-form` + `zod` でフォーム管理とバリデーション
   - `createRoomPostSchema` でZodスキーマ定義
   - `useCreateRoomPost` で投稿作成
   - `CreateRoomPostRequest` 型を使用
   - 画像アップロード機能

6. **ルーティング追加**
   - `AppRoutes.tsx` にルート追加（`/room-posts`, `/room-posts/new`, `/room-posts/:roomPostId`）
   - Headerコンポーネントの更新（ナビゲーションリンク追加）

7. **テストと調整**
   - 各機能の動作確認
   - エラーハンドリングの確認
   - レスポンシブデザインの確認
   - パフォーマンス最適化

## 技術的な考慮事項

### 画像アップロード

- `FormData` を使用して `multipart/form-data` で送信
- 画像プレビューは `URL.createObjectURL` を使用
- メモリリーク防止のため、`URL.revokeObjectURL` でクリーンアップ

### カーソルベースページネーション

- React Query の `useInfiniteQuery` を使用
- `getRoomPosts`関数と`getGetRoomPostsQueryKey`を使用
- `getNextPageParam`で`nextCursor`を次のページパラメータとして使用
- `nextCursor` が `undefined` の場合、次のページなしと判定
- `hasMore` フラグも確認可能
- 無限スクロール実装（Intersection Observer API）

**注意事項**
- `RoomPostListResponse.nextCursor` は `string | undefined` 型
- `RoomPostListResponse.hasMore` は `boolean` 型で、次のページの存在を示す

### パフォーマンス最適化

- 画像の遅延読み込み
- React Query のキャッシュ活用
- 不要な再レンダリングの防止（`React.memo` の使用を検討）

## 今後の拡張可能性

- いいね機能
- コメント機能（既にAPIエンドポイントあり）
- 評価機能（既にAPIエンドポイントあり）
- ハッシュタグ機能
- 投稿の編集機能
- 投稿の検索機能
- フィルタリング機能（投稿者、日付など）

