const User = require("../models/User");

// 🔥 DASHBOARD
exports.getDashboard = async (req, res) => {
  try {
    const user = req.user;

    res.json({
      name: user.name,
      email: user.email,
      savedCount: user.savedItems.length,
      savedItems: user.savedItems,
      hours: user.readingHours,
      streak: user.streak,
    });
  } catch (err) {
    res.status(500).json({ message: "Dashboard error" });
  }
};

// 🔥 SAVE ITEM
exports.saveItem = async (req, res) => {
  try {
    const { title, type } = req.body;

    const user = req.user;

    const alreadyExists = user.savedItems.some(
      (item) => item.title === title
    );

    if (alreadyExists) {
      return res.json({ message: "Already saved" });
    }

    user.savedItems.push({ title, type });

    await user.save();

    res.json({ message: "Saved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Save error" });
  }
};

// 🔥 GET SAVED ITEMS
exports.getSavedItems = async (req, res) => {
  try {
    res.json(req.user.savedItems);
  } catch (err) {
    res.status(500).json({ message: "Error fetching saved items" });
  }
};

// 🔥 TRACK READING
exports.trackReading = async (req, res) => {
  try {
    const { minutes } = req.body;

    const user = req.user;

    user.readingHours += minutes;

    await user.save();

    res.json({ message: "Reading tracked" });
  } catch (err) {
    res.status(500).json({ message: "Tracking error" });
  }
};