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
        console.log("error in fetching buses", error);
      }
    };
    fetchBuses();
  }, []);

  const handleViewSeats = (id) => {
    navigate(`/bus/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Available Buses
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {buses.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-5 border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-blue-600 mb-3">
              {item.bus_name}
            </h2>

            <div className="space-y-2 text-gray-700 text-sm">
              <p>
                <span className="font-medium">Bus Number:</span> {item.number}
              </p>

              <p>
                <span className="font-medium">From:</span> {item.origin}
              </p>

              <p>
                <span className="font-medium">To:</span> {item.destination}
              </p>

              <p>
                <span className="font-medium">Start Time:</span>{" "}
                {item.start_time}
              </p>

              <p>
                <span className="font-medium">Reach Time:</span>{" "}
                {item.reach_time}
              </p>
            </div>

            <button
              onClick={() => handleViewSeats(item.id)}
              className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition duration-200"
            >
              View Seats
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusList;