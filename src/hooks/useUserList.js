// src/hooks/useUserList.js
import { useEffect, useState } from "react";
import { fetchUserList } from "@/lib/api/users";
import { useRouter } from "next/navigation";

export default function useUserList(query = {}, refreshKey = 0) {
  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    limit: 20,
  });
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadUsers() {
      setLoading(true);
      setError(null);

      try {
        // Build query params with role filter AND filter parameter
        const queryParams = {
          page: query.page || 1,
          limit: query.limit || 20,
          ...(query.search && { search: query.search }),
          ...(query.date_from && { date_from: query.date_from }),
          ...(query.date_to && { date_to: query.date_to }),
          ...(query.role && { role: query.role }),
          ...(query.filter && { filter: query.filter }), // ✅ Fixed: Include filter parameter
          ...(query.status && { status: query.status }),
          ...(query.minSpent && { minSpent: query.minSpent }),
          ...(query.maxSpent && { maxSpent: query.maxSpent }),
          ...(query.minOrders && { minOrders: query.minOrders }),
          ...(query.maxOrders && { maxOrders: query.maxOrders }),
          ...(query.minSales && { minSales: query.minSales }),
          ...(query.maxSales && { maxSales: query.maxSales }),
          ...(query.minBalance && { minBalance: query.minBalance }),
          ...(query.maxBalance && { maxBalance: query.maxBalance }),
          ...(query.minProducts && { minProducts: query.minProducts }),
          ...(query.maxProducts && { maxProducts: query.maxProducts }),
          ...(query.storefrontStatus && {
            storefrontStatus: query.storefrontStatus,
          }),
          ...(query.verifiedStatus && { verifiedStatus: query.verifiedStatus }),
        };

        console.log("Fetching users with query params:", queryParams);

        const response = await fetchUserList(queryParams);

        console.log("Received users:", response.users?.length || 0, "users");
        console.log("Role filter applied:", queryParams.role);
        console.log("Filter applied:", queryParams.filter); // ✅ Add this log

        setUsers(response.users || []);
        setStats(response.stats || null);
        setPagination(
          response.pagination || {
            totalItems: 0,
            totalPages: 1,
            currentPage: query.page || 1,
            limit: query.limit || 20,
          },
        );
      } catch (err) {
        console.error("User List Fetch Error:", err.message);
        setError(err.message);

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

    loadUsers();
  }, [router, refreshKey, JSON.stringify(query)]);

  return {
    users,
    pagination,
    stats,
    loading,
    error,
  };
}
