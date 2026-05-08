# 📌 MERN Web Scraper — Hacker News App

> A full-stack MERN application that scrapes top stories from Hacker News, stores them in MongoDB, and provides authentication, bookmarking, and story browsing features.

🚀 **Live Demo:** [https://web-scraper-front.onrender.com/](https://web-scraper-front.onrender.com/)

---

## ✨ Features

### 🔹 Web Scraper
- Scrapes top 10 stories from Hacker News
- Extracts: Title, URL, Points, Author, Posted Time
- Stores data in MongoDB
- Runs automatically on server start
- Manual trigger API: `POST /api/scrape`

### 🔐 Authentication (JWT)
- User Registration & Login
- Password hashing using bcrypt
- JWT-based authentication system
- Protected routes

### 📚 Stories API
- `GET /api/stories` — Fetch all stories (sorted by points)
- `GET /api/stories/:id` — Fetch single story by ID

### 🔖 Bookmark System
- Toggle bookmark for stories
- Store bookmarks per user in MongoDB
- Protected routes using JWT authentication

### 💻 Frontend Features
- Fully responsive UI (mobile + desktop)
- Login & Register pages
- Stories listing & single story detail pages
- Bookmark system
- Protected routes using React Context API

---

## 🏗️ Tech Stack

| Layer     | Technologies                                      |
|-----------|---------------------------------------------------|
| Frontend  | React.js, Context API, Axios, Tailwind CSS        |
| Backend   | Node.js, Express.js, MongoDB, Mongoose, JWT, Cheerio |

---

## 📁 Project Structure

```
backend/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── server.js
└── app.js

frontend/src/
├── components/
├── context/
├── pages/
├── services/
└── App.jsx
```

---

## 🔗 API Endpoints

### 🔐 Auth
| Method | Endpoint              |
|--------|-----------------------|
| POST   | `/api/auth/register`  |
| POST   | `/api/auth/login`     |

### 🕷️ Scraper
| Method | Endpoint      |
|--------|---------------|
| POST   | `/api/scrape` |

### 📚 Stories
| Method | Endpoint           |
|--------|--------------------|
| GET    | `/api/stories`     |
| GET    | `/api/stories/:id` |

### 🔖 Bookmarks
| Method | Endpoint                    |
|--------|-----------------------------|
| POST   | `/api/stories/:id/bookmark` |
| GET    | `/api/users/bookmarks`      |

---

## 🔐 Authentication Flow

1. User registers or logs in
2. Backend returns a signed JWT token
3. Token stored in frontend (Context / localStorage)
4. Token sent in all protected API requests:
   ```
   Authorization: Bearer <token>
   ```

---

## 🧠 Scraper Logic

1. Fetch HTML from Hacker News
2. Parse using Cheerio
3. Extract top 10 stories
4. Store data in MongoDB
5. Runs on server start OR manually via `POST /api/scrape`

---

## 📊 Example Story Object

```json
{
  "title": "Example Story",
  "url": "https://example.com",
  "points": 120,
  "author": "user123",
  "postedAt": "3 hours ago"
}
```

---

## 🚀 What This Project Demonstrates

- Full-stack MERN development
- REST API design
- JWT authentication system
- Web scraping using Cheerio
- MongoDB data modeling
- React state management with Context API
- Protected routes & user system

---

## 👨‍💻 Author

Built as part of a MERN assignment project.
