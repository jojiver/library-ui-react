import React from "react";
import { cn } from "@/lib/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "tertiary";
  children: React.ReactNode;
};

export function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  const variantStyles = {
    primary:
      "bg-brand-800 text-white shadow-[inset_0_-2px_0_rgb(0_0_0/0.18)] hover:bg-brand-900",
    secondary: "bg-white text-gray-900 border border-gray-300 hover:bg-gray-50",
    tertiary: "bg-transparent text-brand-700 hover:underline px-0 py-0 rounded-none",
  };

  return (
    <button
      type={type}
      className={cn(
        "cursor-pointer inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/50 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 px-4 py-1.5 rounded-lg text-sm",
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}