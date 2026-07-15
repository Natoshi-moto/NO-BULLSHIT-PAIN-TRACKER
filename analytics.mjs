const NUMERIC_FIELDS = [
  "pain_now",
  "pain_worst",
  "pain_interference",
  "function",
  "mood",
  "sleep_hours",
];

export function dailyEntries(dataset) {
  if (!dataset || dataset.schema !== "nbpt.dataset/v1" || !Array.isArray(dataset.entries)) {
    throw new TypeError("Expected an nbpt.dataset/v1 dataset");
  }
  return dataset.entries
    .filter((entry) => entry.kind === "DAILY")
    .slice()
    .sort((a, b) => a.relative_day - b.relative_day || String(a.recorded_at).localeCompare(String(b.recorded_at)));
}

export function mean(values) {
  const observed = values.filter(Number.isFinite);
  if (!observed.length) return null;
  return observed.reduce((total, value) => total + value, 0) / observed.length;
}

export function summarize(dataset) {
  const entries = dailyEntries(dataset);
  const fields = Object.fromEntries(
    NUMERIC_FIELDS.map((field) => {
      const values = entries.map((entry) => entry[field]);
      const observed = values.filter(Number.isFinite);
      return [field, {
        mean: mean(values),
        observed: observed.length,
        missing: values.length - observed.length,
      }];
    }),
  );
  return {
    schema: "nbpt.summary/v1",
    daily_observations: entries.length,
    first_relative_day: entries.length ? entries[0].relative_day : null,
    last_relative_day: entries.length ? entries.at(-1).relative_day : null,
    fields,
    non_claim: "Descriptive statistics do not establish diagnosis, treatment effect, or causation.",
  };
}

export function eventWindow(dataset, eventId, radius = 7) {
  if (!Number.isInteger(radius) || radius < 1 || radius > 365) {
    throw new RangeError("radius must be an integer from 1 to 365");
  }
  const event = dataset.entries.find((entry) => entry.id === eventId && entry.kind === "EVENT");
  if (!event) throw new Error("Event not found");
  const observed = dailyEntries(dataset);
  const before = observed.filter((entry) => entry.relative_day < event.relative_day && entry.relative_day >= event.relative_day - radius);
  const after = observed.filter((entry) => entry.relative_day > event.relative_day && entry.relative_day <= event.relative_day + radius);
  const metrics = Object.fromEntries(
    ["pain_now", "pain_interference", "function", "mood", "sleep_hours"].map((field) => {
      const beforeMean = mean(before.map((entry) => entry[field]));
      const afterMean = mean(after.map((entry) => entry[field]));
      return [field, {
        before_mean: beforeMean,
        after_mean: afterMean,
        difference: beforeMean === null || afterMean === null ? null : afterMean - beforeMean,
      }];
    }),
  );
  return {
    schema: "nbpt.event-window/v1",
    event_id: event.id,
    event_type: event.event_type,
    event_relative_day: event.relative_day,
    radius_days: radius,
    before_n: before.length,
    after_n: after.length,
    metrics,
    non_claim: "A before/after difference around an event is descriptive, confounded, and not a causal treatment estimate.",
  };
}

function csvCell(value) {
  const text = value == null ? "" : Array.isArray(value) ? value.join("; ") : String(value);
  return '"' + text.replaceAll('"', '""') + '"';
}

export function toDailyCsv(dataset) {
  const entries = dailyEntries(dataset);
  const columns = [
    "case_id", "relative_day", "recorded_at", "source_class", ...NUMERIC_FIELDS,
    "urgent_care", "withdrawal_symptoms", "adverse_effects",
    "activities_completed", "activities_prevented", "uncertainty",
  ];
  return [
    columns.map(csvCell).join(","),
    ...entries.map((entry) => columns.map((column) => csvCell(entry[column])).join(",")),
  ].join("\n") + "\n";
}
