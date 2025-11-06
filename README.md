# フロントエンド環境構築手順

## 前提条件

- **Node.js**: v22.x
- **npm**: v10.x以上
- **nvm** (Node Version Manager) の導入を推奨

## 環境セットアップ

### 1. nvmのインストール (未インストールの場合)

```bash
# macOS/Linux
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# arch linux pacman
sudo pacman -S nvm
# 必要があれば以下のコマンドで現在のターミナルに適用
source /usr/share/nvm/init-nvm.sh

# インストール後、ターミナルを再起動
```

### 2. Node.jsバージョンの統一

プロジェクトでは `.nvmrc` でNode.jsバージョンを管理しています。

```bash
# プロジェクトディレクトリで実行
nvm install  # .nvmrcに記載されたバージョンをインストール

# ~/.npmrcにprefixが設定されている場合（Omarchyなど）
nvm use --delete-prefix

# prefix設定がない場合
nvm use
```

### 3. バージョン確認

以下のコマンドで正しいバージョンが使用されているか確認。

```bash
node -v   # v22.x.x と表示されることを確認
npm -v    # v10.x.x と表示されることを確認
```

## 導入手順

```bash
npm install
npm run dev
```

## 注意事項

- **チーム開発**: 必ず `.nvmrc` で指定されたNode.jsバージョンを使用してください
- **バージョン違い**: 異なるバージョンを使うと `package-lock.json` に大量の差分が発生します
- **Omarchyユーザー**: `~/.npmrc`に`prefix`設定がある場合は `nvm use --delete-prefix` を使用してください
- **初回セットアップ後**: プロジェクトディレクトリで作業する前に必ず `nvm use --delete-prefix` を実行してください

## トラブルシューティング

### nvmエラー: "Your user's .npmrc file has a `prefix` setting"

Omarchyなどで`~/.npmrc`に`prefix`が設定されている場合、以下を実行：

```bash
nvm use --delete-prefix
```

または、自動切り替えを設定（`~/.zshrc`または`~/.bashrc`に追加）：

```bash
# .nvmrcがあるディレクトリでは自動的にNode.jsバージョンを切り替え
autoload -U add-zsh-hook
load-nvmrc() {
  if [[ -f .nvmrc ]]; then
    nvm use --delete-prefix 2>/dev/null || nvm use
  fi
}
add-zsh-hook chpwd load-nvmrc
load-nvmrc  # 現在のディレクトリでも実行
```
