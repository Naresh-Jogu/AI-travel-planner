"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import CreateTripForm from "@/components/CreateTripForm";
import MyTrips from "@/components/MyTrips";
import Navbar from "@/components/Navbar";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <Navbar />
      <div className="min-h-screen bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-6 py-10">
          {/* Hero Section */}
          <div className="mb-10">
            <h1 className="text-4xl md:text-4xl font-bold mb-4">
              Plan Your Perfect Journey With AI
            </h1>

            <p className="text-slate-400 text-lg max-w-2xl">
              Generate personalized itineraries, hotel recommendations, budgets,
              and packing lists in seconds.
            </p>
          </div>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Create Trip */}
            <div className="lg:col-span-1">
              <div
                className="
                bg-slate-900
                border
                border-slate-800
                rounded-2xl
                p-6
              "
              >
                <h2 className="text-2xl font-semibold mb-4">Create New Trip</h2>

                <CreateTripForm />
              </div>
            </div>

            {/* My Trips */}
            <div className="lg:col-span-2">
              <div
                className="
                bg-slate-900
                border
                border-slate-800
                rounded-2xl
                p-6
              "
              >
                <MyTrips />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
