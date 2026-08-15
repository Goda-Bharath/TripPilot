import React, { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const LoginForm = ({ onLogin, onRegister }) => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setMessage("");
  };

  const validateForm = () => {
    if (!form.username.trim()) {
      setError("Please enter your username.");
      return false;
    }

    if (!form.password) {
      setError("Please enter your password.");
      return false;
    }

    if (form.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setMessage("");
    setError("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/api/login/`,
        {
          username: form.username.trim(),
          password: form.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { token, user_id } = response.data;

      if (!token) {
        throw new Error("Authentication token was not received.");
      }

      setMessage("Login successful!");

      // Send login information to parent component
      if (onLogin) {
        onLogin(token, user_id);
      }

      // Clear form after successful login
      setForm({
        username: "",
        password: "",
      });
    } catch (error) {
      console.error("Login error:", error);

      let errorMessage = "Unable to login. Please try again.";

      if (error.response) {
        if (error.response.data?.detail) {
          errorMessage = error.response.data.detail;
        } else if (error.response.data?.non_field_errors) {
          errorMessage = error.response.data.non_field_errors[0];
        } else if (error.response.status === 401) {
          errorMessage = "Invalid username or password.";
        } else if (error.response.status >= 500) {
          errorMessage = "Server error. Please try again later.";
        }
      } else if (error.request) {
        errorMessage =
          "Unable to connect to the server. Please check your connection.";
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-900 to-black px-4 py-10">

      {/* Background Effects */}
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />

      <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-purple-600/20 blur-3xl pointer-events-none" />

      {/* Login Card */}
      <div className="relative w-full max-w-md">

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">

          {/* Header */}
          <div className="text-center mb-8">

            <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-indigo-600 flex items-center justify-center shadow-lg">
              <span className="text-3xl">✈️</span>
            </div>

            <h1 className="text-4xl font-bold text-white">
              Welcome Back
            </h1>

            <p className="text-gray-300 mt-2">
              Login to your TripPilot account
            </p>

          </div>

          {/* Login Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
            noValidate
          >

            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Username
              </label>

              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                placeholder="Enter your username"
                value={form.username}
                onChange={handleChange}
                disabled={loading}
                className="w-full px-4 py-3 rounded-xl
                bg-white/10 border border-white/20
                text-white placeholder-gray-500
                outline-none
                focus:border-cyan-400
                focus:ring-2 focus:ring-cyan-400/30
                transition
                disabled:opacity-50"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Password
              </label>

              <div className="relative">

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full px-4 py-3 pr-14 rounded-xl
                  bg-white/10 border border-white/20
                  text-white placeholder-gray-500
                  outline-none
                  focus:border-cyan-400
                  focus:ring-2 focus:ring-cyan-400/30
                  transition
                  disabled:opacity-50"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  disabled={loading}
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2
                  text-gray-400 hover:text-white
                  transition"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>

              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-400/30
                bg-red-500/10 px-4 py-3
                text-sm text-red-300"
              >
                ❌ {error}
              </div>
            )}

            {/* Success */}
            {message && (
              <div
                role="status"
                className="rounded-xl border border-green-400/30
                bg-green-500/10 px-4 py-3
                text-sm text-green-300"
              >
                ✅ {message}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl
              bg-gradient-to-r from-cyan-500 to-indigo-600
              hover:from-cyan-400 hover:to-indigo-500
              text-white font-semibold
              shadow-lg shadow-indigo-900/30
              transition-all duration-300
              hover:scale-[1.02]
              disabled:opacity-60
              disabled:cursor-not-allowed
              disabled:hover:scale-100"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Register */}
          <div className="text-center mt-7">

            <p className="text-gray-400 text-sm">
              Don't have an account?
            </p>

            <button
              type="button"
              onClick={onRegister}
              className="mt-2 text-cyan-400
              hover:text-cyan-300
              font-semibold transition"
            >
              Create an account
            </button>

          </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-500 mt-8">
            Secure login powered by TripPilot
          </p>

        </div>
      </div>
    </div>
  );
};

export default LoginForm;