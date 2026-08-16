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

## Day 18 Exercise 01 - Frontend Dockerfile

Run `docker build -t support-desk-ui:day18 .` inside `support-desk-ui` to run this exercise.

### Files created/updated

- `support-desk-ui/Dockerfile` — multi-stage build. Build stage (`node:24-alpine`) copies `package*.json` first for layer caching, runs `npm ci`, copies source, and runs `npm run build` (Vite build, producing static files in `dist/`). Runtime stage (`nginx:1.27-alpine`, no Node at all) copies **only** `dist/` from the build stage into `/usr/share/nginx/html`. `EXPOSE 80`, plus a `HEALTHCHECK` hitting `/` (using `wget`, since Alpine doesn't ship `curl` by default — same fix applied to the backend Dockerfile in Day 17). `CMD ["nginx", "-g", "daemon off;"]` keeps Nginx in the foreground so Docker tracks it correctly. Satisfies "not use `npm run dev` in the final container" since the runtime image has no Node, no source, and no dev server at all — just static files.
- `support-desk-ui/.dockerignore` — excludes `node_modules`, `dist`, `.git`, test artifacts (`coverage`, `test-results`, `playwright-report`), and editor folders from the build context. Without it, the initial build sent 130.66MB of local `node_modules`/build output to Docker unnecessarily (visible in the first build's `transferring context: 130.66MB` step, which alone took over 100 seconds) — `node_modules` gets reinstalled fresh inside the container via `npm ci` anyway, so shipping the local copy is pure waste.

### Result

`docker build` completes successfully (14/14 steps). Running the container and opening it in a browser correctly serves the fully-styled login page — confirming the static build + Nginx serving works. Submitting the login form correctly fails with "Request failed with status 404" — expected at this stage, not a bug: the frontend calls a relative `/api/...` path that only gets proxied to the backend in Vite's *dev* server config (`vite.config.js`'s `server.proxy`), which has no effect on the production build served by Nginx. Nginx has no rule yet to forward `/api/*` to the backend, so it 404s trying to find a literal file at that path. Fixing that is exactly Day 18 Exercise 2 (Nginx Config).

### Output Screenshot

![Day 18 Exercise 01 Docker Build](screenshots/day18_exercise1_1.png)
*docker build completing all 14 steps for support-desk-ui:day18*

![Day 18 Exercise 01 Frontend Serving](screenshots/day18_exercise1_2.png)
*The containerized frontend serving the fully-styled login page via Nginx; the 404 on submit is expected until Exercise 2 adds the API proxy*

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

