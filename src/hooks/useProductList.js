import { useEffect, useState } from "react";
import { fetchProductList } from "@/lib/api/products";

export default function useProductList(query = {}, refreshKey = 0) {
  const [products, setProducts] = useState([]);
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
        const response = await fetchProductList(query);
        setProducts(response.products || []);
        setPagination(response.pagination);
      } catch (err) {
        console.error("Fetch Error:", err.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [refreshKey, JSON.stringify(query)]);

  return { products, pagination, loading };
}
