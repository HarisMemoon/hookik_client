import { useEffect, useState } from "react";
import { fetchStorefrontList } from "@/lib/api/storefronts"; // You'll need to create this API util

export default function useStorefrontList(query = {}, refreshKey = 0) {
  const [storefronts, setStorefronts] = useState([]);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    limit: 20,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const response = await fetchStorefrontList(query);
        setStorefronts(response.storefronts || []);
        setPagination(response.pagination);
      } catch (err) {
        console.error("Fetch Error:", err.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [refreshKey, JSON.stringify(query)]);

  return { storefronts, pagination, loading };
}
