# Day 16 Ticket Refactor Rationale

## Files changed

- `support-desk-api/src/main/java/com/example/supportdesk/service/TicketService.java`
- `support-desk-ui/src/components/TicketFormWizard.jsx`
- `support-desk-ui/src/utils/ticketFormValidation.js` (new)
- `support-desk-ui/src/utils/ticketFormValidation.test.js` (new)

## Goal

Reduce duplication in the backend service and move frontend form validation out of the
component, without changing any behaviour a caller (frontend, `.http` requests, or a user)
can observe.

## What changed — backend (`TicketService`)

- The duplicated `findById(id).orElseThrow(...)` block in `getTicketById` and `updateTicket`
  was extracted into a private `findTicketOrThrow(id)` helper, used by both.
- `createTicket` and `updateTicket` now both run title/description/category/createdBy through
  a private `normalizeRequired(value)` helper (trims whitespace), and priority/status through
  `normalizePriority(value)`/`normalizeStatus(value)` (trim + uppercase).

## What changed — frontend (`TicketFormWizard`)

- Step validation logic moved out of the component into
  `validateTicketFormStep(formValues, stepToValidate, reviewConfirmed)` in the new
  `ticketFormValidation.js` utility.
- The submit payload construction (trimming text fields) moved into
  `normalizeTicketFormPayload(formValues)`.
- The review-step label formatting moved into `formatTicketFormLabel(key)`.
- The component now only owns form state, step navigation, and wiring the extracted
  functions together — it no longer contains the validation rules themselves.

## What behaviour was preserved

- All public method names/signatures in `TicketService` are unchanged.
- `TicketV1Controller` endpoint URLs, HTTP methods, and status codes are unchanged.
- `TicketResponse` and the request DTOs' fields are unchanged.
- The exception type (`ResourceNotFoundException`) and its message format are unchanged.
- The ticket form's UI, CSS classes, field names, step order, and validation messages are
  unchanged.
- Create and edit both still work identically from a user's perspective.

## Why the new version is easier to maintain

- The backend no longer has two near-identical lookup-or-404 blocks to keep in sync — there's
  one `findTicketOrThrow`, so a future change to that behaviour (e.g. a different error
  message) only needs to happen once.
- The frontend validation rules can now be tested directly with plain function calls
  (`validateTicketFormStep(...)`) instead of needing to render the component, click through
  three wizard steps, and inspect the DOM for every rule change.
- `ticketFormValidation.js` has no dependency on React, refs, or the DOM — it's a pure module,
  which makes it trivial to reason about and reuse if a second form ever needs the same rules.

## Tests and HTTP requests run

- Backend: `mvn compile` (clean build), then re-ran `requests/day13.http` — create ticket, get
  all tickets, a valid update, an invalid-priority update (`URGENT` → 400), and an
  invalid-status update (`RESOLVED` → 400). All returned the same status codes and response
  shapes as before the refactor.
- Frontend: `npm run test` — 6 test files, 17 tests, all passing, including the 6 new
  `ticketFormValidation.test.js` tests (required-field errors, valid-step-passes, invalid
  priority/status, review-checkbox confirmation, payload trimming, label formatting).
- Manually re-tested creating and editing a ticket through the real UI to confirm the wizard
  still looks and behaves the same.

## Risk that still remains

- `normalizePriority`/`normalizeStatus` uppercase the value before saving, but the DTO-level
  `@Pattern` validation on `UpdateTicketRequest` is case-sensitive and runs *before* the
  service method — so a lowercase `"open"` is already rejected as a 400 by Bean Validation
  before `normalizeStatus` ever gets a chance to fix the casing. The normalization is
  currently more of a safety net for whitespace than something that changes what values are
  accepted; it isn't fully exercised by the current DTO validation rules.
- No new backend unit tests were added for `TicketService` directly (verification relied on
  `.http` requests) — a future improvement would be JUnit tests for `findTicketOrThrow`,
  `normalizeRequired`, `normalizeStatus`, and `normalizePriority` in isolation.
