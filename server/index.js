import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*", // Can restrict later to Vercel domain
  })
);

app.use(express.json());

// ---------------- OPENAI CLIENT ----------------
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
You are **YatraAI**, an expert Indian travel planner who creates plans exactly like a professional human travel consultant.

Create a **VERY DETAILED, WELL-SPACED, EASY-TO-READ travel plan**.

---

## 🧾 TRIP OVERVIEW
- **From:** ${from}
- **To:** ${to}
- **Departure Date:** ${departureDate || "User selected date"}
- **Return Date:** ${returnDate || "User selected date"}
- **Duration:** ${days} days
- **Budget:** ₹${budget}
- **Travel Type:** ${travelType}

---

## 🚆 STEP 1: ONWARD JOURNEY (${from} → ${to})

### 🚆 Train Options
Provide **2–3 realistic Indian Railways options**.  
For each option include:
- Train name & number  
- Departure & arrival time  
- Duration  
- Fare (General / Sleeper / 3A)  
- **Booking Platform:** IRCTC  

### 🚌 Bus Options
Provide **2–3 bus options**.  
Include:
- Bus operator name  
- Bus type (AC / Sleeper / Volvo)  
- Timing & duration  
- Fare  
- **Booking Platforms:** RedBus, AbhiBus  

---

## 🏨 STEP 2: STAY & HOTELS (Budget + Comfortable)

List **4–6 hotels**.

For each hotel include:
- **Hotel Name**
- Area & distance from main attractions
- Approx price per night
- Why it is good for this trip
- **Booking Platforms:** OYO, Booking.com, MakeMyTrip

---

## 🗺 STEP 3: DAY-WISE SIGHTSEEING PLAN

Create a **day-wise itinerary for EXACTLY ${days} days**.  
Do NOT add or remove days.

### Each day MUST include:
**Morning**
- Activities
- Best time to visit

**Afternoon**
- Sightseeing
- Lunch suggestions

**Evening**
- Walks / markets / viewpoints
- Sunset timing (if applicable)

**Tips**
- Crowd avoidance tips
- Time-saving tips
- Local transport advice

---

## ☕ STEP 4: CAFES & RESTAURANTS

List **5–7 popular and budget-friendly places**.

For each place include:
- What to try
- Approx cost for one
- **Platform:** Zomato / Google Maps

---

## 🌄 STEP 5: VIEWPOINTS & PHOTOGRAPHY TIPS

Include:
- Best sunrise & sunset points
- Golden hour timings
- Crowd-free time slots
- Seasonal weather tips

---

## 🔁 STEP 6: RETURN JOURNEY (${to} → ${from})

Provide:
- Train options
- Bus options
- Fare, timing & duration
- **Booking Platforms:** IRCTC, RedBus
- Best recommended option

---

## ⏱ STEP 7: SMART TIME & MONEY TIPS

Include:
- How to avoid rush
- Where to save money
- What to skip if short on time
- Local travel hacks

---

### ⚠️ IMPORTANT NOTE
⚠️ *Train/bus timings, fares, and hotel availability may vary. Always verify on official platforms before booking.*
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
