module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  ignorePatterns: ["dist", ".eslintrc.cjs", "src/**/*.d.ts"],
  parserOptions: {
    sourceType: "module",
  },
  rules: {
    "@typescript-eslint/consistent-type-imports": "warn",
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
  },
};
