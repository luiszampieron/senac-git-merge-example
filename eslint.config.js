const js = require("@eslint/js");

module.exports = [
  {
    ignores: ["node_modules/**", "dist/**", "build/**"],
  },
  {
    files: ["eslint.config.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        require: "readonly",
        module: "readonly",
      },
    },
  },
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
        localStorage: "readonly",
        fetch: "readonly",
        setTimeout: "readonly",
        confirm: "readonly",
        bootstrap: "readonly",
      },
    },
    rules: {
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
];
