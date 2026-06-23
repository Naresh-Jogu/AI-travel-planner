"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Plane,
  Hotel,
  CalendarDays,
  Briefcase,
  Plus,
  RefreshCcw,
} from "lucide-react";
import { motion } from "framer-motion";
import TripSkeleton from "@/components/TripSkeleton";

import api from "@/utils/api";
import toast from "react-hot-toast";

export default function TripDetailsPage() {
  const [regeneratingDay, setRegeneratingDay] = useState(null);
  const { id } = useParams();

  const [trip, setTrip] = useState(null);

  useEffect(() => {
    if (id) {
      fetchTrip();
    }
  }, [id]);

  const fetchTrip = async () => {
    try {
      console.log("Trip ID:", id);
      const response = await api.get(`/trips/${id}`);

      console.log("RESPONSE:", response.data);

      setTrip(response.data.trip);
    } catch (error) {
      console.error(error);
    }
  };

  if (!trip) {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-6">
        <TripSkeleton />
      </div>
    );
  }

  const togglePackingItem = async (itemId, currentValue) => {
    try {
      await api.patch(`/trips/${trip._id}/packing/${itemId}`, {
        isPacked: !currentValue,
      });

      fetchTrip();
    } catch (error) {
      console.error(error);
    }
  };

  const addActivity = async (dayNumber) => {
    try {
      const title = prompt("Activity Title");

      if (!title) return;

      const description = prompt("Activity Description") || "";

      const estimatedCostUSD = prompt("Estimated Cost") || "0";

      const timeOfDay =
        prompt("Time Of Day (Morning/Afternoon/Evening)") || "Morning";

      await api.post(`/trips/${trip._id}/activity`, {
        dayNumber,
        title,
        description,
        estimatedCostUSD: Number(estimatedCostUSD),
        timeOfDay,
      });

      fetchTrip();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteActivity = async (activityId) => {
    try {
      await api.delete(`/trips/${trip._id}/activity/${activityId}`);
      fetchTrip();
    } catch (error) {
      console.error(error);
    }
  };

  // const regenerateDay = async (dayNumber) => {
  //   try {
  //     await api.post(`/trips/${trip._id}/regenerate-day`, {
  //       dayNumber,
  //       feedback: "",
  //     });

  //     fetchTrip();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const regenerateDay = async (dayNumber) => {
    try {
      setRegeneratingDay(dayNumber);

      await api.post(`/trips/${trip._id}/regenerate-day`, {
        dayNumber,
      });

      fetchTrip();

      toast.success("Day regenerated successfully");
    } catch (error) {
      console.error(error);

      toast.error("Failed to regenerate day");
    } finally {
      setRegeneratingDay(null);
    }
  };

  const groupedPackingItems = trip.packingList.reduce((groups, item) => {
    if (!groups[item.category]) {
      groups[item.category] = [];
    }

    groups[item.category].push(item);

    return groups;
  }, {});

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="min-h-screen bg-slate-950 text-white px-4 md:px-8 lg:px-4"
    >
      {/* Hero Section*/}
      <div className="bg-linear-to-r from-slate-900 to-slate-800 border border-slate-800 rounded-0xl p-6">
        <div className="flex items-center gap-3 mb-3 text-white">
          <Plane size={36} />

          <h1 className="text-4xl md:text-5xl font-bold">{trip.destination}</h1>
        </div>

        <p className="text-slate-300 max-w-2xl mt-2 mb-2">
          AI-generated travel itinerary with hotels, activities, budget planning
          and packing checklist.
        </p>

        <p className="text-slate-400 text-lg">
          {trip.durationDays} Days •
          <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full ml-2 text-sm">
            {trip.budgetTier} Budget
          </span>{" "}
        </p>

        <div className="flex flex-wrap gap-2 mt-5">
          {trip.interests.map((interest) => (
            <span
              key={interest}
              className="bg-blue-500/20 px-3 py-1 rounded-full text-sm font-medium text-white"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

      {/* Stats Section*/}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.2,
        }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 mt-4 ml-4 mr-4"
      >
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5">
          <div className="flex items-center gap-3">
            <Hotel className="text-blue-400" />

            <div>
              <p className="text-slate-400">Hotels</p>

              <h2 className="text-4xl font-bold text-white">
                {trip.hotels.length}
              </h2>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5">
          <div className="flex items-center gap-3">
            <CalendarDays className="text-green-400" />

            <div>
              <p className="text-slate-400">Days</p>

              <h2 className="text-4xl font-bold text-white">
                {trip.durationDays}
              </h2>
            </div>
          </div>
        </div>

        <div
          className="bg-slate-900 border border-slate-800 rounded-3xl p-5
        "
        >
          <div className="flex items-center gap-3">
            <Briefcase className="text-purple-400" />

            <div>
              <p className="text-slate-400">Packing Items</p>

              <h2 className="text-4xl font-bold text-white">
                {trip.packingList.length}
              </h2>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Hotels Section*/}

      <h2 className="text-3xl font-bold mt-10 mb-6 ml-2">Recommended Hotels</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 p-2">
        {trip.hotels.map((hotel) => (
          <motion.div
            key={hotel._id}
            whileHover={{
              y: -5,
              scale: 1.02,
            }}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-blue-500 transition"
          >
            <h3 className="text-xl font-bold mb-3">🏨 {hotel.name}</h3>
            <p className="text-yellow-400 mb-2">⭐ {hotel.rating}</p>
            <p className="text-green-400 mb-2">
              ${hotel.estimatedCostNightUSD}/night
            </p>
            <span className="inline-block mt-2 bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
              {hotel.tier} Tier
            </span>
          </motion.div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4 ml-2">Itinerary</h2>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 mb-6">
        {trip.itinerary.map((day) => (
          <motion.div
            key={day._id}
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mb-6"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
              <h3 className="text-2xl font-bold">Day {day.dayNumber}</h3>

              <div className="flex gap-3 mt-4 md:mt-0">
                <button
                  onClick={() => addActivity(day.dayNumber)}
                  className=" bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition"
                >
                  <Plus size={16} />
                </button>

                <button
                  onClick={() => regenerateDay(day.dayNumber)}
                  className=" bg-blue-600 hover:bg-blue-700  px-4  py-2 rounded-lg transition"
                >
                  <RefreshCcw
                    className={
                      regeneratingDay === day.dayNumber ? "animate-spin" : ""
                    }
                  />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {day.activities.map((activity) => (
                <div
                  key={activity._id}
                  className=" bg-slate-900 border border-slate-700 border-l-4 border-l-blue-500 rounded-xl p-5"
                >
                  <span className="inline-block bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm mb-2">
                    {activity.timeOfDay}
                  </span>

                  <h3 className="text-xl font-semibold mb-2">
                    {activity.title}
                  </h3>

                  <p className="text-slate-400 leading-relaxed">
                    {activity.description}
                  </p>

                  <div className="flex justify-between items-center mt-4">
                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                      ${activity.estimatedCostUSD}
                    </span>

                    <button
                      onClick={() => deleteActivity(activity._id)}
                      className=" bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <h2 className="text-3xl font-bold mt-10 mb-6 m;-2">Packing List</h2>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
        {Object.entries(
          trip.packingList.reduce((groups, item) => {
            if (!groups[item.category]) {
              groups[item.category] = [];
            }
            groups[item.category].push(item);
            return groups;
          }, {}),
        ).map(([category, items]) => (
          <div key={category} className="mb-8">
            <h3 className="text-xl font-bold text-blue-400 mb-4">{category}</h3>
            <p className="text-sm text-slate-400 mb-3">
              {items.filter((item) => item.isPacked).length}/{items.length}{" "}
              packed
            </p>

            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between bg-slate-800 border border-slate-700 rounded-xl p-4"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={item.isPacked}
                      onChange={() =>
                        togglePackingItem(item._id, item.isPacked)
                      }
                      className="h-5 w-5 accent-blue-500"
                    />

                    <p
                      className={
                        item.isPacked
                          ? "line-through text-slate-500"
                          : "text-white"
                      }
                    >
                      {item.item}
                    </p>
                  </div>

                  <span className="text-xs bg-slate-700 text-slate-300 px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
