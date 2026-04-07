const express = require("express");
const User = require("../models/User");

const router = express.Router();

// SAVE PROBLEM
router.post("/", async (req, res) => {
  const { userId, problem } = req.body;

  if (!userId || !problem) {
    return res.json({ msg: "Missing data" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) return res.json({ msg: "User not found" });

    if (!user.savedProblems.includes(problem)) {
      user.savedProblems.push(problem);
      await user.save();
    }

    res.json({ msg: "Saved successfully" });

  } catch (err) {
    console.error(err);
    res.json({ msg: "Error saving" });
  }
});

// GET SAVED
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) return res.json({ savedProblems: [] });

    res.json({ savedProblems: user.savedProblems });

  } catch {
    res.json({ savedProblems: [] });
  }
});

// DELETE
router.post("/delete", async (req, res) => {
  const { userId, problem } = req.body;

  try {
    const user = await User.findById(userId);

    user.savedProblems = user.savedProblems.filter(p => p !== problem);

    await user.save();

    res.json({ msg: "Removed" });

  } catch {
    res.json({ msg: "Error deleting" });
  }
});

module.exports = router;