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

## Day 15 Exercise 01 - Set Up Frontend Testing Tools

Run `npm run test` inside `support-desk-ui` to run this exercise.

### Files created/updated

- `package.json` — added `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, and `@testing-library/user-event` as dev dependencies, plus `test`/`test:watch` scripts.
- `vite.config.js` — added a `test` block (`environment: 'jsdom'`, `globals: true`, `setupFiles: './src/test/setup.js'`, `css: true`).
- `src/test/setup.js` — imports `@testing-library/jest-dom/vitest` for readable matchers like `toBeInTheDocument()`, and clears `localStorage`/mocks/rendered components after each test so tests don't leak state into each other.
- `src/components/ErrorMessage.test.jsx` — a small sample test rendering `ErrorMessage` and asserting the message text appears, proving the whole pipeline (Vitest → jsdom → React Testing Library → jest-dom) works end to end. Kept simple and separate from `filterTickets`, since that utility gets its own dedicated test in Exercise 2.

### Result

`npm run test` runs cleanly with no missing test configuration: 1 test file, 1 test, both passing, confirmed by testing.

### Output Screenshot

![Day 15 Exercise 01 Test Run](screenshots/day15_exercise1.png)
*`npm run test` inside support-desk-ui passing the ErrorMessage sample test*

---

## Day 15 Exercise 02 - Test Ticket Filter Utility

Run `npm run test` inside `support-desk-ui` to run this exercise.

### Files created/updated

- `src/utils/tickets.test.js` — four tests for the existing `filterTickets(tickets, searchText, statusFilter, priorityFilter)` utility, using the sample ticket data from the exercise spec: filtering by search text alone, filtering by status alone, filtering by search text and status together (including a case with no matches), and returning every ticket when search is empty and status is `ALL`. No React component is rendered — these test the pure filtering logic in isolation.

### Result

`npm run test` passes all 4 new filter tests alongside the existing Exercise 1 test: 2 test files, 5 tests, all green, confirmed by testing.

### Output Screenshot

![Day 15 Exercise 02 Test Run](screenshots/day15_exercise2.png)
*`npm run test` passing all 4 filterTickets tests plus the Exercise 1 ErrorMessage test*

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

