import React from "react";
import { Link } from "react-router-dom";

const Wrapper = ({ token, handleLogout, children }) => {
  const logout = () => {
    handleLogout();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <Link to="/" className="text-2xl font-bold">
            🚌_TripPilot
          </Link>

          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="hover:text-gray-200 transition duration-200"
            >
              Home
            </Link>

            {token && (
              <Link
                to="/my-bookings"
                className="hover:text-gray-200 transition duration-200"
              >
                My Bookings
              </Link>
            )}

            {token ? (
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-medium transition duration-200"
              >
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-medium transition duration-200">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="max-w-7xl mx-auto p-6">
        {children}
      </main>
    </div>
  );
};

export default Wrapper;