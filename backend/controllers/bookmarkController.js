const User = require("../models/user");

exports.toggleBookmark = async (req, res) => {
  try {
    const userId = req.user.id;
    const storyId = req.params.id;

    const user = await User.findById(userId);

    const exists = user.bookmarks.includes(storyId);

    if (exists) {
      user.bookmarks.pull(storyId);
    } else {
      user.bookmarks.push(storyId);
    }

    await user.save();

    res.json({ message: "Bookmark updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getBookmarks = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("bookmarks");
    res.json(user.bookmarks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};