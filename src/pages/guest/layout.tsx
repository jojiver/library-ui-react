import { Outlet } from "react-router";
import { Navbar } from "@/components/common/header";
import { Footer } from "@/components/common/footer";

export function GuestLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}