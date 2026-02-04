const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:9292/api/admin";

export async function fetchStats() {
  const token = localStorage.getItem("admin_token");
  if (!token) throw new Error("Authentication token not found");

  const res = await fetch(`${BASE_URL}//stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    throw new Error("Session expired");
  }

  if (!res.ok) {
    throw new Error("Failed to fetch  stats");
  }

  return res.json();
}
