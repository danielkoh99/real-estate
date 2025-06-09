import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import importPlugin from "eslint-plugin-import";
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: {
      js,
      import: importPlugin,
      "simple-import-sort": simpleImportSortPlugin
    },
    languageOptions: {
      globals: globals.node
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json"
        }
      }
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      "simple-import-sort/imports": "warn", // auto-sort imports
      "simple-import-sort/exports": "warn",
      "import/no-unresolved": "error",      // detect wrong or missing paths
      "import/order": "off"                 // disable built-in ordering in favor of simple-import-sort
    }
  },
  tseslint.configs.recommended
]);