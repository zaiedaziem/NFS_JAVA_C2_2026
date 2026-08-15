# NFS_JAVA_C2_2026 | Full-Stack Development with Java, React & MongoDB



## Programme Description



This 20-day programme is designed to help participants build a complete full-stack web application using Java, Spring Boot, React, and MongoDB.



The programme takes learners from programming and web fundamentals to backend API development, frontend interface design, database modelling, authentication, testing, performance improvement, and final capstone presentation.



Throughout the programme, participants will work on practical exercises and gradually build a small but production-like web application. The final outcome is a working capstone project that demonstrates the use of a React frontend, Spring Boot backend, MongoDB database, secure authentication, API documentation, testing practices, and deployment-readiness basics.



AI tools such as Gemini are used as learning accelerators to help scaffold examples, suggest refactoring ideas, draft tests, generate sample data, and support MongoDB query or aggregation design. However, participants are expected to review, verify, understand, and take ownership of all generated code.



---



## Programme Duration



* Duration: 20 training days

* Daily Duration: 7 hours per day

* Total Training Hours: 140 hours

* Mode: Instructor-led training with guided labs, team build activities, review sessions, quizzes, and capstone development



---



## Programme Objectives



By the end of this programme, participants will be able to:



* Understand web fundamentals, HTTP, REST, and JSON.

* Write basic to intermediate Java and JavaScript code.

* Build REST APIs using Spring Boot.

* Apply validation, authentication, authorisation, and error-handling practices.

* Model data effectively using MongoDB.

* Use MongoDB indexes, queries, pagination, and aggregation pipelines.

* Build accessible React user interfaces with routing, forms, state, and data fetching.

* Apply testing practices for backend and frontend development.

* Use AI coding assistants responsibly for learning, refactoring, testing, and documentation.

* Design, build, document, and present a full-stack capstone project.



---





---

## Day 16 Exercise 00 - Prompt Engineering Warm-Up

No code changes for this exercise — it's about practicing how to prompt AI safely before using it to refactor real code.

### 1. Poor prompt (too vague)

> "Can you make my TicketService better?"

### 2. Better prompt (structured)

```text
Context:
I am working on the Support Desk Ticket API, a Spring Boot backend. TicketService.java
(support-desk-api/src/main/java/com/example/supportdesk/service/TicketService.java)
handles fetching, filtering, paginating, creating, and updating tickets, backed by
MongoDB via TicketRepository.

Task:
Refactor TicketService to reduce duplication and improve readability — particularly
the repeated pattern of converting MongoDB Ticket documents into TicketResponse DTOs,
and the similar structure between createTicket and updateTicket.

Constraints:
- Do not change public method names or signatures (getAllTickets, getFilteredTickets,
  getTicketById, getTicketsPaged, createTicket, updateTicket).
- Do not change TicketV1Controller's endpoint URLs or HTTP methods.
- Do not change TicketResponse or the request DTOs' fields.
- Do not change validation rules or exception types (ResourceNotFoundException, etc.).
- Do not add new dependencies.
- Keep it readable for a junior Java developer.

Expected output:
1. The refactored TicketService.java
2. A short explanation of each new private helper method and why it exists
3. A list of exactly what stayed the same

Tests:
- Tell me which requests in requests/day13.http I should re-run to confirm behaviour
  didn't change
- Suggest whether any new unit tests would help lock in the refactor

Review:
- Point out any risk of behaviour change
- Flag anything you're unsure about instead of guessing
```

### Why the second prompt is safer

The vague prompt gives the AI no boundaries — it could rename methods, change validation, alter the response shape, or "improve" things I never asked about, any of which would silently break the frontend or the `.http` test files without me noticing until something downstream fails. The structured prompt pins down exactly which file/class is in scope, explicitly protects the things other code depends on (method signatures, endpoint URLs, DTO fields, exception types), and asks for a "what stayed the same" list plus verification steps. That turns *trust the AI* into *verify the AI* — the actual safety mechanism.

---

## Day 16 Exercise 01 - AI Refactor Safety Checklist

No code changes for this exercise — a checklist to follow before sharing any project file with an AI assistant.

### AI Refactor Safety Checklist — Support Desk Ticket Project

- **Safe to share**: individual `.java` service/controller/DTO files, `.jsx` components, `.js` utilities, `.css`, and `README.md` — these contain no credentials, just application logic.
- **Safe to share**: `.http` request files under `requests/`, but only after removing any `@token = ...` value pasted in from a real login response (JWTs identify a real user session).
- **Not safe to share**: `application.properties` as-is, or at minimum the `app.jwt.secret` value — even though it's a classroom demo default, sharing full config files with AI trains a bad habit for real projects.
- **Not safe to share**: anything from `.env` files, MongoDB connection strings with credentials, or seeded admin passwords (`Admin@12345`) outside of documentation clearly marked "classroom demo only."
- **Must be removed/redacted before pasting into AI**: JWT tokens, `app.jwt.secret`, the MongoDB URI if it ever contains real credentials, and any user's real email/password.
- **Must not change**: public method signatures in `TicketService`/`AuthService`/`JwtService`, and their return types.
- **Must not change**: `TicketV1Controller`/`AuthController` endpoint URLs, HTTP methods, and status codes.
- **Must not change**: DTO field names (`TicketResponse`, `CreateTicketRequest`, `UpdateTicketRequest`) since the frontend depends on their exact shape.
- **Must not change**: `SecurityConfig`'s authorization rules (which roles can hit which endpoints) — a refactor should never accidentally widen access.
- **Tests/requests that prove safety**: re-run `requests/day13.http` (create, get all, valid/invalid update) and `npm run test` in `support-desk-ui` (currently 5 test files, 11 tests) — if both still pass unchanged, the refactor didn't alter behaviour.

---

## Day 16 Exercise 02 - Backend Ticket Service Refactor

Run `mvn spring-boot:run` inside `support-desk-api` to run this exercise. Test with `requests/day13.http`.

### Files created/updated

- `service/TicketService.java` — extracted repeated logic into private helper methods, using the Generate → Explain → Test pattern:
  - `findTicketOrThrow(id)` — replaces the duplicated `findById(id).orElseThrow(...)` block that both `getTicketById` and `updateTicket` had, now shared by both.
  - `normalizeRequired(value)` — trims free-text fields (title, description, category, createdBy) so stray whitespace from the client isn't stored as part of the value.
  - `normalizeStatus(status)` / `normalizePriority(priority)` — trim + uppercase, applied consistently in both `createTicket` and `updateTicket`.

### What stayed the same

- All public method signatures (`getAllTickets`, `getFilteredTickets`, `getTicketById`, `getTicketsPaged`, `createTicket`, `updateTicket`).
- `TicketV1Controller`'s endpoint URLs, HTTP methods, and status codes.
- `TicketResponse`/request DTO fields and the response shape.
- The exception type (`ResourceNotFoundException`) and its message format.

### Result

Backend compiles cleanly (`mvn compile`, no errors). Re-tested create, get all, valid update, and both invalid-priority/invalid-status requests from `requests/day13.http` — all still return the same status codes and response shapes as before the refactor, confirmed by testing. No screenshot for this exercise — verified directly via the `.http` requests.

---

## Day 16 Exercise 03 - Extract Ticket Form Validation

Run `npm run test` inside `support-desk-ui` to run this exercise.

### Files created/updated

- `src/utils/ticketFormValidation.js` — new utility extracted from `TicketFormWizard.jsx`, exporting `PRIORITY_OPTIONS`/`STATUS_OPTIONS`, `validateTicketFormStep(formValues, stepToValidate, reviewConfirmed)`, `normalizeTicketFormPayload(formValues)`, and `formatTicketFormLabel(key)` — same validation rules and messages as before, just moved out of the component.
- `src/components/TicketFormWizard.jsx` — now imports and calls those functions instead of holding the logic inline. `validateStep` is now a thin wrapper that reads the review checkbox ref and delegates to `validateTicketFormStep`; `handleSubmit` calls `normalizeTicketFormPayload` directly.
- `src/utils/ticketFormValidation.test.js` — 6 unit tests: blank-vs-valid required fields (step 1), invalid priority/status (step 2), review checkbox confirmation (step 3), payload trimming, and label formatting.

Two bugs found and fixed while testing this exercise, unrelated to the validation extraction itself:

- `vite.config.js` — Vitest's default file pattern was picking up `e2e/day15-smoke.spec.js` (a Playwright spec) and failing on it, since Playwright's `test()` only works inside Playwright's own runner. Added `include: ['src/**/*.test.{js,jsx}']` and `exclude: ['node_modules', 'dist', 'e2e/**', 'playwright.config.js']` to scope Vitest to only its own test files.
- `src/services/httpClient.js` — a stale/expired token previously just showed a raw "Request failed with status 401" error while leaving the user on the broken page, requiring a manual Logout click to recover. `apiRequest` now detects a 401 on any request that sent a token, clears the stored session, and redirects straight to `/login` automatically.

### Result

`npm run test` passes all 6 new validation tests alongside every previous test: 6 test files, 17 tests, all green. The form's UI, messages, and create/edit behavior are unchanged, confirmed by testing. No screenshot for this exercise.

---

## Day 16 Exercise 04 - Generate Then Harden Tests

No new code for this exercise — `src/utils/ticketFormValidation.test.js` from Exercise 3 already meets all three requirements (required-field, invalid priority/status, payload normalization). This documents the generate → harden process behind it.

### Hypothetical AI draft (weak)

```js
import { describe, it, expect } from 'vitest';
import { validateTicketFormStep, normalizeTicketFormPayload } from './ticketFormValidation.js';

describe('ticketFormValidation', () => {
  it('validates', () => {
    const result = validateTicketFormStep({ title: '', description: '', category: '' }, 1, false);
    expect(result).toBeTruthy();
  });

  it('normalizes', () => {
    const result = normalizeTicketFormPayload({ title: ' test ', description: 'test', category: 'test', priority: 'LOW', status: 'OPEN' });
    expect(result).toBeTruthy();
  });
});
```

### Problems with the draft

- Vague test names (`'validates'`, `'normalizes'`) don't say what's being proven.
- `toBeTruthy()` on an object is a weak assertion — it passes even if the error object has the wrong keys or wrong messages, since any non-empty object is truthy.
- No invalid priority/status test at all.
- No "valid input produces zero errors" case — only tests the broken path, never confirms the function doesn't over-trigger.
- Doesn't check the actual trimmed values — just checks the payload object exists, not that it's correct.

### What the hardened version improves

- Descriptive names stating exact behavior (e.g. `'rejects an invalid priority or status on step 2'`).
- Exact string assertions (`expect(errors.title).toBe('Title is required.')`) instead of vague truthiness.
- An explicit "no errors when valid" case (`expect(errors).toEqual({})`).
- `toEqual` on the full normalized payload object — catches a bug like forgetting to trim one specific field.
- Tests behavior only (inputs → outputs), with no dependency on component internals, DOM, or refs.

### Result

The final `ticketFormValidation.test.js` (6 tests) already satisfies all three required categories and every item on the manual hardening checklist, confirmed by review.

---

## Day 16 Exercise 05 - Before/After Diff Rationale

### Files created/updated

- [`docs/day16-ticket-refactor-rationale.md`](docs/day16-ticket-refactor-rationale.md) — new standalone rationale document covering both the Exercise 2 (`TicketService`) and Exercise 3 (`TicketFormWizard`/`ticketFormValidation.js`) refactors: files changed, what behaviour was preserved, what logic was extracted, why the new version is easier to maintain, what tests/HTTP requests were run, and remaining risk.

### Result

A reviewable summary that lets another developer understand the Day 16 backend and frontend refactors without re-reading every diff. It also flags one honest risk: the priority/status uppercasing in TicketService is currently unreachable in practice, since the DTO's case-sensitive validation rejects lowercase values before the service method runs.

---

## Day 16 Exercise 06 - AI-Assisted Coding Reflection

### 1. What did the AI assistant help you do faster?

Extracting the TicketService and TicketFormWizard refactors in Exercises 2 and 3. Generating the helper methods, the validation utility, and a full test suite took minutes instead of writing and hand checking each piece separately.

### 2. What AI suggestion did you reject or change?

In Exercise 4, a first draft test used toBeTruthy() on the validation errors object. That was changed to exact assertions like toBe('Title is required.') and toEqual({}), since a truthy check would still pass even if the error messages were completely wrong.

### 3. Why should developers not accept generated code blindly?

AI can produce code that compiles and looks reasonable while quietly changing behaviour, like renaming a method, loosening validation, or changing something outside the requested scope. Without manual review and re-running tests or HTTP requests, those changes go unnoticed until something breaks later.

### 4. What private information should never be pasted into AI tools?

JWT tokens, the JWT secret, database connection strings and credentials, real user passwords or emails, and full application.properties or .env files. This is covered in the Exercise 1 safety checklist.

### 5. What tests proved that your refactor preserved behaviour?

On the backend, the requests/day13.http suite (create, get all, valid update, invalid priority, invalid status) all returned the same status codes and shapes. On the frontend, npm run test passed 6 test files and 17 tests after the extraction, plus a manual click through of create and edit in the real UI.

### 6. What part of AI-assisted refactoring still feels unclear?

Knowing when a "safe" refactor has quietly touched something outside its intended scope, like the priority/status normalization in TicketService turning out to be unreachable because of how DTO validation already runs first. Tests catch behaviour changes, but they do not always catch logic that is technically correct but pointless.

---

## Day 16 Exercise 07 - AI Regression Check

### Regression checklist

1. Login: works with seeded admin credentials, redirects to /app/dashboard. Unaffected by the Day 16 refactor since AuthContext.jsx and LoginPage.jsx were not touched.
2. Protected ticket list: /app/tickets still loads real ticket data and redirects to /login when logged out.
3. Create ticket form: still submits through all 3 wizard steps and the new ticket appears in the list, now backed by normalizeTicketFormPayload instead of inline code.
4. Edit ticket form: still pre-fills with the selected ticket's data and saves via PUT, now backed by findTicketOrThrow and the normalize helpers on the backend.
5. API request headers: apiRequest still attaches Authorization: Bearer only when a token is passed, confirmed by the E2E test succeeding (it depends on the header reaching the protected /api/v1/tickets endpoints).
6. Validation rules: same required-field and priority/status messages, now proven by ticketFormValidation.test.js instead of only manual clicking.
7. 401 handling: improved during Exercise 3 testing. A stale token now clears itself and redirects to /login automatically instead of showing a raw error.
8. 403 handling: not exercised by normal app usage. The v1 endpoints the frontend actually calls (GET/POST /api/v1/tickets/**) allow both USER and ADMIN roles, so there is no path in the UI that would trigger a 403. Only the legacy POST /api/tickets (not used by the frontend) requires ADMIN specifically. This is a known coverage gap, not a regression.
9. Unit tests: npm run test passes 6 test files, 17 tests, all green, re-run today to confirm.
10. E2E smoke test: npm run test:e2e passes the full login through create ticket flow in a real Chromium browser, re-run today to confirm.

### Example risk the AI identified

While writing the before/after rationale (Exercise 5), reviewing the refactor surfaced that normalizePriority and normalizeStatus in TicketService uppercase their input, but UpdateTicketRequest already rejects lowercase values with a case-sensitive @Pattern check before the service method ever runs. The normalization looked like it changed accepted input, but it actually only protects against stray whitespace, since bad casing is already blocked earlier in the request pipeline.

### Test/manual check used to confirm behaviour still works

Re-ran both automated suites today: npm run test (6 test files, 17 tests, all passing) and npm run test:e2e (1 test, passing) with the backend running. Both came back clean after all of Day 16's changes, confirming no regression.

---

## AI-Assisted Learning Guidelines



Participants may use AI tools to:



* Generate README drafts and documentation sections.

* Create API call examples and JSON payload samples.

* Suggest method signatures and edge cases.

* Propose refactoring options.

* Draft test scenarios for backend and frontend features.

* Suggest MongoDB document structures, queries, indexes, and aggregation pipelines.

* Improve demo scripts and presentation notes.



Participants must always review, verify, test, and understand any AI-generated output. No passwords, API keys, tokens, private keys, or confidential data should be placed into AI prompts.

