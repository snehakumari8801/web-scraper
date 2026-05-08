const express = require("express");
const router = express.Router();

const authCtrl = require("../controllers/authController");
const storyCtrl = require("../controllers/storyController");
const bookmarkCtrl = require("../controllers/bookmarkController");
const { auth } = require("../middleware/auth");
const { runScraper } = require("../controllers/scraperController");

// AUTH
router.post("/auth/register", authCtrl.register);
router.post("/auth/login", authCtrl.login);

//
router.post("/scrape", runScraper);

// STORIES
router.get("/stories", storyCtrl.getStories);
router.get("/stories/:id", storyCtrl.getStory);

// BOOKMARK
router.post("/stories/:id/bookmark", auth, bookmarkCtrl.toggleBookmark);
router.get("/users/bookmarks", auth, bookmarkCtrl.getBookmarks);

module.exports = router;