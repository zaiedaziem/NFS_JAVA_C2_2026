# Day 17 Performance and Index Tuning Notes

## Fields used for filtering

| Field | Used by | Currently indexed? |
|---|---|---|
| `status` | `getFilteredTickets` (`GET /api/v1/tickets?status=`), frontend status dropdown | Yes (`@Indexed`) |
| `priority` | `getFilteredTickets` (`GET /api/v1/tickets?priority=`), frontend priority dropdown | Yes (`@Indexed`) |
| `category` | `getFilteredTickets` (`GET /api/v1/tickets?category=`) | Yes (`@Indexed`) |

`getFilteredTickets` only applies one filter at a time (status, then priority, then category — see `TicketService.java`), so there's no current need for a compound index across all three.

## Fields used for sorting

| Field | Used by | Currently indexed? |
|---|---|---|
| `createdAt` | `getTicketsPaged` default sort (`TicketDataContext`'s `pageInfo.sortBy` starts as `createdAt`) | Yes (`@Indexed`) |
| `status` | Sort dropdown option in `TicketDataControls.jsx` | Yes (`@Indexed`) |
| `category` | Sort dropdown option | Yes (`@Indexed`) |
| `priority` | Sort dropdown option | Yes (`@Indexed`) |
| `title` | Sort dropdown option | **No index** — sorting by title would currently do a full in-memory sort |

## Fields that should be unique

None currently. Unlike `AppUser.email` (`@Indexed(unique = true)`), the `Ticket` model has no business-level unique key — a ticket "number" the exercise asks us to think about doesn't exist yet, only MongoDB's own generated `_id`. If a human-readable ticket number were added later (e.g. `TICKET-0042`), it should get a unique index, the same way `email` does on `AppUser`.

## Fields used in reports

| Field | Used by |
|---|---|
| `status` | `TicketReportService.countTicketsByStatus()` — aggregation `$group` key |
| `priority` | `TicketReportService.countTicketsByPriority()` — aggregation `$group` key |

Both are already indexed, which helps the `$group` stage avoid a full collection scan when selecting the grouping field's values.

## Evidence: current indexes (via mongosh)

```text
mongosh "mongodb://localhost:27017/test" --eval "db.tickets.getIndexes()"

[
  { v: 2, key: { _id: 1 }, name: '_id_' },
  { v: 2, key: { category: 1 }, name: 'category' },
  { v: 2, key: { priority: 1 }, name: 'priority' },
  { v: 2, key: { status: 1 }, name: 'status' },
  { v: 2, key: { createdBy: 1 }, name: 'createdBy' },
  { v: 2, key: { createdAt: 1 }, name: 'createdAt' }
]
```

This confirms every field marked `@Indexed` in `Ticket.java` (`category`, `priority`, `status`, `createdBy`, `createdAt`) actually has a real MongoDB index, created automatically by `spring.data.mongodb.auto-index-creation=true`.

**Unexpected finding**: the indexes above were found in the `test` database, not `support_desk_db` as configured in `application.properties` (`spring.data.mongodb.uri=mongodb://localhost:27017/support_desk_db`). The `support_desk_db` database doesn't exist on this machine at all — `tickets`/`users` data has been accumulating in `test` instead. This is a local environment/config discrepancy worth investigating separately; it doesn't affect index correctness (the same `@Indexed` annotations apply regardless of database name), but it means anyone connecting directly via mongosh/Compass needs to know to look in `test`, not `support_desk_db`.

## Timing examples

Measured directly with `curl -w`, backend already warmed up and running:

| Endpoint | Status | Duration | Interpretation |
|---|---:|---:|---|
| `GET /api/v1/tickets/paged` (no/invalid token) | 401 | 12 ms | Fast — Spring Security rejects before hitting the database |
| `GET /api/readiness` | 200 | 15 ms | Fast — single `count()` call |
| `POST /api/auth/login` | 200 | 126 ms | Slower — BCrypt password verification is intentionally expensive (this is expected, not a problem) |
| `GET /api/v1/tickets/paged` (valid token) | 200 | 80 ms | Normal — indexed sort field (`createdAt`), small page size |

All four are well within normal range for a local MongoDB instance with a small dataset. Nothing here suggests a missing index is causing a slowdown.
