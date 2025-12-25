// src/hooks/useUserList.js
import { useEffect, useState } from "react";
import { fetchUserList } from "@/lib/api/users";
import { useRouter } from "next/navigation";

/**
 * Backend-driven user list hook with role-based filtering
 *
 * @param {Object} query - Query parameters including role filter
 * @param {string} query.role - User role to filter by ('shopper', 'influencer', 'seller')
 * @param {number} query.page - Current page number
 * @param {number} query.limit - Items per page
 * @param {string} query.search - Search query
 * @param {string} query.date_from - Start date filter
 * @param {string} query.date_to - End date filter
 * @param {number} refreshKey - Key to force refresh
 */
export default function useUserList(query = {}, refreshKey = 0) {
  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    limit: 20,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadUsers() {
      setLoading(true);
      setError(null);

      try {
        // Build query params with role filter
        const queryParams = {
          page: query.page || 1,
          limit: query.limit || 20,
          ...(query.search && { search: query.search }),
          ...(query.date_from && { date_from: query.date_from }),
          ...(query.date_to && { date_to: query.date_to }),
          ...(query.role && { role: query.role }), // Include role filter
        };

        console.log("Fetching users with query params:", queryParams);

        const response = await fetchUserList(queryParams);

        console.log("Received users:", response.users?.length || 0, "users");
        console.log("Role filter applied:", queryParams.role);

        setUsers(response.users || []);
        setPagination(
          response.pagination || {
            totalItems: 0,
            totalPages: 1,
            currentPage: query.page || 1,
            limit: query.limit || 20,
          }
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
    loading,
    error,
  };
}
