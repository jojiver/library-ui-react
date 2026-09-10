import type { ReactNode } from "react";
import { Outlet, NavLink } from "react-router";
import { cn } from "@/lib/cn";

type DashboardLayoutProps = {
  title: string;
  navItems: { to: string; label: string }[];
  children?: ReactNode;
};

export function DashboardLayout({ title, navItems }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-200 bg-gray-50 p-4">
        <h1 className="mb-6 text-lg font-bold text-gray-900">{title}</h1>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={({ isActive }) =>
                cn(
                  "rounded-lg px-3 py-2 text-sm font-medium",
                  isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:bg-gray-200",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
