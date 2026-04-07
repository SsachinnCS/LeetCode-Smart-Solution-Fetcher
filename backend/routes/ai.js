const express = require("express");
const fetch = require("node-fetch");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { question, code } = req.body;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama3-70b-8192", // ✅ FIXED
        messages: [
          { role: "system", content: "You are a coding assistant." },
          { role: "user", content: `Code:\n${code}\n\nQuestion:\n${question}` }
        ]
      })
    });

    const data = await response.json();

    console.log("AI Response:", data);

    res.json({
      answer: data.choices?.[0]?.message?.content || "No response from AI"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI failed" });
  }
});

module.exports = router;