// src/lib/api/users.js
const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:9292/api";

/**
 * Fetches a list of users for the Admin panel, supporting pagination and queries.
 * @param {object} query - Contains properties like { limit, offset, role, search }.
 */
export async function fetchUserList(query = {}) {
  const token = localStorage.getItem("admin_token");
  if (!token) {
    throw new Error("Authentication token not found.");
  }

  // Construct URL with query parameters (e.g., limit=10&offset=0)
  const queryString = new URLSearchParams(query).toString();
  // We target the protected route: /api/users
  const url = `${BASE_URL}/users?${queryString}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    // Session expired cleanup
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    throw new Error("Session expired. Please log in again.");
  }

  if (!res.ok) {
    // Attempt to read error message from body if available
    const errorBody = await res.json().catch(() => ({}));
    const errorMessage = errorBody.error || res.statusText;
    throw new Error(`Failed to fetch user list: ${errorMessage}`);
  }

  // Returns: { users: [...], total: 100, limit: 10, offset: 0 }
  return res.json();
}
