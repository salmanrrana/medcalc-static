import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

const context = vm.createContext({ URL });
vm.runInContext(await readFile("utils.js", "utf8"), context);

test("date parsing rejects normalized and malformed calendar dates", () => {
  assert.equal(context.parseDate("2025-02-29"), null);
  assert.equal(context.parseDate("2024-02-30"), null);
  assert.equal(context.parseDate("2024-2-01"), null);
  assert.equal(context.parseDate("garbage"), null);
  assert.equal(
    context.parseDate("2024-02-29").toISOString(),
    "2024-02-29T00:00:00.000Z",
  );
});

test("transplant and chemotherapy counters keep their day-zero/day-one rules", () => {
  const start = context.parseDate("2024-02-28");
  const target = context.parseDate("2024-03-01");
  assert.equal(context.transplantDaysSince(start, target), 2);
  assert.equal(context.chemoDaysSince(start, target), 3);
  assert.equal(context.transplantDaysSince(start, start), 0);
  assert.equal(context.chemoDaysSince(start, start), 1);
});

test("invalid Date objects do not produce misleading numbers", () => {
  const invalidDate = vm.runInContext('new Date("bad")', context);
  const validDate = vm.runInContext("new Date()", context);

  assert.equal(context.transplantDaysSince(invalidDate, validDate), null);
  assert.equal(context.chemoDaysSince(validDate, invalidDate), null);
});

test("date-only counters are stable across local time zones", () => {
  const probe = `
    const fs = require("node:fs");
    const vm = require("node:vm");
    const context = vm.createContext({});
    vm.runInContext(fs.readFileSync("utils.js", "utf8"), context);
    const start = context.parseDate("2024-03-09");
    const end = context.parseDate("2024-03-11");
    process.stdout.write(String(context.transplantDaysSince(start, end)));
  `;
  for (const TZ of ["America/Chicago", "Pacific/Auckland", "UTC"]) {
    const result = execFileSync(process.execPath, ["-e", probe], {
      encoding: "utf8",
      env: { ...process.env, TZ },
    });
    assert.equal(result, "2", TZ);
  }
});
