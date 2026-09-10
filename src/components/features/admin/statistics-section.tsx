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

const cards = [
  { key: "total_books", label: "Total Books" },
  { key: "available_books", label: "Available" },
  { key: "unavailable_books", label: "Unavailable" },
  { key: "total_borrowings", label: "Total Borrowings" },
  { key: "active_borrowings", label: "Active Borrowings" },
  { key: "returned_borrowings", label: "Returned" },
] as const;

export function StatisticsSection({ stats }: StatisticsSectionProps) {
  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.key}
          className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
        >
          <p className="text-sm font-medium text-gray-500">{card.label}</p>
          <p className="mt-2 text-2xl font-bold text-gray-900">
            {stats[card.key]}
          </p>
        </div>
      ))}
    </div>
  );
}