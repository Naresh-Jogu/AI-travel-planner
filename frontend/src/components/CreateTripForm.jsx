"use client";

import api from "@/utils/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const interestsList = [
  "Food",
  "Nature",
  "Photography",
  "Adventure",
  "Nightlife",
  "Culture",
  "Shopping",
  "History",
];

export default function CreateTripForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    destination: "",
    durationDays: 3,
    budgetTier: "Medium",
    interests: [],
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const payload = {
        ...formData,
      };

      const response = await api.post("/trips/generate", payload);

      toast.success("Trip Generated Successfully");
      console.log(response.data);

      const tripId = response.data.trip._id;
      router.push(`/trip/${tripId}`);
    } catch (error) {
      console.log("ERROR:", error);

      console.log("RESPONSE:", error.response?.data);

      toast.error(error.response?.data?.message || "Generation Failed");
    } finally {
      setLoading(false);
    }
  };

  const toggleInterest = (interest) => {
    if (formData.interests.includes(interest)) {
      setFormData({
        ...formData,
        interests: formData.interests.filter((item) => item !== interest),
      });
    } else {
      setFormData({
        ...formData,
        interests: [...formData.interests, interest],
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="destination"
        placeholder="Destination"
        value={formData.destination}
        onChange={handleChange}
        className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white outline-none focus:border-blue-500"
      />

      <select
        name="durationDays"
        value={formData.durationDays}
        onChange={handleChange}
        className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
      >
        <option value="2">2 Days</option>
        <option value="3">3 Days</option>
        <option value="5">5 Days</option>
        <option value="7">7 Days</option>
        <option value="10">10 Days</option>
        <option value="14">14 Days</option>
        <option value="21">21 Days</option>
        <option value="28">28 Days</option>
      </select>

      <select
        name="budgetTier"
        value={formData.budgetTier}
        onChange={handleChange}
        className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
      >
        <option>Low</option>

        <option>Medium</option>

        <option>High</option>
      </select>

      <div>
        <label className="block mb-2 text-sm font-medium">Interests</label>

        <div className="flex flex-wrap gap-2">
          {interestsList.map((interest) => (
            <button
              type="button"
              key={interest}
              onClick={() => toggleInterest(interest)}
              className={
                formData.interests.includes(interest)
                  ? "bg-blue-600 text-white px-3 py-2 rounded-lg"
                  : "bg-slate-800 border border-slate-700 text-white px-3 py-2 rounded-lg"
              }
            >
              {interest}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-lg p-3 font-semibold"
      >
        {loading ? "Generating..." : "Generate Trip"}
      </button>
    </form>
  );
}
