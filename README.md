# Online Learning & Course Recommendation Platform

A full-stack **MERN** EdTech platform where learners browse courses, enroll, track progress, and receive **personalized recommendations** powered by a **hybrid recommender** (content-based + collaborative filtering).

![MERN](https://img.shields.io/badge/Stack-MERN-green)
![React](https://img.shields.io/badge/React-18-blue)
![Node](https://img.shields.io/badge/Node-Express-lightgrey)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green)

## Problem Statement

Learners on online platforms often face **choice overload**—hundreds of courses with no clear path. This project solves discovery and engagement by matching courses to **interests**, **skills**, and **learning behavior**, while tracking enrollment and progress.

## Features

- User registration & JWT authentication
- Profile setup (interests, skills, target skills)
- Course catalog with search & filters
- Course detail with lessons
- Enrollment management
- Progress tracking (per lesson & overall %)
- **3 recommendation surfaces:**
  - **For You** — home feed (content + collaborative + skill gap)
  - **Because you watched…** — similar courses on course page
  - **Skill-gap** — courses covering missing target skills
- Interaction tracking (views, enrolls, lesson completion)
- Responsive UI with Tailwind CSS

## Recommendation Logic

| Type | Method |
|------|--------|
| Content-based | Match user `interests`, `skills` with course `category`, `tags`, `skills` |
| Collaborative | Co-enrollment: users who took your courses also took X |
| Skill-gap | `targetSkills` minus current `skills` → rank courses teaching gaps |
| Similar items | Jaccard similarity on tags/skills/category vs seed course |
| Exclusions | Already enrolled courses removed from results |

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, Vite, React Router, Tailwind CSS, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT (Bearer token) |
| API | REST |

## Architecture

```
┌─────────────┐     REST/JWT      ┌─────────────┐     Mongoose     ┌─────────────┐
│   React     │ ◄──────────────► │   Express   │ ◄──────────────► │   MongoDB   │
│   (Vite)    │   localhost:5173 │   :5000     │                  │             │
└─────────────┘                  └─────────────┘                  └─────────────┘
                                        │
                                        ▼
                              recommendationEngine.js
                              (content + collaborative)
```

## Folder Structure

```
Online-Learning-Course-Recommendation-Platform/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Navbar, CourseCard, RecommendedCourses
│   │   ├── pages/          # Login, Dashboard, Courses, etc.
│   │   ├── context/        # AuthContext
│   │   └── services/       # API client (axios)
│   └── package.json
├── server/                 # Express backend
│   ├── config/             # DB connection
│   ├── models/             # User, Course, Enrollment, Progress, Interaction
│   ├── routes/             # API routes
│   ├── controllers/        # Business logic
│   ├── middleware/         # JWT auth, error handler
│   ├── utils/              # Seed data, recommendation engine
│   └── package.json
├── docs/                   # Architecture & interview prep
├── README.md
└── .gitignore
```

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register user | No |
| POST | `/api/auth/login` | Login | No |
| GET | `/api/auth/me` | Current user | Yes |
| PUT | `/api/auth/profile` | Update interests/skills | Yes |
| GET | `/api/courses` | List courses (search/filter) | No |
| GET | `/api/courses/:id` | Course details | No |
| POST | `/api/enrollments` | Enroll in course | Yes |
| GET | `/api/enrollments/my` | My enrollments | Yes |
| PUT | `/api/progress` | Update progress | Yes |
| GET | `/api/recommendations/home` | For You feed | Yes |
| GET | `/api/recommendations/similar/:courseId` | Similar courses | Yes |
| GET | `/api/recommendations/skill-gap` | Skill-gap courses | Yes |
| POST | `/api/interactions` | Track view/enroll/etc. | Yes |

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/try/download/community) (local) or [MongoDB Atlas](https://www.mongodb.com/atlas)

## Installation & Run

### 1. Clone & install

```bash
# Backend
cd server
npm install
cp .env.example .env   # Windows: copy .env.example .env
# Edit .env with your MONGODB_URI and JWT_SECRET

# Frontend
cd ../client
npm install
cp .env.example .env   # optional; default API URL works with Vite proxy
```

### 2. Seed database

```bash
cd server
npm run seed
```

### 3. Start servers

**Terminal 1 — Backend:**
```bash
cd server
npm run dev
# → http://localhost:5000
```

**Terminal 2 — Frontend:**
```bash
cd client
npm run dev
# → http://localhost:5173
```

### 4. Demo account

| Email | Password |
|-------|----------|
| demo@learner.com | demo123 |

## Environment Variables

**server/.env**
```
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/online_learning_platform
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
```

**client/.env** (optional)
```
VITE_API_URL=http://localhost:5000/api
```

> Never commit `.env` files. Use `.env.example` in GitHub.

## Screenshots

Add screenshots to `docs/screenshots/` and reference them here:

| Page | File |
|------|------|
| Register | `register.png` |
| Login | `login.png` |
| Dashboard | `dashboard.png` |
| Course listing | `courses.png` |
| Course detail + similar | `course-detail.png` |
| Recommendations | `recommendations.png` |
| Enrolled | `enrolled.png` |
| Progress | `progress.png` |
| MongoDB data | `mongodb.png` |
| API test (Postman) | `api-test.png` |

## Learning Outcomes

- Full-stack MERN development
- REST API design & JWT authentication
- MongoDB schema design & relationships
- Hybrid recommendation systems (content + collaborative)
- React state management & protected routes
- GitHub portfolio presentation

## License

MIT — free for learning and portfolio use.

## Author

Built as a Full Stack Development course project for GitHub portfolio and interview preparation.
