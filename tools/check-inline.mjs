import { readFile, readdir } from "node:fs/promises";
import js from "@eslint/js";
import { Linter } from "eslint";
import globals from "globals";

const htmlFiles = (await readdir(".")).filter((file) => file.endsWith(".html"));
const linter = new Linter({ configType: "flat" });
let count = 0;
let failed = false;

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  for (const match of html.matchAll(
    /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi,
  )) {
    count += 1;
    const messages = linter.verify(match[1], {
      languageOptions: {
        ecmaVersion: "latest",
        sourceType: "script",
        globals: {
          ...globals.browser,
          chemoDaysSince: "readonly",
          initializeCalculator: "readonly",
          initializeNavigation: "readonly",
          transplantDaysSince: "readonly",
        },
      },
      rules: js.configs.recommended.rules,
    });
    for (const message of messages) {
      failed = true;
      console.error(
        `${file}:${message.line}:${message.column} ${message.message} (${message.ruleId ?? "parse"})`,
      );
    }
  }
}

if (failed) process.exit(1);
console.log(`Linted ${count} inline script${count === 1 ? "" : "s"}.`);
