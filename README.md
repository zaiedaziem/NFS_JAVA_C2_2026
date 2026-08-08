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



## Day 11 Exercise 01 - Create the React Project

Run `npm run dev` inside `support-desk-ui` to run this exercise.

### Files created

- `support-desk-ui/` — new Vite React project created with `npm create vite@latest support-desk-ui -- --template react`, using ESLint as the linter.
- `App.jsx` — replaced the default Vite starter content with a simple `<h1>Support Desk UI</h1>`.

### Output Screenshot

![Day 11 Exercise 01 Default Vite Page](screenshots/day11_exercise1_vite.png)
*Default Vite + React starter page at localhost:5173*

![Day 11 Exercise 01 Support Desk UI](screenshots/day11_exercise1_supportDeskUI.png)
*App.jsx cleaned up to show "Support Desk UI"*

---

## Day 11 Exercise 02 - Build Layout Components

Run `npm run dev` inside `support-desk-ui` to run this exercise.

### Files created

- `AppHeader.jsx` — shows the "Day 11 React Fundamentals" label and the "Support Desk UI" title.
- `Layout.jsx` — wraps the page, renders `AppHeader` at the top and whatever is passed in as `children` below it.
- `App.jsx` — updated to use `Layout`, passing in a placeholder paragraph as `children`.

### Component Tree

```text
App
└── Layout
    └── AppHeader
```

### Output Screenshot

![Day 11 Exercise 02 Output](screenshots/day11_exercise2.png)
*Layout renders AppHeader plus the children content passed from App*

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

