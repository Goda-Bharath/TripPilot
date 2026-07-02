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
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-cyan-100 py-10 px-6">

      {bus && (
        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden mb-10">

          <div className="bg-gradient-to-r from-blue-700 to-cyan-500 text-white p-8">

            <div className="flex justify-between items-center">

              <div>
                <h1 className="text-4xl font-bold">{bus.bus_name}</h1>
                <p className="mt-2 text-blue-100">{bus.number}</p>
              </div>

              <div className="text-right">
                <p className="text-lg font-semibold">⭐ 4.8</p>
                <p className="text-blue-100">Premium Bus</p>
              </div>

            </div>

          </div>

          <div className="grid md:grid-cols-5 gap-6 p-8">

            <div>
              <p className="text-gray-500 text-sm">From</p>
              <h3 className="text-xl font-bold">{bus.origin}</h3>
            </div>

            <div>
              <p className="text-gray-500 text-sm">To</p>
              <h3 className="text-xl font-bold">{bus.destination}</h3>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Departure</p>
              <h3 className="text-xl font-bold">{bus.start_time}</h3>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Arrival</p>
              <h3 className="text-xl font-bold">{bus.reach_time}</h3>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Fare</p>
              <h3 className="text-2xl font-bold text-green-600">₹799</h3>
            </div>

          </div>

        </div>
      )}

      <div className="max-w-5xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-bold text-slate-800">
            Select Your Seat
          </h2>

          <div className="flex gap-6">

            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-green-500"></div>
              <span>Available</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-red-500"></div>
              <span>Booked</span>
            </div>

          </div>

        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8">

          <div className="flex justify-end mb-8">

            <div className="bg-gray-200 px-6 py-3 rounded-xl font-semibold">
              🚌 Driver
            </div>

          </div>

          <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-4 gap-5">

            {seats.map((seat) => (

              <button
                key={seat.id}
                onClick={() => handleBook(seat.id)}
                disabled={seat.is_booked}
                className={`h-16 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:scale-105

            ${seat.is_booked
                    ? "bg-red-500 text-white cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600 text-white"
                  }
            `}
              >
                {seat.seat_number}
              </button>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
};

export default BusSeats;