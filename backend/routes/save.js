const express = require("express");
const User = require("../models/User");

const router = express.Router();

// SAVE
router.post("/", async (req, res) => {
  const { userId, problem } = req.body;

  const user = await User.findById(userId);

  if (!user.savedProblems.includes(problem)) {
    user.savedProblems.push(problem);
    await user.save();
  }

  res.json({ msg: "Saved" });
});

// GET ALL
router.get("/:userId", async (req, res) => {
  const user = await User.findById(req.params.userId);
  res.json({ savedProblems: user.savedProblems });
});

// DELETE
router.post("/delete", async (req, res) => {
  const { userId, problem } = req.body;

  const user = await User.findById(userId);

  user.savedProblems = user.savedProblems.filter(p => p !== problem);
  await user.save();

  res.json({ msg: "Deleted" });
});

module.exports = router;