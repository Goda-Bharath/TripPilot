import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const BusSeats = ({ token }) => {
  const { busId } = useParams();
  const navigate = useNavigate();

  const [bus, setBus] = useState(null);
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingSeat, setBookingSeat] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBusDetails = async () => {
      if (!busId) {
        setError("Invalid bus ID.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `${API_URL}/buses/${busId}/`
        );

        setBus(response.data);
        setSeats(response.data.seats || []);
      } catch (err) {
        console.error("Error fetching bus details:", err);
        setError("Unable to load bus details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBusDetails();
  }, [busId]);

  const handleBook = async (seatId) => {
    if (!token) {
      alert("Please login to book a seat.");
      navigate("/login");
      return;
    }

    if (bookingSeat !== null) return;

    try {
      setBookingSeat(seatId);

      await axios.post(
        `${API_URL}/booking/`,
        {
          seat: seatId,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      setSeats((prevSeats) =>
        prevSeats.map((seat) =>
          seat.id === seatId
            ? { ...seat, is_booked: true }
            : seat
        )
      );

      alert("Seat booked successfully!");
    } catch (err) {
      console.error("Booking error:", err);

      alert(
        err.response?.data?.error ||
          err.response?.data?.detail ||
          "Booking failed. Please try again."
      );
    } finally {
      setBookingSeat(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-500 border-t-transparent mx-auto"></div>

          <p className="mt-4 text-gray-600 font-medium">
            Loading bus details...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
          <p className="text-red-500 font-semibold">
            {error}
          </p>

          <button
            onClick={() => navigate(-1)}
            className="mt-5 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-cyan-100 py-10 px-4 sm:px-6">

      {bus && (
        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden mb-10">

          <div className="bg-gradient-to-r from-blue-700 to-cyan-500 text-white p-6 sm:p-8">

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">

              <div>
                <h1 className="text-3xl sm:text-4xl font-bold">
                  {bus.bus_name}
                </h1>

                <p className="mt-2 text-blue-100">
                  Bus No: {bus.number}
                </p>
              </div>

              <div className="sm:text-right">
                <p className="text-lg font-semibold">
                  ⭐ 4.8
                </p>

                <p className="text-blue-100">
                  Premium Bus
                </p>
              </div>

            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 p-6 sm:p-8">

            <div>
              <p className="text-gray-500 text-sm">
                From
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                {bus.origin}
              </h3>
            </div>

            <div>
              <p className="text-gray-500 text-sm">
                To
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                {bus.destination}
              </h3>
            </div>

            <div>
              <p className="text-gray-500 text-sm">
                Departure
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                {bus.start_time}
              </h3>
            </div>

            <div>
              <p className="text-gray-500 text-sm">
                Arrival
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                {bus.reach_time}
              </h3>
            </div>

            <div>
              <p className="text-gray-500 text-sm">
                Fare
              </p>

              <h3 className="text-2xl font-bold text-green-600">
                ₹{bus.fare ?? 799}
              </h3>
            </div>

          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto">

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-5 mb-8">

          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Select Your Seat
          </h2>

          {/* Seat Legend */}
          <div className="flex gap-5 text-sm">

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

        <div className="bg-white rounded-3xl shadow-2xl p-5 sm:p-8">

          <div className="flex justify-end mb-8">

            <div className="bg-gray-200 px-5 py-3 rounded-xl font-semibold text-gray-700">
              🚌 Driver
            </div>

          </div>

          {seats.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No seats available.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">

              {seats.map((seat) => {
                const isBooking =
                  bookingSeat === seat.id;

                return (
                  <button
                    key={seat.id}
                    type="button"
                    disabled={
                      seat.is_booked ||
                      bookingSeat !== null
                    }
                    onClick={() =>
                      handleBook(seat.id)
                    }
                    className={`
                      h-16 rounded-2xl font-bold
                      transition-all duration-300
                      shadow-md
                      ${
                        seat.is_booked
                          ? "bg-red-500 text-white cursor-not-allowed"
                          : isBooking
                          ? "bg-yellow-500 text-white cursor-wait"
                          : "bg-green-500 hover:bg-green-600 hover:scale-105 text-white"
                      }
                    `}
                  >
                    {isBooking
                      ? "Booking..."
                      : seat.seat_number}
                  </button>
                );
              })}

            </div>
          )}

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-8 px-6 py-3 rounded-xl bg-slate-800 text-white hover:bg-slate-700 transition"
          >
            ← Back to Buses
          </button>

        </div>
      </div>
    </div>
  );
};

export default BusSeats;