// src/hooks/useDashboard.js
import { useEffect, useState } from "react";
import { fetchDashboardData } from "@/lib/api/dashboard";
import { useRouter } from "next/navigation";

export default function useDashboard() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    async function load() {
      try {
        const response = await fetchDashboardData();
        setData(response);
      } catch (err) {
        console.error("Dashboard Data Fetch Error:", err.message);
        setError(err.message);
        // If the error indicates session expiry, let the ProtectedLayout handle the redirect.
        if (
          err.message.includes("expired") ||
          err.message.includes("token not found")
        ) {
          router.push("/login");
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [router]);

  return {
    loading,
    error,
    ...data,
  };
}
