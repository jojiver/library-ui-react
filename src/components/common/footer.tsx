import type { HTMLAttributes } from "react";
import { NavLink } from "react-router";
import { cn } from "@/lib/cn";
import { Section } from "@/components/common/section";

type FooterProps = HTMLAttributes<HTMLElement>;

const footerLinks = [
  { label: "Home", to: "/" },
  { label: "Books", to: "/books" },
  { label: "User Login", to: "/login" },
  { label: "Admin Login", to: "/admin/login" },
];

export function Footer({ className, ...props }: FooterProps) {
  return (
    <footer
      className={cn("border-t border-gray-200 bg-white", className)}
      {...props}
    >
      <Section className="py-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-sm">
            <NavLink to="/" className="text-lg font-bold text-gray-900">
              Library System
            </NavLink>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              A simple library management system for managing books, users, and
              borrowings.
            </p>
          </div>

          {/* Links */}
          <div>
            <h2 className="text-sm font-semibold text-gray-900">Quick Links</h2>

            <nav className="mt-3 flex flex-col gap-2">
              {footerLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    cn(
                      "text-sm transition-colors",
                      isActive
                        ? "text-primary"
                        : "text-gray-500 hover:text-gray-900",
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Account */}
          <div>
            <h2 className="text-sm font-semibold text-gray-900">Account</h2>

            <nav className="mt-3 flex flex-col gap-2">
              <NavLink
                to="/login"
                className="text-sm text-gray-500 transition-colors hover:text-gray-900"
              >
                User Login
              </NavLink>

              <NavLink
                to="/admin/login"
                className="text-sm text-gray-500 transition-colors hover:text-gray-900"
              >
                Admin Login
              </NavLink>
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="text-center text-sm text-gray-500">
            © 2026 Library System. All rights reserved.
          </p>
        </div>
      </Section>
    </footer>
  );
}
