import { cn } from "@/lib/cn";
import type { LucideIcon } from "lucide-react";
import {
  BookCopy,
  CheckCircle2,
  XCircle,
  Library,
  Clock3,
  RotateCcw,
} from "lucide-react";

export type Statistics = {
  total_books: number;
  available_books: number;
  unavailable_books: number;
  total_borrowings: number;
  active_borrowings: number;
  returned_borrowings: number;
};

type StatisticsSectionProps = {
  stats: Statistics | null;
};

const cards: {
  key: keyof Statistics;
  label: string;
  icon: LucideIcon;
  iconClass: string;
}[] = [
  { key: "total_books", label: "Total Books", icon: BookCopy, iconClass: "bg-brand-50 text-brand-600" },
  { key: "available_books", label: "Available", icon: CheckCircle2, iconClass: "bg-green-50 text-green-600" },
  { key: "unavailable_books", label: "Unavailable", icon: XCircle, iconClass: "bg-red-50 text-red-600" },
  { key: "total_borrowings", label: "Total Borrowings", icon: Library, iconClass: "bg-blue-50 text-blue-600" },
  { key: "active_borrowings", label: "Active Borrowings", icon: Clock3, iconClass: "bg-yellow-50 text-yellow-600" },
  { key: "returned_borrowings", label: "Returned", icon: RotateCcw, iconClass: "bg-gray-100 text-gray-600" },
];

export function StatisticsSection({ stats }: StatisticsSectionProps) {
  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.key}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <p className="text-sm font-medium text-gray-500">{card.label}</p>
              <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", card.iconClass)}>
                <Icon className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {stats[card.key]}
            </p>
          </div>
        );
      })}
    </div>
  );
}