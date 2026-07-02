import React, { useState } from "react";
import axios from "axios";

const LoginForm = ({ onLogin }) => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/login/",
        form
      );

      setMessage("✅ Login Successful!");

      if (onLogin) {
        onLogin(response.data.token, response.data.user_id);
      }

      setForm({
        username: "",
        password: "",
      });
    } catch (error) {
      setMessage(
        "❌ Login Failed: " +
          (error.response?.data?.detail || "Invalid username or password.")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-900 to-black px-4">
      <div className="absolute w-72 h-72 bg-cyan-500 opacity-20 blur-3xl rounded-full top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-purple-600 opacity-20 blur-3xl rounded-full bottom-10 right-10"></div>
      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">

        <h1 className="text-4xl font-bold text-center text-white">
          Welcome Back
        </h1>

        <p className="text-center text-gray-300 mt-2 mb-8">
          Login to your Bus Booking Account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-300 mb-2">
              Username
            </label>

            <input
              type="text"
              name="username"
              placeholder="Enter Username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-gray-500 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-gray-500 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold hover:scale-105 transition duration-300 shadow-lg disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {message && (
            <div
              className={`text-center mt-4 font-medium ${
                message.startsWith("✅")
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {message}
            </div>
          )}
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-400">
            Don't have an account?
          </p>

          <button
            type="button"
            className="mt-2 text-cyan-400 hover:text-cyan-300 font-semibold transition"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;