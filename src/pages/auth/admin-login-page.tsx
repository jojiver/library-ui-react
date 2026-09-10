// src/pages/auth/admin-login-page.tsx
import { Link } from "react-router";
import { AdminLoginForm } from "@/components/features/auth/admin-login-form";
import { Section } from "@/components/common/section";

export function AdminLoginPage() {
  return (
    <Section className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="mb-1 text-xl font-bold text-gray-900">Admin Login</h1>
        <p className="mb-6 text-sm text-gray-500">Sign in to manage the library</p>
        <AdminLoginForm />
        <p className="mt-4 text-center text-sm text-gray-500">
          Regular user?{" "}
          <Link to="/login" className="font-medium text-gray-900 underline">
            Login here
          </Link>
        </p>
      </div>
    </Section>
  );
}