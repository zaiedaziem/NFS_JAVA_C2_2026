# Day 17 Security Hardening Evidence

## 1. Authentication evidence

Test performed:

```http
GET /api/v1/tickets without a token
```

Expected result:

```text
401 Unauthorized
```

Evidence:

```text
HTTP/1.1 401
WWW-Authenticate: Bearer resource_metadata="http://localhost:8080/.well-known/oauth-protected-resource"
```

See [screenshots/day17_exercise3_401.png](../screenshots/day17_exercise3_401.png) — captured in Exercise 3.

## 2. Authorisation evidence

Test performed:

```text
A USER-role token (registered via /api/auth/register, default role USER) tries
POST /api/tickets, the legacy admin-only endpoint.
```

Expected result:

```text
403 Forbidden
```

Evidence:

```text
HTTP/1.1 403
WWW-Authenticate: Bearer error="insufficient_scope", error_description="The request
requires higher privileges than provided by the access token."
```

See [screenshots/day17_exercise3_403.png](../screenshots/day17_exercise3_403.png) — captured in Exercise 3.

## 3. Duplicate protection evidence

Test performed:

```text
POST /api/auth/register twice with the same email.
```

Expected result:

```text
409 Conflict
```

Evidence:

```json
HTTP/1.1 409
{
  "errors": [],
  "message": "Email already exists: testuser@example.com"
}
```

See [screenshots/day17_exercise3_409.png](../screenshots/day17_exercise3_409.png) — captured in Exercise 3.

## 4. Input validation evidence

Test performed:

```text
PUT /api/v1/tickets/{id} with priority: "URGENT" (not a valid enum value).
```

Expected result:

```text
400 Bad Request
```

Evidence:

```json
HTTP/1.1 400
{
  "errors": [
    { "field": "priority", "message": "Priority must be LOW, MEDIUM or HIGH" }
  ],
  "message": "Validation failed"
}
```

See [screenshots/day17_exercise3_400.png](../screenshots/day17_exercise3_400.png) — captured in Exercise 3.

## 5. Logging evidence

Confirmed logs do not show:

- Passwords — never logged anywhere in `AuthService`/`AuthController`.
- JWT tokens — never logged; `RequestTimingFilter` (Exercise 1) only logs method, path, status, and duration.
- Full Authorization headers — not logged.
- Secret keys — `app.jwt.secret` is never logged.

Safe log example, captured live from a real request:

```text
requestId=800986d8 method=GET path=/api/health status=200 durationMs=50
```

See [screenshots/day17_exercise1.png](../screenshots/day17_exercise1.png) — captured in Exercise 1.

## 6. Docker secret hygiene evidence

Confirmed these are not committed:

```bash
git ls-files | grep -iE "\.env$|\.env\.|secrets/|\.pem$|\.key$|id_rsa"
```

```text
.env.example
```

Only `.env.example` (a template with placeholder values, no real secrets) is tracked. The
root `.gitignore` explicitly excludes real secret files:

```text
.env
.env.*
!.env.example
*.pem
*.key
*.crt
*.p12
*.jks
*.keystore
secrets/
secret/
credentials/
credentials.json
service-account.json
```

`git status` on this branch is clean — no untracked `.env`, key, or credential files sitting
in the working directory either.
