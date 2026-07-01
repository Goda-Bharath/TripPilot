import axios from "axios";
import React, { useState, useEffect } from "react";

const UserBookings = ({ token, userId }) => {
  const [bookings, setBookings] = useState([]);
  const [bookingError, setBookingError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!token || !userId) return;

      try {
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
        console.log("Fetching details failed", error);

        setBookingError(
          error.response?.data?.message || "Failed to fetch bookings."
        );
      }
    };

    fetchBookings();
  }, [userId, token]);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          My Bookings
        </h1>

        {bookingError && (
          <div className="mb-6 rounded-lg bg-red-100 border border-red-300 p-4 text-red-700">
            {bookingError}
          </div>
        )}

        {bookings.length === 0 && !bookingError ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-500">
            No bookings found.
          </div>
        ) : (
          <div className="grid gap-6">
            {bookings.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 p-6"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">
                      <span className="font-semibold">User:</span> {item.user}
                    </p>

                    <p className="text-gray-600 mt-2">
                      <span className="font-semibold">Bus:</span> {item.bus}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-600">
                      <span className="font-semibold">Seat:</span> {item.seat}
                    </p>

                    <p className="text-gray-600 mt-2">
                      <span className="font-semibold">Booking Time:</span>{" "}
                      {item.booking_time}
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <span className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium">
                    Confirmed
                  </span>
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