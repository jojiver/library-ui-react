import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { PageLoading } from "@/components/common/loading";
import {
  StatisticsSection,
  type Statistics,
} from "@/components/features/admin/statistics-section";
import { QuickActionsSection } from "@/components/features/admin/quick-actions-section";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStatistics = async () => {
      try {
        const response = await api.get("/library/statistics");
        setStats(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getStatistics();
  }, []);

  if (loading) return <PageLoading />;

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold text-gray-900">Overview</h2>
      <StatisticsSection stats={stats} />
      <QuickActionsSection />
    </div>
  );
}