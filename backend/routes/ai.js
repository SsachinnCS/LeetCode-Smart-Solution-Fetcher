const express = require("express");
const OpenAI = require("openai");

const router = express.Router();

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});

router.post("/", async (req, res) => {
  const { question, code, history } = req.body;

  try {
    const response = await client.chat.completions.create({
      model: "llama-3.1-8b-instant", // ✅ working model
      messages: [
        { role: "system", content: "You are a coding assistant." },
        ...(history || []),
        {
          role: "user",
          content: `Code:\n${code}\n\nQuestion:\n${question}`
        }
      ]
    });

    res.json({
      answer: response.choices[0].message.content
    });

  } catch (err) {
    console.error("AI ERROR:", err.message);
    res.json({ error: err.message });
  }
});

module.exports = router;