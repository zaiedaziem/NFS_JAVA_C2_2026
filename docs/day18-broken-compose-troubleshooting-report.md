# Docker Troubleshooting Report

Lab files: `broken-compose/compose.broken.yml` (untouched, intentionally broken),
`broken-compose/compose.fixed.yml` (the corrected version produced during this exercise).

Note: `broken-compose/.env.broken.example` was referenced throughout the exercise
instructions but never actually provided upstream by the trainer. It was recreated
here so the lab could be run at all — itself a small real-world lesson in "given"
material sometimes being incomplete.

The broken file was also adapted from the trainer's own reference project (root
`Dockerfile`/`frontend/`) to point at this project's real `support-desk-api`/
`support-desk-ui` instead, since that's what actually exists to troubleshoot.

## Problem 1

**Symptom:** `docker compose ... up --build` and even `docker compose ... ps` refused
to run anything at all — no containers were created, not even `mongo`.

**Command used:**
```bash
docker compose -f broken-compose/compose.broken.yml --env-file broken-compose/.env.broken ps
```

**Log or evidence:**
```text
service "frontend" depends on undefined service "api": invalid compose project
```

**Root cause:** `frontend`'s `depends_on` referenced a service named `api`, but no
service by that name exists in the file — the real backend service is named
`backend`. Compose validates the whole file's structure before starting anything,
so an invalid reference like this blocks the entire stack, not just the frontend.

**Fix:**
```yaml
depends_on:
  backend:
    condition: service_healthy
```

**Why the fix works:** `depends_on` must reference an actual service name defined
under `services:` in the same file. Once it pointed at the real name (`backend`),
Compose could build a valid startup order and the other two services were finally
able to start so the remaining bugs could even be observed.

## Problem 2

**Symptom:** With Problem 1 fixed, `mongo` came up healthy, but `backend` stayed
`unhealthy` and eventually blocked `frontend` from starting at all
(`dependency failed to start: container support-desk-api-lab is unhealthy`).

**Command used:**
```bash
docker compose -f broken-compose/compose.fixed.yml --env-file broken-compose/.env.broken logs backend
```

**Log or evidence:**
```text
com.mongodb.MongoSocketOpenException: Exception opening socket
Caused by: java.net.ConnectException: Connection refused
... clusterSettings={hosts=[localhost:27017] ...}
```

**Root cause:** the backend's `SPRING_MONGODB_URI` was set to
`mongodb://localhost:27017/support_desk_db`. Inside a container, `localhost` means
the container itself, not the `mongo` service — there is nothing listening on port
27017 inside the backend container, so every connection attempt is refused.

**Fix:**
```yaml
SPRING_MONGODB_URI: mongodb://mongo:27017/support_desk_db
```

**Why the fix works:** Compose gives every service a DNS entry matching its service
name, resolvable by every other service on the same network. `mongo` is the correct
hostname to reach the MongoDB container from `backend` — this is exactly why the
exercise's instruction to "use service names, not localhost" matters in practice,
not just in theory.

## Problem 3

**Symptom:** `frontend` never reached a `healthy` status, even after Problems 1 and
2 were fixed and the page loaded fine when opened directly in a browser.

**Command used:**
```bash
docker inspect support-desk-ui-lab --format '{{json .State.Health}}'
```
(this mirrors the same investigation done for the real `compose.yaml` back in
Day 18 Exercise 3, where the identical bug was first found)

**Log or evidence:**
```text
"Output":"wget: can't connect to remote host: Connection refused\n"
```
— but only when the healthcheck used `curl`, the container immediately failed with
`curl: not found`, since `nginx:1.27-alpine` doesn't ship `curl` by default.

**Root cause:** two stacked issues in the frontend healthcheck:
1. `test: ["CMD", "curl", "-f", "http://localhost/"]` — `curl` isn't installed in
   the Alpine-based Nginx image.
2. Even after switching to `wget` (which *is* available), using `http://localhost/`
   still failed — `wget` was resolving `localhost` to `::1` (IPv6) first, while
   Nginx only listens on `0.0.0.0:80` (IPv4-only).

**Fix:**
```yaml
test: ["CMD", "wget", "-q", "--spider", "http://127.0.0.1/"]
```

**Why the fix works:** `wget` ships with Alpine's BusyBox by default, so no image
change is needed. Using `127.0.0.1` explicitly sidesteps the ambiguous `localhost`
DNS resolution entirely, connecting straight to the IPv4 address Nginx is actually
listening on.

## A fourth thing worth noting (not a crash, a silent misconfiguration)

`compose.broken.yml` sets `APP_JWT_SECRET: ${JWT_SECRET}` as the backend's
environment variable — but the application only ever reads a variable named
`JWT_SECRET` (see `application.properties`: `app.jwt.secret=${JWT_SECRET:...}`).
Because that property has a built-in demo default, this bug does **not** crash the
app or show up in `docker compose ps`/`logs` at all — the backend just silently
signs tokens with the fallback demo secret instead of the one intended in `.env`.
This is arguably the most dangerous kind of bug in this lab: everything *looks*
fine (login still works, since the same wrong secret is used for both signing and
verifying), but the actual intended configuration was silently ignored. Fixed by
renaming the compose variable to match what the app actually reads:
```yaml
JWT_SECRET: ${JWT_SECRET}
```

## Final verification

- [x] Frontend loads (`http://localhost:5174`)
- [x] Login works (through the frontend's Nginx proxy, not the backend directly)
- [x] Backend health check works (`/api/health`)
- [x] Backend readiness check works (`/api/readiness`, `"database":"CONNECTED"`)
- [x] MongoDB container is running (`support-desk-mongo-lab`, healthy)
- [x] Backend can connect to MongoDB (confirmed via `/api/readiness`'s `ticketCount`)
- [x] Data can be reset with `down -v` (confirmed volume removal, then a fresh
      `ticketCount: 0` on the next `up`)

## Reflection questions

**1. Why should the backend use `mongo:27017` instead of `localhost:27017` inside Compose?**
Because `localhost` inside a container always refers to that container itself, never
another container. Compose's embedded DNS resolves each service's name (`mongo`) to
that service's actual container, on the shared network — that's the only way for
one container to reach another by name.

**2. Why is `APP_JWT_SECRET` required?** *(adapted: why does the env var name matter)*
Because the compose file and the application must agree on the exact variable name.
The app reads `JWT_SECRET`; setting a similarly-named but different variable
(`APP_JWT_SECRET`) doesn't get seen by the app at all — Spring Boot doesn't guess or
fuzzy-match names, and (as Problem 4 shows) a value with a working fallback can make
this kind of typo invisible instead of causing an obvious crash.

**3. Why is a health check not the same as "the container is running"?**
A container can be `Up` (the process started, hasn't crashed) while still being
completely broken for its actual job — e.g. the Nginx container was `Up` the whole
time in Problem 3, serving pages fine, while its healthcheck falsely reported it as
unhealthy. The reverse is also true: a container can appear "running" while its
main process is stuck, deadlocked, or unable to serve real requests. A health check
tests actual functional behaviour (can it respond correctly to a real request?),
which "is the process alive" cannot tell you on its own.

**4. Why should we use `docker compose logs` before randomly changing files?**
Because guessing wastes time and can introduce new bugs on top of existing ones.
Every problem in this lab had a specific, identifiable error message in the logs
(`Connection refused`, `service ... depends on undefined service`, `wget: can't
connect`) that pointed directly at the actual cause. Changing files without reading
the logs first would mean fixing things that aren't broken while leaving the real
cause untouched.

**5. Why is this troubleshooting skill useful before Day 19 and Day 20 capstone demos?**
Because a live demo is exactly the situation where things break in front of an
audience and there's no time to guess. Knowing how to read `ps`/`logs` output,
recognize `localhost`-vs-service-name issues, spot a misnamed environment variable,
and understand what `down -v` actually resets, means a demo-day failure becomes a
30-second fix instead of a derailed presentation.
