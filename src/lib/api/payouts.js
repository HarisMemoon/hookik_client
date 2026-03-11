const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:9292/api/admin";

export async function fetchPayoutList(query = {}) {
  const token = localStorage.getItem("admin_token");
  if (!token) throw new Error("Authentication token not found.");

  const params = new URLSearchParams({
    page: query.page || 1,
    limit: query.limit || 20,
    status: query.filter || "pending", // matches your 'pending', 'completed', 'failed'
    ...(query.search && { search: query.search }),
  });

  const res = await fetch(`${BASE_URL}/payouts?${params.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch payouts");
  return res.json();
}

export async function approvePayout(id) {
  const token = localStorage.getItem("admin_token");

  const res = await fetch(`${BASE_URL}/payouts/${id}/approve`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("Approve payout backend error:", data);
    throw new Error(data.message || "Approve failed");
  }

  return data;
}

export async function bulkProcessPayouts(ids) {
  const token = localStorage.getItem("admin_token");

  const res = await fetch(`${BASE_URL}/payouts/bulk-process`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ids }),
  });

  if (!res.ok) throw new Error("Failed to process payouts");
  return res.json();
}
