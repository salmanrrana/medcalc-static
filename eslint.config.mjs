import js from "@eslint/js";
import globals from "globals";
export default [
  { ignores: ["node_modules/**"] },
  {
    files: ["calculator.js"],
    languageOptions: {
      globals: {
        ...globals.browser,
        addDays: "readonly",
        formatDateForInput: "readonly",
        parseDate: "readonly",
      },
      sourceType: "script",
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": [
        "error",
        { varsIgnorePattern: "^initializeCalculator$" },
      ],
    },
  },
  {
    files: ["utils.js"],
    languageOptions: { globals: globals.browser, sourceType: "script" },
    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": [
        "error",
        {
          caughtErrors: "none",
          varsIgnorePattern:
            "^(daysSince|transplantDaysSince|chemoDaysSince|formatDateForInput|parseDate|addDays|isValidUrl)$",
        },
      ],
    },
  },
  {
    files: ["nav.js"],
    languageOptions: { globals: globals.browser, sourceType: "script" },
    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": [
        "error",
        { varsIgnorePattern: "^(initializeNavigation|setActiveNavLink)$" },
      ],
    },
  },
  {
    files: ["tests/**/*.mjs", "tools/**/*.mjs", "eslint.config.mjs"],
    languageOptions: { globals: globals.node, sourceType: "module" },
    rules: js.configs.recommended.rules,
  },
];
