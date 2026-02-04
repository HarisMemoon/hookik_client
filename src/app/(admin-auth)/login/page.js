// src/app/login/page.js
"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PRIMARY } from "@/constants/COLORS.js";
import { Eye } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@hookik.com");
  const [password, setPassword] = useState("12345678");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // **IMPORTANT:** Replace with your actual backend URL
    const LOGIN_API_URL = "http://localhost:9292/api/admin/auth/login";

    try {
      const response = await fetch(LOGIN_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle 401, 400, or 500 errors from the API
        setError(data.message || "Login failed. Please try again.");
        return;
      }

      // 1. Store the token/user data securely (e.g., localStorage or cookies)
      localStorage.setItem("admin_token", data.token); // Assuming you add JWT token in backend response
      localStorage.setItem("admin_user", JSON.stringify(data.user));

      // 2. Redirect to the protected dashboard page
      router.push("/"); // Change this to your actual dashboard path
    } catch (err) {
      console.error("Network or Fetch Error:", err);
      setError("Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Left Panel (Image and text) */}
      <div className="hidden lg:flex lg:w-3/10 flex-col ">
        {/* Image (upper 70%) */}
        <div className="h-[70%]">
          <img
            src="/bg_image_login.jpg"
            alt="Influencer using phone"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text (lower 30%) */}
        <div className="h-[30%]  flex items-center bg-gray-100 p-10 justify-center">
          <h2 className="text-2xl font-bold text-black leading-snug ">
            Where creators turn their genuine recommendations into income and
            brands grow through trusted voices.
          </h2>
        </div>
      </div>

      {/* RIGHT PANEL — 70% */}
      <div className="w-full lg:w-7/10 flex items-center justify-center p-15 ">
        <div className="max-w-md w-full p-7">
          {/* Logo */}
          <div className="flex justify-center">
            <img
              src="/hookik_logo_login.jpg"
              alt="Hookik"
              className="h-12 object-contain"
            />
          </div>

          <p className="text-center text-gray-500 mt-4">
            Super Admin Dashboard
          </p>

          <h2 className="text-xl font-semibold text-center mt-10 text-black">
            Welcome Back
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="text-center text-gray-400 mb-6 text-sm">
              Sign in to your admin account to continue
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded text-sm text-center">
                {error}
              </div>
            )}

            {/* Email Field */}
            {/* Email */}
            <div className="w-full flex flex-col items-center mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 self-start "
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-3 py-3 pr-12 bg-gray-100 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                placeholder="Email@hookik.com"
              />
            </div>

            {/* Password */}
            <div className="w-full flex flex-col items-center mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 self-start "
              >
                Password
              </label>

              <div className="relative w-full max-w-md">
                <input
                  id="password"
                  type={passwordVisible ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-1 px-3 py-3 pr-12 bg-gray-100 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter your password"
                />

                {/* Icon stays inside the input */}
                <div
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                >
                  <Eye
                    size={20}
                    className="text-gray-500 hover:text-gray-700"
                  />
                </div>
              </div>
            </div>

            {/* Remember Me / Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-gray-900"
                >
                  Remember me
                </label>
              </div>
              <a href="#" className=" text-purple-600 hover:text-purple-500">
                Forgot password?
              </a>
            </div>

            {/* Sign In Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className={
                  "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white "
                }
                style={{ backgroundColor: PRIMARY }}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </div>
            <div className="border-gray-900 w-80" />
            <p className="text-center text-sm text-gray-600">
              Don't have an account?
              <a
                href="/registration"
                className="text-purple-600 hover:text-purple-500 ml-1"
              >
                Sign up
              </a>
            </p>
          </form>

          <p className="mt-10 text-center text-xs text-gray-400">
            &copy; 2025 Hookik. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
