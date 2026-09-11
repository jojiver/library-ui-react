import { cn } from "@/lib/cn";
import type { HTMLAttributes, ButtonHTMLAttributes } from "react";

type PaginationProps = HTMLAttributes<HTMLDivElement>;

type PaginationButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
};

export function Pagination({ className, ...props }: PaginationProps) {
  return (
    <div className={cn("flex items-center gap-1", className)} {...props} />
  );
}

export function PaginationButton({
  className,
  active = false,
  ...props
}: PaginationButtonProps) {
  return (
    <button
      className={cn(
        "rounded-md border px-3 py-2 text-sm transition-colors hover:bg-gray-50",
        active && "border-brand-600 bg-brand-600 text-white hover:bg-brand-600",
        className,
      )}
      {...props}
    />
  );
}
