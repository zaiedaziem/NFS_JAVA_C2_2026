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



## Day 12 Exercise 01 - Add React Router

Run `npm run dev` inside `support-desk-ui` to run this exercise.

### Files created

- Installed `react-router` via `npm install react-router`.
- `main.jsx` — wrapped the app in `BrowserRouter`, enabling client-side routing based on the URL.
- `App.jsx` — replaced the single page with `Routes`/`Route` definitions for `/login`, `/app/dashboard`, and `/app/tickets`.
- `pages/LoginPage.jsx` / `pages/DashboardPage.jsx` — simple placeholder pages for now.
- `pages/TicketsPage.jsx` — moved all the Day 11 ticket UI (API info card, filter panel, list, detail) here, since it now lives at its own dedicated route instead of being the only content on the page.

### Output Screenshot

![Day 12 Exercise 01 Login Route](screenshots/day12_exercise1_login.png)
*GET /login shows the placeholder login page*

![Day 12 Exercise 01 Dashboard Route](screenshots/day12_exercise1_dashboard.png)
*GET /app/dashboard shows the header plus the placeholder dashboard page*

![Day 12 Exercise 01 Tickets Route](screenshots/day12_exercise1_tickets.png)
*GET /app/tickets shows the full Day 11 ticket UI, now living at its own route*

---

## Day 12 Exercise 02 - Create Nested App Layout

Run `npm run dev` inside `support-desk-ui` to run this exercise.

### Files created

- `AppShell.jsx` — the shared shell for all `/app/*` pages, with a header, a `NavLink`-based navigation bar, and an `Outlet` where the matching child route renders.
- `pages/ReportsPage.jsx` — a placeholder page for the new `/app/reports` route.
- `App.jsx` — restructured to use nested routing: `/app` renders `AppShell`, with `dashboard`, `tickets`, and `reports` as child routes rendered inside its `Outlet`, replacing the earlier approach of wrapping each page in `Layout` individually.
- `index.css` — added `.app-nav` styling, including the `.active` state React Router applies to whichever `NavLink` matches the current URL.

### Output Screenshot

![Day 12 Exercise 02 Dashboard](screenshots/day12_exercise2_dashboard.png)
*Dashboard tab active, nav bar and header stay fixed*

![Day 12 Exercise 02 Tickets](screenshots/day12_exercise2_tickets.png)
*Tickets tab active, showing the full Day 11 ticket UI inside the shared shell*

![Day 12 Exercise 02 Reports](screenshots/day12_exercise2_reports.png)
*Reports tab active, showing the new placeholder page*

---

## Day 12 Exercise 03 - Login Page and Auth Context

Run `npm run dev` inside `support-desk-ui` to run this exercise. Backend must be running on port 8080 for login to work.

### Files created/updated

- `context/AuthContext.jsx` — new `AuthProvider`/`useAuth` pair built with `createContext`/`useContext`. Holds the logged-in user, JWT token, and `isAuthenticated` flag in state, persists them to `localStorage` under `supportDeskAuth` so a refresh doesn't log the user out, and exposes `login(email, password)` (calls the backend, stores the response) and `logout()` (clears state and storage).
- `services/api.js` — added `loginRequest(email, password)`, a `POST /api/auth/login` call reusing the existing `parseJsonResponse()` helper so backend validation/auth errors surface as readable messages.
- `pages/LoginPage.jsx` — replaced the placeholder with a real controlled form (email + password), wired to `useAuth().login()`. Shows a loading state while the request is in flight, an `ErrorMessage` on failure (e.g. wrong credentials), and redirects to `/app/dashboard` (or back to whatever page the user was trying to reach) on success. Pre-fills the seeded admin credentials as a convenience. The password field has an eye-icon toggle button (inline SVG, no extra library) to show/hide the typed password instead of a plain "Show/Hide" text button.
- `components/AppShell.jsx` — added a `user-panel` in the header showing the logged-in user's name and role, plus a `Logout` button. Clicking it opens a `window.confirm()` dialog ("Are you sure you want to log out?") before calling `logout()` and navigating back to `/login`, so a logout can't happen from a single accidental click.
- `main.jsx` — wrapped `<App />` in `<AuthProvider>` (inside `BrowserRouter`) so every route can read auth state via `useAuth()`.
- `index.css` — added `.password-field`/`.password-toggle` (icon button positioned inside the input, centered, with a hover state) and `.user-panel` (name, role pill, logout button styling in the dark header).

### Output Screenshot

![Day 12 Exercise 03 Login Page](screenshots/day12_exercise3_loginPage.png)
*The login form pre-filled with the seeded admin credentials, password hidden by default*

![Day 12 Exercise 03 Logout](screenshots/day12_exercise3_logout.png)
*Clicking Logout in the header opens a confirmation dialog before actually logging out*

![Day 12 Exercise 03 Wrong Credential](screenshots/day12_exercise3_wrongCredential.png)
*An incorrect password shows an inline "Invalid email or password" error, with the password revealed via the eye icon*

---

## Day 12 Exercise 04 - Protect Ticket Pages

Run `npm run dev` inside `support-desk-ui` to run this exercise.

### Files created/updated

- `components/ProtectedRoute.jsx` — new gate component. Reads `isAuthenticated` from `useAuth()`; if there's no token it renders `<Navigate to="/login" state={{ from: location }} replace />` (stashing the attempted URL so `LoginPage` can redirect back after a successful login), otherwise it renders `<Outlet />` so the matched child route continues to render.
- `App.jsx` — wrapped the existing `/app` route (and its `dashboard`/`tickets`/`reports` children) in a path-less parent `<Route element={<ProtectedRoute />}>`, so all three pages now require a valid token before they'll render.

### Result

Navigating directly to `/app/tickets` (or `/app/dashboard`, `/app/reports`) while logged out immediately redirects to `/login`, confirmed by testing.

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

