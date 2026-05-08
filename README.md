MERN Web Scraper — Hacker News App
A full-stack MERN application that scrapes top stories from Hacker News, stores them in MongoDB, and provides authentication, bookmarking, and story browsing.

Live demo
Features
Web scraper
Scrapes top 10 Hacker News stories
Extracts title, URL, points, author, time
Stores to MongoDB
Auto-runs on server start
Manual trigger via API
Authentication
Register & login
bcrypt password hashing
JWT-based sessions
Protected routes
Stories API
List all stories by points
Fetch single story by ID
Bookmarks
Toggle bookmarks per user
Stored in MongoDB
JWT-protected routes
Tech stack
Frontend
React.js Context API Axios Tailwind CSS
Backend
Node.js Express.js MongoDB Mongoose Cheerio JWT
API endpoints
Auth
POST
/api/auth/register
POST
/api/auth/login
Scraper
POST
/api/scrape
Stories
GET
/api/stories
GET
/api/stories/:id
Bookmarks
POST
/api/stories/:id/bookmark
GET
/api/users/bookmarks
Project structure
backend/
config/
controllers/
middleware/
models/
routes/
services/
server.js
app.js
frontend/src/
components/
context/
pages/
services/
App.jsx
Auth flow
1
User registers or logs in via /api/auth
2
Backend returns a signed JWT token
3
Token stored in frontend via Context / localStorage
4
All protected requests include Authorization: Bearer <token>
Example story object
{
  "title": "Example Story",
  "url": "https://example.com",
  "points": 120,
  "author": "user123",
  "postedAt": "3 hours ago"
}
