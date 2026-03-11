const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:9292/api";
function getToken() {
  const token = localStorage.getItem("admin_token");
  if (!token) throw new Error("Authentication token not found.");
  return token;
}
export async function fetchSystemLogs() {
  const res = await fetch(`${BASE_URL}/logs`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch logs");
  return res.json();
}
