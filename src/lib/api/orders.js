const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:9292/api/admin";

export async function fetchOrderList(query = {}) {
  const token = localStorage.getItem("admin_token");
  if (!token) throw new Error("Authentication token not found.");

  const params = new URLSearchParams({
    page: query.page || 1,
    limit: query.limit || 20,
    ...(query.filter && { filter: query.filter }),
    ...(query.search && { search: query.search }),
  });

  const res = await fetch(`${BASE_URL}/orders?${params.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    throw new Error("Session expired.");
  }

  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
}
