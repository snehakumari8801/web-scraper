const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeHackerNews() {
  const { data } = await axios.get("https://news.ycombinator.com");
  const $ = cheerio.load(data);


  const stories = [];

  $(".athing").each((i, el) => {
    if (i >= 10) return false;

    const title = $(el).find(".titleline a").text();
    const url = $(el).find(".titleline a").attr("href");

    const subtext = $(el).next();

    const pointsText = subtext.find(".score").text();
    const points = parseInt(pointsText) || 0;

    const author = subtext.find(".hnuser").text();
    const postedAt = subtext.find(".age").text();

    stories.push({ title, url, points, author, postedAt });

  });
  return stories;
}

module.exports = scrapeHackerNews;