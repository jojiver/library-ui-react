// src/pages/auth/admin-login-page.tsx
import { ShieldCheck } from "lucide-react";
import { AdminLoginForm } from "@/components/features/auth/admin-login-form";

export function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-10 px-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
        {/* Brand banner */}
        <div className="bg-gradient-to-br from-brand-900 via-brand-900 to-brand-800 px-8 py-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-800 text-gold-400 shadow-[inset_0_-2px_0_rgb(0_0_0/0.3)] ring-1 ring-gold-400/50">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h1 className="font-display text-xl font-bold text-white">
            Library Staff Login
          </h1>
          <p className="mt-1 text-sm text-gray-300">
            Authorized personnel only
          </p>
        </div>

        <div className="p-8">
          <AdminLoginForm />
        </div>
      </div>
    </div>
  );
}