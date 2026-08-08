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



## Day 10 Exercise 01 - Add Versioned Ticket API Endpoints

Run `mvn spring-boot:run` inside `support-desk-api` to run this exercise. Requires MongoDB running locally.

### Files created

- `TicketV1Controller.java` — versioned copy of `TicketController` under `/api/v1/tickets`, reusing the same `TicketService` methods. Exposes `GET /api/v1/tickets`, `GET /api/v1/tickets/{id}`, and `POST /api/v1/tickets`.
- `SecurityConfig.java` — added rules so `GET /api/v1/tickets/**` requires `USER` or `ADMIN`, and `POST /api/v1/tickets` requires `USER` or `ADMIN` (looser than the original `/api/tickets` POST rule, which is `ADMIN`-only).
- `assets.http` — added test requests confirming `/api/v1/tickets` rejects requests without a token, works with a valid token, and that the old `/api/tickets` endpoint still works.

### Reflection Question

**Why might a company keep both `/api/tickets` and `/api/v1/tickets` temporarily?**

To avoid breaking existing clients. If other applications, mobile apps, or frontend code are already calling `/api/tickets`, removing it immediately would break them the moment the new versioned route goes live. Keeping both allows a gradual migration, existing consumers keep working on the old route while new consumers adopt `/api/v1/tickets`, until everyone has switched over and the old route can be safely retired.

### Output Screenshot

![Day 10 Exercise 01 Without Token](screenshots/day10_exercise1_ticketsWithoutToken.png)
*GET /api/v1/tickets without a token returns 401*

![Day 10 Exercise 01 With USER Token](screenshots/day10_exercise1_TicketWtih UserToken.png)
*GET /api/v1/tickets with a USER token returns 200*

![Day 10 Exercise 01 Old Endpoint Still Works](screenshots/day10_exercise1_oldEndpoint.png)
*The old GET /api/tickets endpoint still works unchanged*

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

