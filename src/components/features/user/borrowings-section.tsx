import { Badge } from "@/components/ui/badge";

export type Borrowing = {
  id: string;
  book_id: string;
  borrower_name: string;
  borrower_email: string;
  borrowed_at: string;
  returned_at: string | null;
  status: "borrowed" | "returned";
};

type BorrowingsSectionProps = {
  borrowings: Borrowing[];
};

export function BorrowingsSection({ borrowings }: BorrowingsSectionProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 font-semibold text-gray-900">My Borrowings</h3>
      {borrowings.length === 0 ? (
        <p className="text-sm text-gray-500">You have no borrowings yet.</p>
      ) : (
        <ul className="divide-y divide-gray-100">
          {borrowings.map((borrowing) => (
            <li
              key={borrowing.id}
              className="flex items-center justify-between py-2 text-sm"
            >
              <span className="text-gray-700">
                {borrowing.borrowed_at.slice(0, 10)}
              </span>
              <Badge variant={borrowing.status === "borrowed" ? "info" : "default"}>
                {borrowing.status}
              </Badge>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}