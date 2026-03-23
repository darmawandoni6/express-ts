import { defineConfig } from "eslint/config";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tseslint from "typescript-eslint";

import eslint from "@eslint/js";
import js from "@eslint/js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig([
  {
    files: ["src/**/*.ts"],
    plugins: { js },
    extends: ["js/recommended"],
    ignores: ["dist", "node_modules"],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: __dirname,
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/consistent-type-imports": "warn",
      "@typescript-eslint/consistent-type-definitions": "error",
      "no-trailing-spaces": "error",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }], // ignore _next or _params
    },
  },
]);
