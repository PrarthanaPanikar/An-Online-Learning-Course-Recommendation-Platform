# Architecture Documentation

## User Workflow

```
Register → Login → Profile (interests/skills) → Browse courses
    → Recommendations (home / skill-gap / similar)
    → Enroll → Track lessons & progress → Dashboard
```

## API Flow (Enrollment + Recommendation)

```
Client                    API                         Database
  |                        |                              |
  |-- POST /auth/login --->|                              |
  |<-- JWT + user ---------|                              |
  |                        |                              |
  |-- GET /recommendations/home (Bearer) -->              |
  |                        |-- find courses ------------->|
  |                        |-- find enrollments -------->|
  |                        |-- rankCourses()            |
  |<-- ranked list --------|                              |
  |                        |                              |
  |-- POST /enrollments -->|-- create enrollment ------->|
  |                        |-- increment enrollCount -->|
```

## Database Collections

| Collection | Purpose |
|------------|---------|
| users | Auth, interests, skills, targetSkills |
| courses | Catalog, lessons, tags, skills |
| enrollments | user ↔ course, progressPercent, status |
| progresses | Per-lesson completion |
| interactions | Events for future ML (view, enroll, finish_lesson) |

## Recommendation Engine (server/utils/recommendationEngine.js)

1. **Content score** — overlap between user profile and course metadata
2. **Collaborative score** — co-enrollment frequency across all users
3. **Skill-gap score** — courses teaching `targetSkills - skills`
4. **Hybrid rank** — weighted sum, exclude enrolled, fallback to popular
