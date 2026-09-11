import type { ReactNode } from "react";
import { Outlet, NavLink, useNavigate } from "react-router";
import { BookOpen, LogOut } from "lucide-react";
import { cn } from "@/lib/cn";

type DashboardLayoutProps = {
  title: string;
  navItems: { to: string; label: string }[];
  children?: ReactNode;
};

export function DashboardLayout({ title, navItems }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") ?? "null");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userType");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col bg-brand-900">
        <div className="flex items-center gap-3 px-5 py-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-800 text-gold-400 ring-1 ring-gold-400/40">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <span className="block font-display text-sm font-bold leading-none text-white">
              Library System
            </span>
            <span className="mt-1 block text-xs text-gray-400">{title}</span>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-1 px-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={({ isActive }) =>
                cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-brand-700 text-white"
                    : "text-gray-400 hover:bg-brand-800 hover:text-white",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/10 p-3">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-700 text-sm font-bold text-white">
              {(user?.name ?? title).charAt(0).toUpperCase()}
            </div>
            <span className="block min-w-0 truncate text-sm font-medium text-white">
              {user?.name ?? title}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-400 transition-colors hover:bg-brand-800 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Log out
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 bg-gray-50 p-6">
        <Outlet />
      </main>
    </div>
  );
}