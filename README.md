# NO-BULLSHIT-PAIN-TRACKER

A working, privacy-first longitudinal research instrument for measuring chronic
pain, function, treatment events, adverse outcomes, and healthcare-system
friction.

**The tool is the research.** Its value comes from repeated structured
observations, explicit uncertainty, event markers, transparent summaries, and
portable de-identified datasets—not from persuasive narratives about a single
case.

> **Research prototype — not medical or legal advice.** The tracker does not
> recommend medication changes. Abrupt changes to dependence-forming medicines can
> be dangerous; seek qualified clinical help. If someone may be in immediate danger
> or at risk of self-harm, contact local emergency or crisis services now.

## Run the instrument

Open [`index.html`](index.html) in a modern browser. No build step, account, or
server is required.

The instrument records:

- pain now, worst pain, and pain interference;
- function, sleep, mood, activities completed and prevented;
- withdrawal symptoms, adverse effects, and urgent care;
- treatment proposals, treatment changes, encounters, access delays, referrals,
  second opinions, and emergency events;
- the evidence class and uncertainty attached to every event.

Data remains in browser local storage until explicitly exported. JSON exports can
be imported later or analyzed with external research tools. Local storage is not
encrypted and is not suitable for shared or untrusted devices.

The chart is deliberately descriptive. A line, event marker, or before/after
difference does not establish that a treatment or institution caused an outcome.

## Research principles

1. Patient reports are evidence of reported experience, not proof of causation.
2. Clinical records, guidelines, laws, and interpretations are different evidence
   classes and must not be conflated.
3. No raw health records or identifying information belong in this public repo.
4. Every system-failure allegation needs an event, jurisdiction, source type,
   uncertainty statement, and opportunity for alternative explanations.
5. Guidelines do not automatically establish an individual legal entitlement,
   negligence, misconduct, or a required prescription.
6. The instrument must capture competent care, neutral outcomes, missing data, and
   evidence against the research hypothesis as readily as failures.

## Research files

- [Research protocol](PROTOCOL.md)
- [Privacy and redaction policy](PRIVACY.md)
- [Patient 001 seed record](cases/PATIENT-001/CASE.md)
- [Patient 001 claim audit](cases/PATIENT-001/CLAIMS.md)
- [Cross-jurisdiction evidence ledger](research/JURISDICTION_LEDGER.md)
- [Daily observation template](templates/DAILY_LOG.md)
- [Clinical encounter template](templates/ENCOUNTER.md)
- [Machine-readable schema](schemas/daily-log.schema.json)

## Initial case status

The first source has been triaged. It is an AI-generated clinical/legal brief
about a person with complex chronic pain and a proposed opioid taper. The source
is retained outside this public repository. Its medical history is
patient-reported unless corroborated by primary records, and its legal conclusions
are not accepted as legal determinations.

## License

Research text and templates are CC BY 4.0. Software and schemas are MIT licensed.
Sensitive source material is excluded and receives no license through this
repository.
