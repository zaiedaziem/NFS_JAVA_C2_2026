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



## Day 5 Exercise 01 - HTTP Investigation

Run `node rest-basics/mock-api.js` to start the mock server, then open `rest-basics/requests.http` with the REST Client extension to run this exercise.

### Investigation Table

| Method | URL | Status Code | Response Type | What Happened? |
|---|---|---:|---|---|
| GET | /api/health | 200 | Single object | Server responded confirming the API is up and running |
| GET | /api/course-offerings | 200 | List | Returned an array of all existing course offerings |
| GET | /api/course-offerings/C001 | 404 | Error object | No course offering exists with ID `C001` (real IDs are `CO001`, `CO002`), so the server returned a not-found message |
| POST | /api/course-offerings (valid data) | 201 | Single object | A new course offering was created and returned with a generated ID and status `OPEN` |
| POST | /api/course-offerings (empty data) | 400 | Error object | Validation failed because required fields were empty, server returned a list of field-level errors |

### 1. Which request returned a successful list response?

`GET /api/course-offerings` — returned status `200` with an array of course offerings.

### 2. Which request returned a not-found response?

`GET /api/course-offerings/C001` — returned status `404` because that ID does not exist in the data.

### 3. Which request returned a validation error?

`POST /api/course-offerings` with empty fields — returned status `400` with a list of field errors.

### 4. What is the difference between a successful response and an error response?

A successful response returns a status code in the `2xx` range along with the data that was requested or created. An error response returns a status code in the `4xx` or `5xx` range along with a message explaining what went wrong, instead of the actual data.

### 5. Why is the status code important for frontend developers?

The status code tells the frontend how to react without needing to read the whole response body first. A `200` or `201` means the frontend can display the data or confirm success. A `404` means it should show a "not found" message. A `400` means it should show validation errors next to the form fields. Frontend code branches its behaviour based on the status code.

### Reflection

After this exercise, I understand better that REST is not just about getting data back — the status code itself carries meaning. A `404` and a `400` both look like "it failed," but they mean completely different things: one says the resource does not exist, the other says the request itself was invalid. Reading the status code first tells you what kind of problem you're dealing with before even looking at the response body.

### Output Screenshots

![Day 5 Exercise 01 Output 1](screenshots/day5_exercise1_1.png)
![Day 5 Exercise 01 Output 2](screenshots/day5_exercise1_2.png)
![Day 5 Exercise 01 Output 3](screenshots/day5_exercise1_3.png)
![Day 5 Exercise 01 Output 4](screenshots/day5_exercsise1_4.png)
![Day 5 Exercise 01 Output 5](screenshots/day5_exercise1_5.png)
![Day 5 Exercise 01 Output 6](screenshots/day5_exercise1_6.png)

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

