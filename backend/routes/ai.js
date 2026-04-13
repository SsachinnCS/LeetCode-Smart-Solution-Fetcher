const express = require("express");
const fetch = require("node-fetch");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { question, code } = req.body;

const prompt = `
You are an expert DSA tutor.

Explain this code step by step.
Give intuition + time complexity.

Code:
${code}

Question:
${question}
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    console.log("Gemini Response:", data);

    const answer =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    res.json({
      answer: answer || "No response from Gemini"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI failed" });
  }
});

module.exports = router;



// const express = require("express");
// const fetch = require("node-fetch");

// const router = express.Router();

// router.post("/", async (req, res) => {
//   try {
//     const { question, code } = req.body;

//     const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
//         "Content-Type": "application/json",
//         "HTTP-Referer": "http://localhost", // required
//         "X-Title": "LeetCode Smart Hub"
//       },
//       body: JSON.stringify({
//         model: "meta-llama/llama-3-8b-instruct", // ✅ stable model
//         messages: [
//           {
//             role: "system",
//             content: "You are a helpful coding assistant."
//           },
//           {
//             role: "user",
//             content: `Code:\n${code}\n\nQuestion: ${question}`
//           }
//         ]
//       })
//     });

//     const data = await response.json();

//     console.log("OpenRouter Response:", data);

//     const answer = data?.choices?.[0]?.message?.content;

//     res.json({
//       answer: answer || "⚠️ No response from AI"
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "AI failed" });
//   }
// });

// module.exports = router;