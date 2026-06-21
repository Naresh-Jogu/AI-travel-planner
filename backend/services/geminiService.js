const { GoogleGenAI } = require("@google/genai");

const withRetry = require("../utils/retry");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});



const generateTripPlan = async ({
  destination,
  durationDays,
  budgetTier,
  interests,
}) => {
  const prompt = `
Create a detailed travel itinerary.

Destination: ${destination}
Duration: ${durationDays} days
Budget Tier: ${budgetTier}
Interests: ${interests.join(", ")}

Return ONLY valid JSON.

{
  "itinerary": [
    {
      "dayNumber": 1,
      "activities": [
        {
          "title": "Activity Name",
          "description": "Activity Description",
          "estimatedCostUSD": 20,
          "timeOfDay": "Morning"
        }
      ]
    }
  ],
  "hotels": [
    {
      "name": "Hotel Name",
      "tier": "Medium",
      "estimatedCostNightUSD": 100,
      "rating": "4.5/5"
    }
  ],
  "estimatedBudget": {
    "transport": 100,
    "accommodation": 400,
    "food": 200,
    "activities": 100,
    "total": 800
  },
  "packingList": [
    {
      "item": "Passport",
      "category": "Documents",
      "isPacked": false
    }
  ]
}

IMPORTANT:
- Return JSON only
- No markdown
- No code blocks
- No explanation
- Activities must be objects
- Use dayNumber not day
`;

  const response = await withRetry(async () => {
    return await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
  });

  return response.text;
};

const regenerateDayPlan = async ({
  destination,
  budgetTier,
  interests,
  dayNumber,
  feedback,
}) => {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const prompt = `Destination: ${destination}

Budget Tier: ${budgetTier}

Interests: ${interests.join(", ")}

Day Number: ${dayNumber}

User Feedback:
${feedback}

Generate ONLY this day's itinerary.

Return JSON:

{
  "dayNumber": ${dayNumber},
  "activities": [
    {
      "title": "Activity",
      "description": "Description",
      "estimatedCostUSD": 25,
      "timeOfDay": "Morning"
    }
  ]
}

Return JSON only.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
};

module.exports = { generateTripPlan, regenerateDayPlan };
