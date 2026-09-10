// src/pages/auth/user-login-page.tsx
import { Link } from "react-router";
import { UserLoginForm } from "@/components/features/auth/user-login-form";
import { Section } from "@/components/common/section";

export function UserLoginPage() {
  return (
    <Section className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="mb-1 text-xl font-bold text-gray-900">Welcome back</h1>
        <p className="mb-6 text-sm text-gray-500">Login to your library account</p>
        <UserLoginForm />
        <p className="mt-4 text-center text-sm text-gray-500">
          Are you an admin?{" "}
          <Link to="/admin/login" className="font-medium text-gray-900 underline">
            Login here
          </Link>
        </p>
      </div>
    </Section>
  );
}