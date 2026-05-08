// controllers/scraperController.js
const scrapeHackerNews = require("../services/scraperService");
const Story = require("../models/story");

exports.runScraper = async (req, res) => {
  try {
    const stories = await scrapeHackerNews();

    await Story.deleteMany();
    await Story.insertMany(stories);

    res.json({ message: "Scraping successful", count: stories.length });
  } catch (error) {
    res.status(500).json({ error: "Scraping failed" });
  }
};