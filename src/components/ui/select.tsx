import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
    className?: string;
};

export function Select({
    className,
    children,
    ...props
}: SelectProps) {
    return (
        <select
            className={cn(
                "w-full rounded-lg border border-gray-300",
                "bg-white px-3 py-2",
                "text-sm text-gray-900 shadow-sm",
                "outline-none",
                "focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30",
                "disabled:cursor-not-allowed disabled:bg-gray-100",
                className
            )}
            {...props}
        >
            {children}
        </select>
    );
}