import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts}"], rules: {
      "@typescript-eslint/no-explicit-any": "off",
    }
  },
];