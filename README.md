📌 MERN Web Scraper – Hacker News App

A full-stack MERN application that scrapes top stories from Hacker News, stores them in MongoDB, and provides authentication, bookmarking, and story browsing features.

🚀 Live Demo

🔗 https://web-scraper-front.onrender.com/

✨ Features
🔹 Web Scraper
Scrapes top 10 stories from Hacker News
Extracts:
Title
URL
Points
Author
Posted Time
Stores data in MongoDB
Runs automatically on server start
Manual trigger API:
POST /api/scrape
🔐 Authentication (JWT)
User Registration
User Login
Password hashing using bcrypt
JWT-based authentication system
📚 Stories API
GET /api/stories
GET /api/stories/:id
Functionality:
Fetch all stories (sorted by points descending)
Fetch single story by ID
🔖 Bookmark System
POST /api/stories/:id/bookmark
GET /api/users/bookmarks
Features:
Toggle bookmark for stories
Store bookmarks per user in MongoDB
Protected routes using JWT authentication
💻 Frontend Features
Fully responsive UI (mobile + desktop)
Login & Register pages
Stories listing page
Single story details page
Bookmark system
Protected routes using React Context API
🏗️ Tech Stack
Frontend
React.js
Context API
Axios
Tailwind CSS
Backend
Node.js
Express.js
MongoDB + Mongoose
JWT Authentication
Cheerio (Web Scraping)
Axios
📁 Project Structure
backend/
  config/
  controllers/
  middleware/
  models/
  routes/
  services/
  server.js
  app.js

frontend/
  src/
    components/
    context/
    pages/
    services/
    App.jsx
🔗 API Endpoints
🔐 Auth
POST /api/auth/register
POST /api/auth/login
🕷️ Scraper
POST /api/scrape
📚 Stories
GET /api/stories
GET /api/stories/:id
🔖 Bookmarks
POST /api/stories/:id/bookmark
GET /api/users/bookmarks
🔐 Authentication Flow
User registers or logs in
Backend returns JWT token
Token stored in frontend (Context / localStorage)
Token sent in API headers:
Authorization: Bearer <token>
🧠 Scraper Logic
Fetch HTML from Hacker News
Parse using Cheerio
Extract top 10 stories
Store data in MongoDB
Runs automatically on server start OR manually via API
📊 Example Data
{
  "title": "Example Story",
  "url": "https://example.com",
  "points": 120,
  "author": "user123",
  "postedAt": "3 hours ago"
}
🚀 Summary

This project demonstrates:

Full-stack MERN development
REST API design
Authentication system (JWT)
Web scraping using Cheerio
MongoDB data modeling
React state management
Protected routes & user system
👨‍💻 Author

Built as part of a MERN assignment project.
