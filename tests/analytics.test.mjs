import test from "node:test";
import assert from "node:assert/strict";
import { dailyEntries, eventWindow, mean, summarize, toDailyCsv } from "../analytics.mjs";

const dataset = {
  schema: "nbpt.dataset/v1",
  entries: [
    { id: "d2", kind: "DAILY", relative_day: 2, recorded_at: "2026-01-03T00:00:00Z", pain_now: 8, pain_worst: 9, pain_interference: 8, function: 2, mood: 3, sleep_hours: null, source_class: "PATIENT_REPORT", withdrawal_symptoms: [], adverse_effects: [], uncertainty: "none recorded" },
    { id: "e1", kind: "EVENT", relative_day: 1, recorded_at: "2026-01-02T12:00:00Z", event_type: "MEDICATION_CHANGE_OCCURRED" },
    { id: "d0", kind: "DAILY", relative_day: 0, recorded_at: "2026-01-01T00:00:00Z", pain_now: 4, pain_worst: 6, pain_interference: 5, function: 6, mood: 6, sleep_hours: 7, source_class: "PATIENT_REPORT", withdrawal_symptoms: [], adverse_effects: [], uncertainty: "none recorded" },
  ],
};

test("daily entries are filtered and ordered without mutating input", () => {
  assert.deepEqual(dailyEntries(dataset).map((entry) => entry.id), ["d0", "d2"]);
  assert.equal(dataset.entries[0].id, "d2");
});

test("mean ignores missing and rejects an all-missing result", () => {
  assert.equal(mean([2, null, 4, undefined]), 3);
  assert.equal(mean([null, undefined]), null);
});

test("summary exposes sample size and missingness", () => {
  const report = summarize(dataset);
  assert.equal(report.daily_observations, 2);
  assert.equal(report.fields.pain_now.mean, 6);
  assert.equal(report.fields.sleep_hours.observed, 1);
  assert.equal(report.fields.sleep_hours.missing, 1);
  assert.match(report.non_claim, /not establish/);
});

test("event window is descriptive and excludes the event day", () => {
  const report = eventWindow(dataset, "e1", 7);
  assert.equal(report.before_n, 1);
  assert.equal(report.after_n, 1);
  assert.equal(report.metrics.pain_now.difference, 4);
  assert.equal(report.metrics.function.difference, -4);
  assert.match(report.non_claim, /not a causal/);
});

test("event window validates radius and event identity", () => {
  assert.throws(() => eventWindow(dataset, "missing"), /not found/);
  assert.throws(() => eventWindow(dataset, "e1", 0), /radius/);
});

test("CSV is stable, quoted, and daily-only", () => {
  const csv = toDailyCsv(dataset);
  assert.equal(csv.split("\n").length, 4);
  assert.match(csv, /"PATIENT-001"|""/);
  assert.doesNotMatch(csv, /MEDICATION_CHANGE_OCCURRED/);
});
