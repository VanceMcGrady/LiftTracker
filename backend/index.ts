import dotenv from "dotenv";
import express from "express";
import axios from "axios";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Endpoint to generate a workout plan
app.post("/generate-workout", async (req, res) => {
  const { fitnessLevel, goals } = req.body;

  const prompt = `Generate a 7-day workout plan for a ${fitnessLevel} user focusing on ${goals}. Return the response as a JSON object.`;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const workoutPlan = response.data.choices[0].message.content;
    res.json({ workoutPlan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate workout plan" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
