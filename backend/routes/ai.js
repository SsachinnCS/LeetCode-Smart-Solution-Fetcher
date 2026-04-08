const express = require("express");
const fetch = require("node-fetch");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { question, code } = req.body;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost", // required
        "X-Title": "LeetCode Smart Hub"
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3-8b-instruct", // ✅ stable model
        messages: [
          {
            role: "system",
            content: "You are a helpful coding assistant."
          },
          {
            role: "user",
            content: `Code:\n${code}\n\nQuestion: ${question}`
          }
        ]
      })
    });

    const data = await response.json();

    console.log("OpenRouter Response:", data);

    const answer = data?.choices?.[0]?.message?.content;

    res.json({
      answer: answer || "⚠️ No response from AI"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI failed" });
  }
});

module.exports = router;