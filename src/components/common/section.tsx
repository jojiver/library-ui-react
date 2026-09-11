import React from "react";
import { cn } from "@/lib/cn";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  fullWidth?: boolean;
  containerClassName?: string;
}

export function Section({
  children,
  fullWidth = false,
  className,
  containerClassName,
  ...props
}: SectionProps) {
  return (
    <section className={cn("w-full", className)} {...props}>
      {fullWidth ? (
        <div className={cn("w-full", containerClassName)}>{children}</div>
      ) : (
        <div
          className={cn(
            "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
            containerClassName,
          )}
        >
          {children}
        </div>
      )}
    </section>
  );
}