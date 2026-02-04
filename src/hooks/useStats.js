import { useEffect, useState } from "react";
import { fetchStats } from "@/lib/api/stats";

export default function useStats(refreshKey = 0) {
  const [creatorsStats, setCreatorsStats] = useState([]);
  const [brandsStats, setBrandsStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      setLoading(true);
      try {
        const data = await fetchStats();
        setCreatorsStats(data.creatorsStats || []);
        setBrandsStats(data.brandsStats || []);
      } catch (err) {
        console.error(" Stats Error:", err.message);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, [refreshKey]);

  return {
    creatorsStats,
    brandsStats,
    loading,
  };
}
