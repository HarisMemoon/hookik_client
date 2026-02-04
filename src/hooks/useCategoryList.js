import { useEffect, useState } from "react";
import { fetchCategoryList } from "@/lib/api/categories";

export default function useCategoryList(query = {}, refreshKey = 0) {
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    limit: 50,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const response = await fetchCategoryList(query);
        setCategories(response.categories || []);
        setPagination(response.pagination);
      } catch (err) {
        console.error("Hook Error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [refreshKey, JSON.stringify(query)]);

  return { categories, pagination, loading };
}
