const express = require("express");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const router = express.Router();

router.get("/:name", async (req, res) => {
  try {
    const name = req.params.name.toLowerCase();
    const lang = req.query.lang || "cpp";

    const map = {
      cpp: { folder: "C++", ext: "cpp" },
      java: { folder: "Java", ext: "java" },
      python: { folder: "Python", ext: "py" }
    };

    const { folder, ext } = map[lang] || map["cpp"];

    const url = `https://raw.githubusercontent.com/kamyu104/LeetCode-Solutions/master/${folder}/${name}.${ext}`;

    const response = await fetch(url);

    if (!response.ok) {
      return res.json({ msg: "Not found" });
    }

    const data = await response.text();

    res.json({ code: data });

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;