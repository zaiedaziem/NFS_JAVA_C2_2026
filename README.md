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

