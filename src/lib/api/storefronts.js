// src/lib/api/storefronts.js

// Ensure NEXT_PUBLIC_API_BASE_URL is defined in your Next.js environment file
const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:9292/api";

/**
 * Fetches the list of storefronts from the backend with filtering and pagination.
 */
export async function fetchStorefrontList(query = {}) {
  // 1. Retrieve the token from storage
  const token = localStorage.getItem("admin_token");

  if (!token) {
    throw new Error("Authentication token not found.");
  }

  // Convert query object into a URL-friendly string
  const params = new URLSearchParams({
    page: query.page || 1,
    limit: query.limit || 20,
    ...(query.filter && { filter: query.filter }),
    ...(query.search && { search: query.search }),
    ...(query.status && { status: query.status }),
    ...(query.minProducts && { minProducts: query.minProducts }),
    ...(query.maxProducts && { maxProducts: query.maxProducts }),
  });

  const res = await fetch(`${BASE_URL}/storefronts?${params.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // 2. Attach the JWT token to the Authorization header
      Authorization: `Bearer ${token}`,
    },
  });

  // Handle protected route failure (401 Unauthorized)
  if (res.status === 401) {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    throw new Error("Session expired. Please log in again.");
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch storefronts: ${res.statusText}`);
  }

  return res.json();
}

/**
 * Updates the public status of a storefront.
 */
export async function updateStorefrontStatus(id, is_public) {
  const token = localStorage.getItem("admin_token");

  if (!token) throw new Error("Authentication token not found.");

  const res = await fetch(`${BASE_URL}/storefronts/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ is_public }),
  });

  if (res.status === 401) {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    throw new Error("Session expired.");
  }

  if (!res.ok) throw new Error("Failed to update storefront status");

  return res.json();
}
// src/lib/api/storefronts.js

// src/lib/api/storefronts.js

export async function updateStorefront(id, payload) {
  const token = localStorage.getItem("admin_token");

  if (!token) throw new Error("Authentication token not found.");

  const res = await fetch(`${BASE_URL}/storefronts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to update storefront");
  }

  return res.json();
}
