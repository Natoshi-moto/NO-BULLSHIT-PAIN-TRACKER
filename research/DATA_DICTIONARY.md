# Data dictionary

Version: `nbpt.dataset/v1`

## Design rule

Every observation uses a relative study day, not a calendar date. This reduces
disclosure while preserving order and intervals. The case identifier is
pseudonymous and must not encode identity.

## Daily fields

| Field | Type | Meaning |
|---|---|---|
| `pain_now` | integer 0–10 | Patient-reported pain at entry time |
| `pain_worst` | integer 0–10 | Patient-reported worst pain during the reporting interval |
| `pain_interference` | integer 0–10 | Degree pain disrupted intended activity |
| `function` | integer 0–10 | Patient-defined ability to perform important activities; higher is better |
| `mood` | integer 0–10 | Patient-defined mood; higher is better |
| `sleep_hours` | number or null | Estimated sleep duration |
| `withdrawal_symptoms` | string array | Reported symptoms; not a clinical determination of withdrawal |
| `adverse_effects` | string array | Reported unwanted effects; causation is not implied |
| `urgent_care` | boolean | Whether urgent or emergency care occurred |
| `uncertainty` | string | Missing context, estimates, confounders, or data-quality concerns |

## Event fields

Events mark treatment or system occurrences. They do not assert that the event
caused nearby outcomes.

Event types include medication change proposed/occurred, clinical encounter,
access delay, referral, second opinion, emergency care, and other.

## Analysis direction

For pain and interference, higher scores are worse. For function and mood, higher
scores are better. Sleep has no universal “better” direction and must be interpreted
in context.

Missing values remain missing. They are never silently converted to zero or
carried forward.
