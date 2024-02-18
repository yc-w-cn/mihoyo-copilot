module.exports = {
  extends: ["next", "next/core-web-vitals", "prettier"],
  ignorePatterns: ["node_modules", "dist"],
  parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  },
};
