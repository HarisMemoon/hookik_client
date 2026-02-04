import { useEffect, useState } from "react";
import { fetchPayoutList } from "@/lib/api/payouts";

export default function usePayoutList(query = {}, refreshKey = 0) {
  const [payouts, setPayouts] = useState([]);
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
        const response = await fetchPayoutList(query);
        // Based on your SQL: we map 'ref' to code, 'amount' is decimal, etc.
        setPayouts(response.payouts || []);
        setPagination(response.pagination);
      } catch (err) {
        console.error("Payout Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [refreshKey, JSON.stringify(query)]);

  return { payouts, pagination, loading };
}
