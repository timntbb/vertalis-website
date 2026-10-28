import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import test from "node:test";
import ts from "typescript";

const code = ts.transpileModule(readFileSync(new URL("../lib/analytics.ts", import.meta.url), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;

function analytics(window) {
  const context = vm.createContext({ exports: {}, ...(window ? { window } : {}) });
  vm.runInContext(code, context);
  return context.exports;
}

test("only successful booking states count; repeated callbacks count once per state", () => {
  const calls = [];
  const { trackBooking } = analytics({ gtag: (...args) => calls.push(args) });
  trackBooking({ uid: "first", status: "CANCELLED" });
  trackBooking({ status: "ACCEPTED" });
  assert.equal(calls.length, 0);
  trackBooking({ uid: "first", status: "PENDING" });
  trackBooking({ uid: "first", status: "PENDING" });
  trackBooking({ uid: "first", status: "ACCEPTED" });
  trackBooking({ uid: "first", status: "ACCEPTED" });
  trackBooking({ uid: "second", status: "ACCEPTED" });
  assert.deepEqual(calls.map(call => call[1]), ["booking_requested", "booking_confirmed", "booking_confirmed"]);
  assert.ok(calls.every(call => !JSON.stringify(call).includes("first")));
  assert.ok(calls.every(call => !JSON.stringify(call).includes("second")));
});

test("events queue before the Google tag loads", () => {
  const window = {};
  analytics(window).trackEvent("generate_lead", { source: "consultation", method: "contact_form" });
  assert.equal(JSON.stringify(window.dataLayer), JSON.stringify([
    ["event", "generate_lead", { source: "consultation", method: "contact_form" }],
  ]));
});

test("unavailable or failing analytics cannot break a submission", () => {
  assert.doesNotThrow(() => analytics().trackEvent("generate_lead", { source: "contact_box" }));
  const tracking = analytics({ gtag: () => { throw new Error("blocked"); } });
  assert.doesNotThrow(() => tracking.trackEvent("generate_lead", { source: "contact_box" }));
});
