import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type StatisticsCardProps = {
  title: string;
  value: string | number;
  icon?: ReactNode;
  className?: string;
};

export function StatisticsCard({
  title,
  value,
  icon,
  className,
}: StatisticsCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-gray-200",
        "bg-white p-5 shadow-sm",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">{title}</p>

        {icon && <div className="text-gray-500">{icon}</div>}
      </div>
      <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
