# Privacy and redaction policy

This is a public repository. Health information can remain identifiable even after
names are removed, especially when a rare diagnosis combination, exact surgery,
location, clinician, date, or medication history is published.

## Never commit

- source medical records, the source PDF, images, recordings, or correspondence;
- names, initials, birth dates, addresses, contact details, record numbers;
- clinician, clinic, employer, insurer, or small-location identifiers;
- exact appointment dates, exact medication doses, prescription identifiers;
- rare combinations of conditions or procedures unnecessary to the research;
- complaint drafts containing real parties;
- Git history containing material later “deleted” from the working tree.

## Public record rule

Publish only the minimum abstraction needed to test a research question. Exact
source material remains encrypted outside Git with access controlled by the
participant. A public case ID is not a guarantee of anonymity.

If identifying information is committed, stop publication, treat it as an incident,
rotate any exposed identifiers, and rewrite Git history only with informed
participant involvement and specialist assistance.
