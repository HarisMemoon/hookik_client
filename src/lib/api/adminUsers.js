const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:9292/api";

function getToken() {
  const token = localStorage.getItem("admin_token");
  if (!token) throw new Error("Authentication token not found.");
  return token;
}

// GET admins
export async function fetchAdminUsers() {
  const res = await fetch(`${BASE_URL}/admin-users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch admin users");
  return res.json();
}

// CREATE admin
export async function createAdminUser(payload) {
  const res = await fetch(`${BASE_URL}/admin-users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to create admin");
  return data;
}

// UPDATE admin
export async function updateAdminUser(id, payload) {
  const res = await fetch(`${BASE_URL}/admin-users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update admin");
  return data;
}

// DELETE admin
export async function deleteAdminUser(id) {
  const res = await fetch(`${BASE_URL}/admin-users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) throw new Error("Failed to delete admin");
  return res.json();
}
