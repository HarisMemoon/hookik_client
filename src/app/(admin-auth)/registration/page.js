// src/app/register/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PRIMARY } from "@/constants/COLORS.js";
import { Eye } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    const REGISTER_API_URL = "http://localhost:9292/api/admin/auth/register";

    try {
      const response = await fetch(REGISTER_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed.");
        return;
      }

      router.push("/login");
    } catch (err) {
      console.error("Register Error:", err);
      setError("Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* LEFT PANEL */}
      <div className="hidden lg:flex lg:w-3/10 flex-col">
        <div className="h-[70%]">
          <img
            src="/bg_image_login.jpg"
            alt="Register Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="h-[30%] flex items-center bg-gray-100 p-10 justify-center">
          <h2 className="text-2xl font-bold text-black leading-snug">
            Join Hookik and turn influence into real impact.
          </h2>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-7/10 flex items-center justify-center p-15">
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
            Create Account
          </h2>

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="text-center text-gray-400 mb-6 text-sm">
              Register a new admin account
            </div>

            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded text-sm text-center">
                {error}
              </div>
            )}

            {/* Name */}
            {/* <div className="w-full flex flex-col mt-4">
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 px-3 py-3 bg-gray-100 text-black border border-gray-300 rounded-md focus:outline-none"
                placeholder="John Doe"
              />
            </div> */}

            {/* Email */}
            <div className="w-full flex flex-col mt-4">
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 px-3 py-3 bg-gray-100 text-black border border-gray-300 rounded-md focus:outline-none"
                placeholder="admin@hookik.com"
              />
            </div>

            {/* Password */}
            <div className="w-full flex flex-col mt-4">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>

              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-1 px-3 py-3 pr-12 bg-gray-100 text-black border border-gray-300 rounded-md focus:outline-none"
                  placeholder="Create a password"
                />

                <div
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                >
                  <Eye size={20} className="text-gray-500" />
                </div>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="w-full flex flex-col mt-4">
              <label className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>

              <input
                type={passwordVisible ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 px-3 py-3 bg-gray-100 text-black border border-gray-300 rounded-md focus:outline-none"
                placeholder="Re-enter your password"
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 rounded-md text-white text-sm font-medium"
              style={{ backgroundColor: PRIMARY }}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?
              <a
                href="/login"
                className="text-purple-600 hover:text-purple-500 ml-1"
              >
                Sign in
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
