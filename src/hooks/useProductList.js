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
    // 🔴 If query is null or empty → clear everything
    if (!query || Object.keys(query).length === 0) {
      setProducts([]);
      setPagination({
        totalItems: 0,
        totalPages: 1,
        currentPage: 1,
        limit: 20,
      });
      setLoading(false);
      return;
    }

    let isActive = true; // Prevent race condition

    async function loadData() {
      // 🔴 Clear previous data immediately
      setProducts([]);
      setPagination({
        totalItems: 0,
        totalPages: 1,
        currentPage: 1,
        limit: 20,
      });

      setLoading(true);

      try {
        const response = await fetchProductList(query);

        if (!isActive) return; // Prevent late response override

        setProducts(response.products || []);
        setPagination(response.pagination);
      } catch (err) {
        console.error("Fetch Error:", err.message);
      } finally {
        if (isActive) setLoading(false);
      }
    }

    loadData();

    return () => {
      isActive = false; // Cleanup to avoid race condition
    };
  }, [refreshKey, JSON.stringify(query)]);

  return { products, pagination, loading };
}
