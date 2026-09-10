type StatisticsSectionProps = {
  total: number;
  active: number;
  returned: number;
};

export function StatisticsSection({
  total,
  active,
  returned,
}: StatisticsSectionProps) {
  const cards = [
    { label: "Total Borrowed", value: total },
    { label: "Currently Borrowed", value: active },
    { label: "Returned", value: returned },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
        >
          <p className="text-sm font-medium text-gray-500">{card.label}</p>
          <p className="mt-2 text-2xl font-bold text-gray-900">{card.value}</p>
        </div>
      ))}
    </div>
  );
}