import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BusList = () => {
  const [buses, setBuses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/buses/");
        setBuses(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBuses();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-cyan-100 py-12 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-slate-800">
            Available Buses
          </h1>
          <p className="text-gray-600 mt-3 text-lg">
            Choose your preferred bus and reserve your seat.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">

          {buses.map((item) => (

            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-200"
            >

              <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-6">

                <div className="flex justify-between items-center">

                  <div>
                    <h2 className="text-2xl font-bold">
                      {item.bus_name}
                    </h2>

                    <p className="opacity-90 mt-1">
                      {item.number}
                    </p>
                  </div>

                  <span className="bg-white text-blue-600 font-semibold px-3 py-1 rounded-full text-sm">
                    {item.bus_type || "AC Sleeper"}
                  </span>

                </div>

              </div>

              <div className="p-6 space-y-5">

                <div className="flex justify-between">

                  <div>
                    <p className="text-xs uppercase text-gray-500">
                      From
                    </p>

                    <h3 className="font-bold text-lg">
                      {item.origin}
                    </h3>
                  </div>

                  <div className="text-center">
                    <p className="text-gray-400">────────▶</p>
                    <p className="text-xs text-gray-500">
                      {item.duration || "8h 30m"}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs uppercase text-gray-500">
                      To
                    </p>

                    <h3 className="font-bold text-lg">
                      {item.destination}
                    </h3>
                  </div>

                </div>

                <div className="grid grid-cols-2 gap-4">

                  <div className="bg-gray-50 rounded-xl p-3">

                    <p className="text-xs text-gray-500">
                      Departure
                    </p>

                    <p className="font-bold">
                      {item.start_time}
                    </p>

                  </div>

                  <div className="bg-gray-50 rounded-xl p-3">

                    <p className="text-xs text-gray-500">
                      Arrival
                    </p>

                    <p className="font-bold">
                      {item.reach_time}
                    </p>

                  </div>

                </div>

                <div className="flex justify-between items-center">

                  <div>

                    <p className="text-xs text-gray-500">
                      Starting From
                    </p>

                    <h2 className="text-3xl font-black text-green-600">
                      ₹{item.price || 799}
                    </h2>

                  </div>

                  <div className="text-right">

                    <p className="text-yellow-500 font-bold">
                      ⭐ {item.rating || "4.8"}
                    </p>

                    <p className="text-green-600 text-sm font-semibold">
                      {item.available_seats || 32} Seats Left
                    </p>

                  </div>

                </div>

                <div className="flex justify-between items-center">

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                    ● Live Tracking
                  </span>

                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                    Free Cancellation
                  </span>

                </div>

                <button
                  onClick={() => navigate(`/bus/${item.id}`)}
                  className="w-full mt-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-xl font-bold text-lg hover:scale-105 transition duration-300"
                >
                  View Seats
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>
    </div>
  );
};

export default BusList;