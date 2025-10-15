-- Project-specific Neovim configuration
-- This file is loaded automatically if you have exrc enabled in your init.lua
-- Add: vim.o.exrc = true to your main Neovim config

-- Set local options for this project
vim.opt_local.tabstop = 2
vim.opt_local.shiftwidth = 2
vim.opt_local.expandtab = true
vim.opt_local.softtabstop = 2

-- Enable format on save with null-ls/none-ls or conform.nvim
-- Example for conform.nvim:
-- vim.api.nvim_create_autocmd("BufWritePre", {
--   pattern = { "*.ts", "*.tsx", "*.js", "*.jsx" },
--   callback = function()
--     require("conform").format({ async = false, lsp_fallback = true })
--   end,
-- })

-- LSP settings for TypeScript
local lspconfig_ok, lspconfig = pcall(require, "lspconfig")
if lspconfig_ok then
  -- You can add project-specific LSP settings here
  -- Example: Configure tsserver with project-specific settings
end

print("Loaded oby-frontend project config")
