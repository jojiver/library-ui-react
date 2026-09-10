import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { PageLoading } from "@/components/common/loading";
import { StatisticsSection } from "@/components/features/user/statistics-section";
import {
  BorrowingsSection,
  type Borrowing,
} from "@/components/features/user/borrowings-section";

export default function UserDashboardPage() {
  const [borrowings, setBorrowings] = useState<Borrowing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMyBorrowings = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") ?? "{}");
        const response = await api.get("/borrowings", {
          params: { borrower_email: user.email, per_page: 50 },
        });
        setBorrowings(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getMyBorrowings();
  }, []);

  if (loading) return <PageLoading />;

  const active = borrowings.filter((b) => b.status === "borrowed").length;
  const returned = borrowings.filter((b) => b.status === "returned").length;

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold text-gray-900">Welcome back</h2>
      <StatisticsSection
        total={borrowings.length}
        active={active}
        returned={returned}
      />
      <BorrowingsSection borrowings={borrowings} />
    </div>
  );
}