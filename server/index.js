import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*", // You can restrict later
  })
);

app.use(express.json());

// OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ---------------- AI ROUTE ----------------
app.post("/generate-plan", async (req, res) => {
  const {
    from,
    to,
    budget,
    days,
    travelType,
    departureDate,
    returnDate,
  } = req.body;

  const prompt = `
You are YatraAI — an expert Indian travel planner who plans trips step-by-step like a human travel expert.

Create a COMPLETE, DETAILED, EXPERIENCE-FOCUSED travel plan.

User Details:
From: ${from}
To: ${to}
Departure Date: ${departureDate || "User selected date"}
Return Date: ${returnDate || "User selected date"}
Budget: ₹${budget}
Travel Type: ${travelType}

IMPORTANT RULES:
- Output must be in MARKDOWN
- Be very detailed and practical
- Do NOT skip sightseeing, cafes, or experience details
- Include BOTH onward and return journey
- Mention booking platforms clearly by name (IRCTC, RedBus, OYO, Booking.com, Zomato, Google Maps)
- Mention BEST TIME to visit places for views and crowd avoidance
- Mention TIME MANAGEMENT tips

Create a day-wise itinerary for EXACTLY ${days} days.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({
      plan: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("OPENAI ERROR:", error?.status, error?.message);

    if (error.status === 429) {
      return res.status(429).json({
        error: "AI is busy right now. Please try again later.",
      });
    }

    res.status(500).json({
      error: "AI service failed. Please try again later.",
    });
  }
});

// ---------------- HEALTH CHECK ----------------
app.get("/", (req, res) => {
  res.send("YatraAI backend running with OpenAI");
});

// ---------------- SERVER ----------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
