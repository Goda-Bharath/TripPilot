import React, { useState } from "react";
import axios from "axios";

const RegisterForm = ({ onLogin }) => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = form.username.trim();
    const email = form.email.trim();
    const password = form.password;

    // Frontend validation
    if (!username || !email || !password) {
      setMessage("Please fill in all fields.");
      setMessageType("error");
      return;
    }

    if (username.length < 3) {
      setMessage("Username must contain at least 3 characters.");
      setMessageType("error");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must contain at least 6 characters.");
      setMessageType("error");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/register/",
        {
          username,
          email,
          password,
        }
      );

      setMessage(
        response.data?.detail ||
          response.data?.message ||
          "Registration successful!"
      );
      setMessageType("success");

      setForm({
        username: "",
        email: "",
        password: "",
      });

      // If backend returns authentication data
      if (
        onLogin &&
        response.data?.token &&
        response.data?.user_id
      ) {
        onLogin(response.data.token, response.data.user_id);
      }
    } catch (error) {
      const data = error.response?.data;

      let errorMessage = "Registration failed. Please try again.";

      if (data?.username) {
        errorMessage = Array.isArray(data.username)
          ? data.username[0]
          : data.username;
      } else if (data?.email) {
        errorMessage = Array.isArray(data.email)
          ? data.email[0]
          : data.email;
      } else if (data?.password) {
        errorMessage = Array.isArray(data.password)
          ? data.password[0]
          : data.password;
      } else if (data?.detail) {
        errorMessage = data.detail;
      } else if (data?.message) {
        errorMessage = data.message;
      }

      setMessage(`❌ ${errorMessage}`);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-900 to-black px-4 py-8">

      {/* Background Effects */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Register Card */}
      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            Create Account
          </h1>

          <p className="text-gray-300 mt-2">
            Join TripPilot and start booking your journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-gray-200 mb-2 font-medium"
            >
              Username
            </label>

            <input
              id="username"
              type="text"
              name="username"
              placeholder="Enter username"
              value={form.username}
              onChange={handleChange}
              autoComplete="username"
              disabled={loading}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-gray-500 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition disabled:opacity-60"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-200 mb-2 font-medium"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter email address"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              disabled={loading}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-gray-500 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition disabled:opacity-60"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-200 mb-2 font-medium"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
                autoComplete="new-password"
                disabled={loading}
                className="w-full px-4 py-3 pr-16 rounded-xl bg-white/10 border border-gray-500 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition disabled:opacity-60"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                disabled={loading}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-cyan-400 hover:text-cyan-300"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-cyan-500/20 hover:scale-[1.02] transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          {/* Message */}
          {message && (
            <div
              role="alert"
              className={`text-center text-sm font-medium px-4 py-3 rounded-xl ${
                messageType === "success"
                  ? "bg-green-500/10 text-green-300 border border-green-500/30"
                  : "bg-red-500/10 text-red-300 border border-red-500/30"
              }`}
            >
              {message}
            </div>
          )}
        </form>

        {/* Login */}
        <div className="text-center mt-6">
          <p className="text-gray-400">
            Already have an account?
          </p>

          <button
            type="button"
            onClick={() => {
              if (onLogin) {
                onLogin();
              }
            }}
            className="mt-2 text-cyan-400 hover:text-cyan-300 font-semibold transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;