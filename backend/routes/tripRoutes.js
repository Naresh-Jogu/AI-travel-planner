const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const {
  createTrip,
  getTrip,
  getTrips,
  generateTrip,
  addActivity,
  removeActivity,
  regenerateDay,
  togglePackingItem,
} = require("../controllers/tripController");

// trip routes

router.post("/generate", auth, generateTrip);

router.post("/", auth, createTrip);

router.get("/", auth, getTrips);

router.get("/:id", auth, getTrip);

router.post("/:tripId/activity", auth, addActivity);

router.delete("/:tripId/activity/:activityId", auth, removeActivity);

router.post("/:tripId/regenerate-day", auth, regenerateDay);

router.patch("/:tripId/packing/:itemId", auth, togglePackingItem);

module.exports = router;
