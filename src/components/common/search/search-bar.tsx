import type { InputHTMLAttributes } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";

type SearchBarProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

export function SearchBar({ className, ...props }: SearchBarProps) {
  return (
    <div className="relative w-full">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></span>
      <Input type="search" className={cn("pl-10", className)} {...props} />
    </div>
  );
}
