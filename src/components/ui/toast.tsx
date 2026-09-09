import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

type ToastProps = HTMLAttributes<HTMLDivElement> & {
  variant?: "success" | "error" | "info";
};

export function Toast({
  className,
  variant = "success",
  ...props
}: ToastProps) {
  const variants = {
    success: "border-green-200 bg-green-50 text-green-700",
    error: "border-red-200 bg-red-50 text-red-700",
    info: "border-blue-200 bg-blue-50 text-blue-700",
  };
  return (
    <div
      className={cn(
        "rounded-lg border px-4 py-3 text-sm shadow-sm",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
