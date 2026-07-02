import React from "react";
import { Link } from "react-router-dom";

const Wrapper = ({ token, handleLogout, children }) => {
  const logout = () => {
    handleLogout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-cyan-100">

      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 shadow-lg border-b border-gray-200">

        <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">

          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-2xl">
              🚌
            </div>

            <div>
              <h1 className="text-2xl font-black text-slate-800">
                TripPilot
              </h1>

              <p className="text-xs text-gray-500">
                Travel Smarter
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-8">

            <Link
              to="/"
              className="font-semibold text-gray-700 hover:text-blue-600 transition"
            >
              Home
            </Link>

            <Link
              to="/buslist"
              className="font-semibold text-gray-700 hover:text-blue-600 transition"
            >
              Bus Tickets
            </Link>

            <Link
              to="/offers"
              className="font-semibold text-gray-700 hover:text-blue-600 transition"
            >
              Offers
            </Link>

            <Link
              to="/customer-care"
              className="font-semibold text-gray-700 hover:text-blue-600 transition"
            >
              Support
            </Link>

            {token && (
              <Link
                to="/my-bookings"
                className="font-semibold text-gray-700 hover:text-blue-600 transition"
              >
                My Bookings
              </Link>
            )}

            {token ? (

              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Logout
              </button>

            ) : (

              <Link to="/login">

                <button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-7 py-2.5 rounded-xl font-semibold shadow-lg hover:scale-105 transition-all duration-300">
                  Login
                </button>

              </Link>

            )}

          </div>

        </div>

      </nav>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {children}
      </main>

    </div>
  );
};

export default Wrapper;