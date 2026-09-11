import { Outlet } from "react-router";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";

export function GuestLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pb-16 sm:pb-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}