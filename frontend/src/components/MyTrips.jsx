"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Calendar, Wallet, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import api from "../utils/api";

export default function MyTrips() {
  const router = useRouter();

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const response = await api.get("/trips");

      setTrips(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="
            animate-pulse
            bg-slate-800
            border
            border-slate-700
            rounded-xl
            p-5
            h-40
          "
          />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <p className="text-slate-400">Total Trips</p>
          <h2 className="text-3xl font-bold">{trips.length}</h2>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <p className="text-slate-400">Countries</p>
          <h2 className="text-3xl font-bold">
            {new Set(trips.map((trip) => trip.destination)).size}
          </h2>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <p className="text-slate-400">Travel Days</p>
          <h2 className="text-3xl font-bold">
            {trips.reduce((sum, trip) => sum + trip.durationDays, 0)}
          </h2>
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-4">My Trips</h2>

      {trips.length === 0 ? (
        <p>No trips found</p>
      ) : (
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4  max-h-150
    overflow-y-auto
    pr-2"
        >
          {trips.map((trip) => (
            <motion.div
              key={trip._id}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-slate-800 border border-slate-700 rounded-xl p-5 hover:border-blue-500 transition"
            >
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={20} />
                <h3 className="text-xl font-bold">{trip.destination}</h3>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{trip.durationDays} Days</span>
                </div>

                <div className="flex items-center gap-2">
                  <Wallet size={16} />
                  <span>{trip.budgetTier} Budget</span>
                </div>
              </div>

              <button
                onClick={() => router.push(`/trip/${trip._id}`)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 mt-2 rounded-lg transition"
              >
                View Trip
                <ArrowRight size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
