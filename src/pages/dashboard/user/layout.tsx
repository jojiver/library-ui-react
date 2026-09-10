import { Navigate } from "react-router";
import { DashboardLayout } from "@/components/common/dashboard-layout";

const userNav = [
  { to: "/dashboard/user", label: "Home" },
  { to: "/dashboard/user/books", label: "Catalog" },
  { to: "/dashboard/user/borrowings", label: "My Borrowings" },
];

export function UserLayout() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <DashboardLayout title="My Library" navItems={userNav} />;
}