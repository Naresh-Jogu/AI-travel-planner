const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    defualt: "",
  },
  estimatedCostUSD: {
    type: Number,
    default: 0,
  },
  timeOfDay: {
    type: String,
  },
});

const tripSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    destination: {
      type: String,
      required: true,
    },

    durationDays: {
      type: Number,
      required: true,
    },

    budgetTier: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
    },

    interests: [
      {
        type: String,
      },
    ],

    itinerary: [
      {
        dayNumber: Number,
        activities: [activitySchema],
      },
    ],

    hotels: [
      {
        name: String,
        tier: String,
        estimatedCostNightUSD: Number,
        rating: String,
      },
    ],

    esimatedBudget: {
      transport: Number,
      accomodation: Number,
      food: Number,
      activities: Number,
      total: Number,
    },

    packingList: [
      {
        item: String,
        category: {
          type: String,
        },

        isPacked: {
          type: Boolean,
          defualt: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Trip", tripSchema);
