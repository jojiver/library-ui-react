import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type FilterProps = {
  children: ReactNode;
  className?: string;
};

export function Filter({ children, className }: FilterProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {children}
    </div>
  );
}
