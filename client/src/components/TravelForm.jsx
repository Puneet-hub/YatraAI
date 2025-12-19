import { useState } from "react";
import { MapPin, IndianRupee, CalendarDays, Users } from "lucide-react";

import InputField from "./InputField";
import ResultCard from "./ResultCard";
import SkeletonResult from "./SkeletonResult";
import AILoadingStatus from "./AILoadingStatus";

export default function TravelForm() {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    budget: "",
    days: "",
    travelType: "Solo",
    departureDate: "",
    returnDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState("");
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setPlan("");

    try {
      const res = await fetch(`${API_URL}/generate-plan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate plan");
      }

      setPlan(data.plan);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-sm p-8 space-y-8"
      >
        {/* Header */}
        <div className="space-y-1">
          <h2 className="flex flex-wrap items-baseline gap-2 text-gray-900">
            <span className="text-xl font-medium">You dream the trip,</span>
            <span className="text-3xl font-bold text-blue-600">YatraAI</span>
            <span className="text-xl font-medium">plans it</span>
          </h2>
          <p className="text-sm text-gray-500">
            AI-powered travel planning in seconds.
          </p>
        </div>

        {/* Journey */}
        <div className="space-y-4">
          <p className="text-xs font-medium text-gray-400 uppercase">Journey</p>
          <div className="grid md:grid-cols-2 gap-4">
            <InputField
              icon={MapPin}
              name="from"
              placeholder="From"
              onChange={handleChange}
              required
            />
            <InputField
              icon={MapPin}
              name="to"
              placeholder="To"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Budget & Duration */}
        <div className="space-y-4">
          <p className="text-xs font-medium text-gray-400 uppercase">
            Budget & Duration
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <InputField
              icon={IndianRupee}
              name="budget"
              placeholder="Budget"
              onChange={handleChange}
              required
            />
            <InputField
              icon={CalendarDays}
              name="days"
              placeholder="Days"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Travel Type & Dates */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="relative">
            <Users
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <select
              name="travelType"
              value={formData.travelType}
              onChange={handleChange}
              className="w-full bg-gray-50 border-0 rounded-lg pl-9 pr-3 py-2.5 text-sm text-gray-700"
            >
              <option>Solo</option>
              <option>Couple</option>
              <option>Family</option>
              <option>Friends</option>
            </select>
          </div>

          <InputField
            icon={CalendarDays}
            type="date"
            name="departureDate"
            onChange={handleChange}
            required
          />

          <InputField
            icon={CalendarDays}
            type="date"
            name="returnDate"
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit */}
        <button
          disabled={loading}
          className={`w-full py-3 rounded-xl text-sm font-medium transition ${
            loading
              ? "bg-blue-400 text-white cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {loading ? "Planning your trip…" : "Generate trip"}
        </button>

        {loading && <AILoadingStatus />}
      </form>

      {error && (
        <p className="mt-4 text-center text-sm text-red-500">{error}</p>
      )}

      {loading && <SkeletonResult />}

      {!loading && plan && (
        <ResultCard
          plan={plan}
          fromCity={formData.from}
          toCity={formData.to}
        />
      )}
    </div>
  );
}
