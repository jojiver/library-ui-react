import { Navigate } from "react-router";
import { DashboardLayout } from "@/components/common/dashboard-layout";

const adminNav = [
  { to: "/dashboard/admin", label: "Overview" },
  { to: "/dashboard/admin/books", label: "Manage Books" },
  { to: "/dashboard/admin/borrowings", label: "Borrowings" },
];

export function AdminLayout() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return <DashboardLayout title="Admin" navItems={adminNav} />;
}