const Trip = require("../models/Trip");
const {
  generateTripPlan,
  regenerateDayPlan,
} = require("../services/geminiService");

// Start with CRUD before Gemini.

// genarate trip by ai

exports.generateTrip = async (req, res) => {
  try {
    const { destination, durationDays, budgetTier, interests } = req.body;

    const rawResponse = await generateTripPlan({
      destination,
      durationDays,
      budgetTier,
      interests,
    });

    const generatedData = JSON.parse(rawResponse);

    const trip = await Trip.create({
      userId: req.user.id,

      destination,
      durationDays,
      budgetTier,
      interests,

      itinerary: generatedData.itinerary,

      hotels: generatedData.hotels,

      estimatedBudget: generatedData.estimatedBudget,

      packingList: generatedData.packingList,
    });

    return res.status(201).json({
      success: true,
      trip,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// Create Trip

exports.createTrip = async (req, res) => {
  try {
    const { destination, durationDays, budgetTier, interests } = req.body;

    const trip = await Trip.create({
      userId: req.user.id,
      destination,
      durationDays,
      budgetTier,
      interests,
    });

    res.status(201).json(trip);
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// {
//     "userId": "6a377d6d0a8c1215334b4423",
//     "destination": "Japan",
//     "durationDays": 7,
//     "budgetTier": "Medium",
//     "interests": [
//         "Food",
//         "Nature",
//         "Photography"
//     ],
//     "_id": "6a379a0dc93223056dd16fa5",
//     "itinerary": [],
//     "hotels": [],
//     "packingList": [],
//     "createdAt": "2026-06-21T08:00:13.692Z",
//     "updatedAt": "2026-06-21T08:00:13.692Z",
//     "__v": 0
// }

// Get All Trips

exports.getTrips = async (req, res) => {
  try {
    const trips = await Trip.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(trips);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

//Get Single Trip

exports.getTrip = async (req, res) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip Not Found",
      });
    }

    res.json(trip);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// add activity controller

exports.addActivity = async (req, res) => {
  try {
    const { tripId } = req.params;
    const { dayNumber, title, description, estimatedCostUSD, timeOfDay } =
      req.body;
    const trip = await Trip.findOne({ _id: tripId, userId: req.user.id });

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    const day = trip.itinerary.find(
      (item) => item.dayNumber === Number(dayNumber),
    );

    if (!day) {
      return res.status(404).json({ message: "Day not found" });
    }

    day.activities.push({
      title,
      description,
      estimatedCostUSD,
      timeOfDay,
    });

    await trip.save();

    return res.status(200).json({
      success: true,
      trip,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

// remove activity controller

exports.removeActivity = async (req, res) => {
  try {
    const { tripId, activityId } = req.params;

    const trip = await Trip.findOne({ _id: tripId, userId: req.user.id });
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    let activityFound = false;

    trip.itinerary.forEach((day) => {
      const activity = day.activities.id(activityId);
      if (activity) {
        activity.deleteOne();
        activityFound = true;
      }
    });

    if (!activityFound) {
      return res.status(404).json({ message: "Activity not found" });
    }

    await trip.save();
    return res.status(200).json({
      success: true,
      trip,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message,
    });
  }
};

// regenerate day controller

exports.regenerateDay = async (req, res) => {
  try {
    const { tripId } = req.params;
    const { dayNumber, feedbcak } = req.body;
    const trip = await Trip.findOne({ _id: tripId, userId: req.user.id });
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    const rawResponse = await regenerateDayPlan({
      destination: trip.destination,
      budgetTier: trip.budgetTier,
      interests: trip.interests,
      dayNumber,
      feedbcak,
    });

    const cleanText = rawResponse
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const newDay = JSON.parse(cleanText);

    const dayIndex = trip.itinerary.findIndex(
      (day) => day.dayNumber === Number(dayNumber),
    );

    if (dayIndex === -1) {
      return res.status(404).json({ message: "Day not found" });
    }

    trip.itinerary[dayIndex] = newDay;

    await trip.save();
    return res.json({
      success: true,
      trip,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};



exports.togglePackingItem = async (req, res) => {
  try {
    const { tripId, itemId } = req.params;
    const { isPacked } = req.body;
    const trip = await Trip.findOne({ _id: tripId, userId: req.user.id });
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }
    const item = trip.packingList.id(itemId);
    if (!item) {
      return res.status(404).json({ message: "Packing item not found" });
    }

    item.isPacked = isPacked;
    await trip.save();
    return res.status(200).json({
      success: true,
      item,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};
