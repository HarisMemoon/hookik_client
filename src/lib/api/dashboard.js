// src/lib/api/dashboard.js

// Ensure NEXT_PUBLIC_API_BASE_URL is defined in your Next.js environment file
const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:9292/api";

export async function fetchDashboardData() {
  // 1. Retrieve the token from storage (e.g., localStorage)
  const token = localStorage.getItem("admin_token");

  if (!token) {
    // If no token, throw an error to trigger a redirect in the frontend hook
    throw new Error("Authentication token not found.");
  }

  const res = await fetch(`${BASE_URL}/dashboard`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // 2. Attach the JWT token to the Authorization header
      Authorization: `Bearer ${token}`,
    },
  });

  // Handle protected route failure (401 Unauthorized)
  if (res.status === 401) {
    // If the token is invalid/expired, clear storage and let the hook redirect
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    throw new Error("Session expired. Please log in again.");
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch dashboard data: ${res.statusText}`);
  }

  return res.json();
}
