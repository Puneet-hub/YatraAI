import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ---------------- AI ROUTE ----------------
app.post("/generate-plan", async (req, res) => {
  const { from, to, budget, days, travelType, departureDate, returnDate } = req.body;

  try {
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

---

## 🚆🚌 STEP 1: Onward Journey (${from} → ${to})

### 🚆 Train Options
Provide 2–3 realistic Indian Railways options:

- **Train Name (Train Number)**
  - Departure Time:
  - Arrival Time:
  - Duration:
  - Fare:
    - General: ₹
    - Sleeper: ₹
    - 3A: ₹
  - Booking Platform: IRCTC

### 🚌 Bus Options
Provide 2–3 bus options:

- **Bus Operator**
  - Bus Type:
  - Departure Time:
  - Arrival Time:
  - Fare: ₹
  - Booking Platforms: RedBus, AbhiBus

---

## 🏨 STEP 2: Stay & Hotels (Budget + Comfortable)

List 4–6 stays from MULTIPLE platforms:

- **Hotel Name**
  - Area:
  - Approx Price/Night:
  - Why good for this trip:
  - Platforms: OYO, Booking.com, MakeMyTrip

---

## 🗺 STEP 3: Day-Wise Sightseeing Plan (VERY IMPORTANT)

Create a **day-wise itinerary for EXACTLY ${days} days**.

RULES:
- Generate **Day 1 to Day ${days} only**
- Do NOT add extra days
- Do NOT skip any day
- Keep it practical and realistic

Each day must include:
- Morning
- Afternoon
- Evening
- Best time to visit places
- Time-saving tips

Use this format:

### Day 1:
- Morning:
- Afternoon:
- Evening:
- Best time to visit places:
- Time-saving tips:

### Day 2:
(Same structure)

Continue until **Day ${days}**.


## ☕🍽 STEP 4: Cafes & Restaurants (Budget + Famous)

List BOTH budget-friendly and famous places:

- **Place Name**
  - Type: Cafe / Restaurant / Dhabha
  - Famous For:
  - Approx Cost for One:
  - Platform: Zomato / Google Maps

---

## 🌄 STEP 5: Best Viewpoints & Photography Tips
- Mention golden hour times
- Crowd-free time slots
- Weather tips

---

## 🔁 STEP 6: Return Journey (${to} → ${from})

Provide train + bus options in same detail as onward journey.

---

## ⏱ STEP 7: Time Management & Smart Tips
- How to avoid rush
- Where to save money
- What to skip if short on time

---

End with:
"⚠️ Note: Train/bus timings, fares, and hotel availability may vary. Always verify on official platforms before booking."
`;



    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // ✅ Best balance of cost + quality
      messages: [
        { role: "user", content: prompt }
      ],
    });

    res.json({
      source: "openai",
      plan: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("OPENAI ERROR:", error);
    res.status(500).json({
      error: error.message,
    });
  }
});

// ---------------- HEALTH CHECK ----------------
app.get("/", (req, res) => {
  res.send("YatraAI backend running with OpenAI");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
