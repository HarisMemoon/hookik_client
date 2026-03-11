import { useEffect, useState } from "react";
import { fetchAdminUsers } from "@/lib/api/adminUsers";

export default function useAdminUsers(refreshKey = 0) {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAdmins() {
      setLoading(true);
      try {
        const res = await fetchAdminUsers();
        setAdmins(res.data || []);
      } catch (err) {
        console.error("Admin Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadAdmins();
  }, [refreshKey]);

  return { admins, loading };
}
