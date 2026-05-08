
const app = require("./app");
const scrapeHackerNews = require("./services/scraperService");
const Story = require("./models/story");
const { default: connectDB } = require("./config/db");
require("dotenv").config()

async function startServer() {
  await connectDB();

  // Auto scrape
  const stories = await scrapeHackerNews();
  await Story.deleteMany();
  await Story.insertMany(stories);

  const port = process.env.PORT || 5000;

  app.listen(port, () => console.log(`Server running ${port}`));
}

startServer();