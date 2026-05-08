const Story = require("../models/Story");
const User = require("../models/User");

// GET ALL STORIES
exports.getStories = async (req, res) => {
  try {
    const stories = await Story.find().sort({ points: -1 });
        // console.log(stories)

    res.status(200).json({
        message:"Fetch successfully",
        stories
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET SINGLE STORY
exports.getStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    res.json(story);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};