import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { Menu, X, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { Section } from "@/components/common/section";

const navItems = [
    {
        label: "Home",
        to: "/",
    },
    {
        label: "Books",
        to: "/books",
    },
];

export function Navbar() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const token = localStorage.getItem("token");

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        closeMenu();
        navigate("/");
    };

    return (
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
            {/* Mobile backdrop */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/40 transition-opacity duration-300 md:hidden",
                    isMenuOpen
                        ? "pointer-events-auto opacity-100"
                        : "pointer-events-none opacity-0"
                )}
                onClick={closeMenu}
            />

            <Section className="relative z-50 py-0">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <NavLink
                        to="/"
                        onClick={closeMenu}
                        className="flex items-center gap-2"
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-900 text-white">
                            <BookOpen className="h-5 w-5" />
                        </div>

                        <div>
                            <span className="block text-base font-bold leading-none text-gray-900">
                                Library
                            </span>

                            <span className="text-xs text-gray-500">
                                Management System
                            </span>
                        </div>
                    </NavLink>

                    {/* Desktop navigation */}
                    <nav className="hidden items-center gap-1 md:flex">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) =>
                                    cn(
                                        "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
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
                                <NavLink to="/dashboard/user">
                                    <Button variant="secondary">
                                        Dashboard
                                    </Button>
                                </NavLink>
                                <Button onClick={handleLogout}>Logout</Button>
                            </>
                        ) : (
                            <>
                                <NavLink to="/admin/login">
                                    <Button variant="secondary">Admin</Button>
                                </NavLink>
                                <NavLink to="/login">
                                    <Button>Login</Button>
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
                            isMenuOpen
                                ? "Close navigation menu"
                                : "Open navigation menu"
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

            {/* Mobile menu */}
            <div
                className={cn(
                    "absolute left-0 right-0 top-16 z-50 border-b border-gray-200 bg-white shadow-lg md:hidden",
                    "grid overflow-hidden transition-all duration-300",
                    isMenuOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "pointer-events-none grid-rows-[0fr] opacity-0"
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
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
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
                                        to="/dashboard/user"
                                        onClick={closeMenu}
                                        className="block"
                                    >
                                        <Button variant="secondary" className="w-full">
                                            Dashboard
                                        </Button>
                                    </NavLink>
                                    <NavLink
                                        to="/"
                                        onClick={handleLogout}
                                        className="mt-2 block"
                                    >
                                        <Button className="w-full">Logout</Button>
                                    </NavLink>
                                </>
                            ) : (
                                <>
                                    <NavLink
                                        to="/admin/login"
                                        onClick={closeMenu}
                                        className="mt-2 block"
                                    >
                                        <Button variant="secondary" className="w-full">
                                            Admin
                                        </Button>
                                    </NavLink>
                                    <NavLink
                                        to="/login"
                                        onClick={closeMenu}
                                        className="mt-2 block"
                                    >
                                        <Button className="w-full">Login</Button>
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