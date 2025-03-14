import antfu from "@antfu/eslint-config";

export default antfu({
  type: "lib",
  typescript: true,
  stylistic: {
    indent: "tab",
    quotes: "double",
  },
  vue: true,
  jsonc: false,
  yaml: false,
  rules: {
    "vue/html-self-closing": "error",
    indent: ["error", "tab"],
    quotes: ["error", "double"],
  },
  plugins: ["eslint-plugin-vue"],
  overrides: [
    {
      files: ["*.vue"],
    },
  ],
});
