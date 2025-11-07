# フロントエンド環境構築手順 getting started

## 前提条件

- **Node.js**: v22.x
- **npm**: v10.x以上
- **direnv**: プロジェクトディレクトリに入ると自動的にNode.jsバージョンを切り替え
- **nvm** (Node Version Manager): Node.jsバージョン管理ツール

## 環境セットアップ

### direnvで自動切り替え

プロジェクトディレクトリに入るだけで自動的にNode.js v22に切り替わります。

#### 1. direnvのインストール（一度だけ）

```bash
# Arch Linux
sudo pacman -S direnv

# macOS
brew install direnv

# Ubuntu/Debian
sudo apt install direnv
```

#### 2. シェルに統合（一度だけ）

`~/.zshrc` または `~/.bashrc` に以下を手動で追加：

```bash
# zshの場合
eval "$(direnv hook zsh)"

# bashの場合
eval "$(direnv hook bash)"
```

設定後、ターミナルを再起動またはソースを再読み込み：

```bash
source ~/.zshrc  # または source ~/.bashrc
```

#### 3. nvmのインストール（未インストールの場合）

```bash
# Arch Linux
sudo pacman -S nvm
source /usr/share/nvm/init-nvm.sh  # 現在のターミナルに適用

# macOS/Linux
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

#### 4. プロジェクトのセットアップ

```bash
# プロジェクトディレクトリに移動
cd oby-frontend

# direnvを許可（初回のみ）
direnv allow

# 自動的にNode.js v22がインストール・切り替えされます
# "direnv: loading ~/dev/team/oby-frontend/.envrc" と表示されればOK
```

#### 5. バージョン確認

```bash
node -v   # v22.x.x と表示されることを確認
npm -v    # v10.x.x と表示されることを確認
```

#### 6. 環境立ち上げ

```bash
npm install
npm run dev
```

---

### ⚠️ 既存メンバーの移行手順

**以前に異なるNode.jsバージョンで`npm install`していた場合**は、クリーンアップが必要です：

```bash
# 1. クリーンアップ
rm -rf node_modules package-lock.json

# 2. direnvセットアップ（上記手順を参照）
direnv allow

# 3. バージョン確認
node -v  # v22.x.x になっていることを確認

# 4. 再インストール
npm install
```

**理由**: 異なるNode.jsバージョンで生成された`package-lock.json`は、そのバージョン固有の情報を含むため、再生成が必要です。

---

### 🔧 代替: 手動でバージョン切り替え

direnvを使わない場合は、毎回手動で切り替えが必要です。

```bash
# プロジェクトディレクトリで実行
nvm install  # .nvmrcに記載されたバージョンをインストール

# ~/.npmrcにprefixが設定されている場合（Omarchyなど）
nvm use --delete-prefix

# prefix設定がない場合
nvm use
```
