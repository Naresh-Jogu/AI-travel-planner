const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");

dotenv.config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const tripRoutes = require("./routes/tripRoutes");



const app = express();

// Database Connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

app.get("/test-gemini", async (req, res) => {
  try {
    const { GoogleGenAI } = require("@google/genai");

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Say hello in one sentence",
    });

    res.json({
      text: response.text,
    });
  } catch (error) {
    console.error("GEMINI TEST ERROR:", error);

    res.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.use("/api/trips", tripRoutes);

// Test Route
// app.get("/", (req, res) => {
//   res.json({ success: true, message: "AI Travel Planner API Running" });
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
