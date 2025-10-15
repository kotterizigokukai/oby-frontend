# Neovim開発環境セットアップ

このプロジェクトでNeovimを使用する際のセットアップガイドです。

## 必要なプラグイン

### LSP・フォーマッター関連
```lua
-- lazy.nvim の場合
{
  "neovim/nvim-lspconfig",
  dependencies = {
    "williamboman/mason.nvim",
    "williamboman/mason-lspconfig.nvim",
  }
}

-- フォーマッター (どちらか一つ)
{ "stevearc/conform.nvim" }  -- おすすめ
-- または
{ "jose-elias-alvarez/null-ls.nvim" }
```

### プロジェクト固有設定
```lua
-- プロジェクトごとの設定を読み込む (おすすめ)
{ "folke/neoconf.nvim" }
```

## セットアップ手順

### 1. exrcの有効化

`~/.config/nvim/init.lua` または `~/.config/nvim/lua/config/options.lua` に追加:

```lua
vim.o.exrc = true  -- プロジェクトローカルの設定ファイルを読み込む
vim.o.secure = true  -- セキュリティのため
```

### 2. LSPのインストール

Neovimを開いて:

```vim
:Mason
```

以下をインストール:
- `typescript-language-server` (tsserver)
- `eslint-lsp` または `vscode-eslint-language-server`
- `prettier`

### 3. conform.nvimの設定例

```lua
require("conform").setup({
  formatters_by_ft = {
    typescript = { "prettier" },
    typescriptreact = { "prettier" },
    javascript = { "prettier" },
    javascriptreact = { "prettier" },
    json = { "prettier" },
  },
  format_on_save = {
    timeout_ms = 500,
    lsp_fallback = true,
  },
})
```

### 4. neoconf.nvimの設定例

```lua
require("neoconf").setup({})

-- LSP設定の前に必ずneoconfをセットアップ
require("lspconfig").tsserver.setup({
  -- neoconfが.neoconf.jsonから自動的に設定を読み込みます
})

require("lspconfig").eslint.setup({
  on_attach = function(client, bufnr)
    -- 保存時にESLint自動修正
    vim.api.nvim_create_autocmd("BufWritePre", {
      buffer = bufnr,
      command = "EslintFixAll",
    })
  end,
})
```

### 5. プロジェクトディレクトリで開く

```bash
cd /path/to/oby-frontend
nvim .
```

初回起動時に「.nvim.luaを読み込みますか?」と聞かれるので、`y`を入力してください。

## 便利なキーマップ例

```lua
-- フォーマット
vim.keymap.set("n", "<leader>f", function()
  require("conform").format({ async = true, lsp_fallback = true })
end, { desc = "Format buffer" })

-- ESLint修正
vim.keymap.set("n", "<leader>le", "<cmd>EslintFixAll<cr>", { desc = "ESLint fix all" })
```

## トラブルシューティング

### Prettierが動作しない
```vim
:ConformInfo
```
でPrettierが認識されているか確認

### TSServerが起動しない
```vim
:LspInfo
```
でLSPの状態を確認

### プロジェクト設定が読み込まれない
1. `vim.o.exrc = true` が設定されているか確認
2. `.nvim.lua` ファイルがプロジェクトルートにあるか確認
3. Neovimを再起動

## 推奨プラグイン (オプション)

- `nvim-treesitter` - シンタックスハイライト
- `nvim-cmp` - 補完
- `telescope.nvim` - ファジーファインダー
- `gitsigns.nvim` - Git統合
- `trouble.nvim` - 診断一覧
