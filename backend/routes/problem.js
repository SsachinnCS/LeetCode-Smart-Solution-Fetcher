const express = require("express");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const router = express.Router();

router.get("/:name", async (req, res) => {
  try {
    const name = req.params.name.toLowerCase().replace(/\s+/g, "-");
    const lang = req.query.lang || "cpp";

    let ext = "cpp";
    let folder = "C++";

    if (lang === "java") { ext = "java"; folder = "Java"; }
    if (lang === "python") { ext = "py"; folder = "Python"; }

    const url = `https://raw.githubusercontent.com/kamyu104/LeetCode-Solutions/master/${folder}/${name}.${ext}`;

    const response = await fetch(url);

    if (!response.ok)
      return res.status(404).json({ msg: "Not found" });

    const code = await response.text();

    res.json({ code });

  } catch {
    res.status(500).json({ error: "Fetch error" });
  }
});

module.exports = router;