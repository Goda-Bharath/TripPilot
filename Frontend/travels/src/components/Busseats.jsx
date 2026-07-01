import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BusSeats = ({ token }) => {
  const [bus, setBus] = useState(null);
  const [seats, setSeats] = useState([]);

  const { busId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/buses/${busId}`
        );
        setBus(response.data);
        setSeats(response.data.seats || []);
      } catch (error) {
        console.log("Error in fetching details", error);
      }
    };

    fetchBusDetails();
  }, [busId]);

  const handleBook = async (seatId) => {
    if (!token) {
      alert("Please login for booking a seat");
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8000/api/booking/",
        { seat: seatId },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      alert("Booking Successful");
      setSeats((prevSeats) =>
        prevSeats.map((seat) =>
          seat.id === seatId ? { ...seat, is_booked: true } : seat
        )
      );
    } catch (error) {
      alert(error.response?.data?.error || "Booking failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* BUS INFO */}
      {bus && (
        <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
          <h1 className="text-2xl font-bold text-blue-600 mb-4">
            {bus.bus_name}
          </h1>

          <div className="grid md:grid-cols-2 gap-3 text-gray-700">
            <p>
              <span className="font-semibold">Bus Number:</span> {bus.number}
            </p>
            <p>
              <span className="font-semibold">From:</span> {bus.origin}
            </p>
            <p>
              <span className="font-semibold">To:</span> {bus.destination}
            </p>
            <p>
              <span className="font-semibold">Start Time:</span>{" "}
              {bus.start_time}
            </p>
            <p>
              <span className="font-semibold">Reach Time:</span>{" "}
              {bus.reach_time}
            </p>
          </div>
        </div>
      )}

      {/* SEATS */}
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Select Your Seat
      </h2>

      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
        {seats.map((seat) => (
          <button
            key={seat.id}
            onClick={() => handleBook(seat.id)}
            disabled={seat.is_booked}
            className={`py-2 rounded-lg font-medium text-sm transition duration-200 shadow
              ${
                seat.is_booked
                  ? "bg-red-500 text-white cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600 text-white"
              }
            `}
          >
           seat numbers {seat.seat_number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BusSeats;