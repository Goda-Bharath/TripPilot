import axios from "axios";
import React, { useState, useEffect } from "react";

const UserBookings = ({ token, userId }) => {
  const [bookings, setBookings] = useState([]);
  const [bookingError, setBookingError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!token || !userId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const response = await axios.get(
          `http://localhost:8000/api/user/${userId}/bookings/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        setBookings(response.data);
      } catch (error) {
        console.error(error);

        setBookingError(
          error.response?.data?.message ||
            "Unable to load bookings. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token, userId]);

  const handleCancelBooking = (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) return;

    setBookings((prev) => prev.filter((booking) => booking.id !== id));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-100">
        <div className="text-center">
          <div className="animate-spin h-16 w-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-xl font-semibold text-slate-700">
            Loading Bookings...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-cyan-100 py-12 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-slate-800">
            My Bookings
          </h1>

          <p className="text-gray-600 mt-3 text-lg">
            View all your confirmed bus reservations
          </p>
        </div>

        {bookingError && (
          <div className="mb-8 rounded-2xl border border-red-300 bg-red-50 px-6 py-5 text-red-700 shadow">
            ⚠ {bookingError}
          </div>
        )}

        {!bookingError && bookings.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
            <div className="text-7xl mb-4">🚌</div>

            <h2 className="text-3xl font-bold text-gray-700">
              No Bookings Found
            </h2>

            <p className="text-gray-500 mt-3">
              Looks like you haven't booked any tickets yet.
            </p>

            <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold">
              Book a Bus
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {bookings.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-blue-700 to-cyan-500 text-white px-8 py-6 flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {item.bus}
                    </h2>

                    <p className="text-blue-100 mt-1">
                      Booking ID : #{item.id}
                    </p>
                  </div>

                  <span className="bg-green-500 px-5 py-2 rounded-full text-sm font-semibold">
                    Confirmed
                  </span>
                </div>

                <div className="p-8">
                  <div className="grid md:grid-cols-4 gap-6">

                    <div className="bg-slate-50 rounded-2xl p-5">
                      <p className="text-gray-500 text-sm">
                        Passenger
                      </p>

                      <h3 className="font-bold text-lg mt-2">
                        {item.user}
                      </h3>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-5">
                      <p className="text-gray-500 text-sm">
                        Seat Number
                      </p>

                      <h3 className="font-bold text-lg mt-2">
                        {item.seat}
                      </h3>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-5">
                      <p className="text-gray-500 text-sm">
                        Booking Time
                      </p>

                      <h3 className="font-bold text-lg mt-2">
                        {new Date(
                          item.booking_time
                        ).toLocaleString()}
                      </h3>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-5">
                      <p className="text-gray-500 text-sm">
                        Fare
                      </p>

                      <h3 className="font-bold text-2xl text-green-600 mt-2">
                        ₹{item.fare || 799}
                      </h3>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-4">

                    <button
                      onClick={() => window.print()}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
                    >
                      Download Ticket
                    </button>

                    <button
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold transition"
                    >
                      View Details
                    </button>

                    <button
                      onClick={() =>
                        handleCancelBooking(item.id)
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition"
                    >
                      Cancel Booking
                    </button>

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default UserBookings;