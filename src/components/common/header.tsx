import { useState } from "react";
import { NavLink } from "react-router";
import { Menu, X, BookOpen, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { Section } from "@/components/common/section";

const navItems = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Catalog",
    to: "/books",
  },
  {
    label: "About",
    to: "/about",
  },
  {
    label: "Contact",
    to: "/contact",
  },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const token = localStorage.getItem("token");
  const dashboardPath = "/dashboard/admin";

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 shadow-sm">
      {/* Utility bar */}
      <div className="hidden border-b border-gold-500/20 bg-brand-900 text-white md:block">
        <Section className="py-0">
          <div className="flex h-9 items-center justify-between text-xs">
            <div className="flex items-center gap-5">
              <span className="inline-flex items-center gap-1.5 text-gray-300">
                <Clock className="h-3.5 w-3.5 text-gold-400" />
                Mon–Fri 7:00 AM – 9:00 PM · Sat 9:00 AM – 5:00 PM
              </span>
              <span className="hidden items-center gap-1.5 text-gray-300 lg:inline-flex">
                <MapPin className="h-3.5 w-3.5 text-gold-400" />
                Gabi, Cordova, Cebu
              </span>
            </div>
            <div className="flex items-center gap-4">
              <NavLink
                to="/admin/login"
                className="text-gray-300 transition-colors hover:text-gold-300"
              >
                Staff Login
              </NavLink>
            </div>
          </div>
        </Section>
      </div>

      {/* Mobile backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/40 transition-opacity duration-300 md:hidden",
          isMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
        onClick={closeMenu}
      />

      {/* Main bar */}
      <div className="border-b border-brand-200/70 bg-white">
        <Section className="relative z-50 py-0">
          <div className="flex h-16 items-center justify-between">
            {/* Crest + name */}
            <NavLink
              to="/"
              onClick={closeMenu}
              className="flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-900 text-gold-400 shadow-[inset_0_-2px_0_rgb(0_0_0/0.25)] ring-1 ring-gold-400/50">
                <BookOpen className="h-5 w-5" />
              </div>

              <div>
                <span className="block font-display text-lg font-bold leading-none text-brand-900">
                  Library{" "}
                  <span className="font-medium italic text-gold-600">
                    System
                  </span>
                </span>

                <span className="mt-0.5 block text-[11px] uppercase tracking-widest text-gray-500">
                  Gabi · Cordova · Cebu
                </span>
              </div>
            </NavLink>

            {/* Desktop navigation */}
            <nav className="hidden items-center gap-5 md:flex">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      "border-b-2 pb-2 pt-1 text-sm font-medium transition-colors",
                      isActive
                        ? "border-gold-500 text-brand-900"
                        : "border-transparent text-gray-600 hover:border-gray-300 hover:text-brand-800",
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Desktop account */}
            <div className="hidden items-center gap-3 md:flex">
              {token ? (
                <>
                  <NavLink to={dashboardPath}>
                    <Button variant="secondary">My Dashboard</Button>
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/admin/login">
                    <Button>Staff Login</Button>
                  </NavLink>
                </>
              )}
            </div>

            {/* Mobile button */}
            <button
              type="button"
              onClick={toggleMenu}
              className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 md:hidden"
              aria-label={
                isMenuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </Section>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "absolute left-0 right-0 top-16 z-50 border-b border-gray-200 bg-white shadow-lg md:hidden",
          "grid overflow-hidden transition-all duration-300",
          isMenuOpen
            ? "grid-rows-[1fr] opacity-100"
            : "pointer-events-none grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <nav className="space-y-1 px-4 pb-4 pt-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={closeMenu}
                className={({ isActive }) =>
                  cn(
                    "block rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-brand-50 text-brand-800"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}

            <div className="border-t border-gray-100 pt-3">
              {token ? (
                <>
                  <NavLink
                    to={dashboardPath}
                    onClick={closeMenu}
                    className="block"
                  >
                    <Button variant="secondary" className="w-full">
                      My Dashboard
                    </Button>
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to="/admin/login"
                    onClick={closeMenu}
                    className="block"
                  >
                    <Button className="w-full">Staff Login</Button>
                  </NavLink>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
