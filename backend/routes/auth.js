const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashed,
      savedProblems: []
    });

    await user.save();

    res.json({ msg: "Signup successful" });
  } catch {
    res.status(500).json({ error: "Signup failed" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.json({ error: "Wrong password" });

    res.json({ userId: user._id });
  } catch {
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;