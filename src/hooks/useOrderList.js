import { useEffect, useState } from "react";
import { fetchOrderList } from "@/lib/api/orders";

export default function useOrderList(query = {}, refreshKey = 0) {
  const [orders, setOrders] = useState([]);
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
        const response = await fetchOrderList(query);
        setOrders(response.orders || []);
        setPagination(response.pagination);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [refreshKey, JSON.stringify(query)]);

  return { orders, pagination, loading };
}
