import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // Additional ESLint rules
      "object-shorthand": "error",
      "no-new-object": "error",
      "default-param-last": "error",
      "no-new-func": "error",
      "function-paren-newline": ["error", "consistent"],
      "no-duplicate-imports": "error",
      "object-curly-newline": ["error", { consistent: true }],
      "no-undef": "error",
      "prefer-const": "error",
      "one-var": ["error", "never"],
      "no-multi-assign": "error",
      "no-plusplus": "error",
      "operator-linebreak": ["error", "before"],
      "new-cap": "error",
      camelcase: "error",
      "id-length": ["error", { min: 2 }],
      "nonblock-statement-body-position": ["error", "beside"],
      "brace-style": ["error", "1tbs", { allowSingleLine: true }],
      "no-iterator": "error",
      "no-restricted-syntax": "error",
      "prefer-arrow-callback": "error",
      "arrow-spacing": "error",
      "no-array-constructor": "error",
      "template-curly-spacing": ["error", "never"],
      "prefer-template": "error",
      "no-eval": "error",
      "no-useless-constructor": "error",
      "no-dupe-class-members": "error",
      "class-methods-use-this": "error",
      "dot-notation": "error",
      "prefer-exponentiation-operator": "error",
    },
  },
];
