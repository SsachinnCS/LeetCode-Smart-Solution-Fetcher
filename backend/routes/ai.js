const express = require("express");
const fetch = require("node-fetch");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { question, code } = req.body;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-8b-8192", // ✅ fallback stable
        temperature: 0.7,
        max_tokens: 1024,
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

    console.log("AI Response FULL:", JSON.stringify(data, null, 2));

    if (data.error) {
      return res.json({
        answer: "⚠️ AI model issue. Please try again later."
      });
    }

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