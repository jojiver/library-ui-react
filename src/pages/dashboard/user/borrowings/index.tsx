import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Toast } from "@/components/ui/toast";
import { Pagination, PaginationButton } from "@/components/ui/pagination";
import { PageLoading } from "@/components/common/loading";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

type Borrowing = {
  id: string;
  book_id: string;
  borrower_name: string;
  borrower_email: string;
  borrowed_at: string;
  returned_at: string | null;
  status: "borrowed" | "returned";
};

const statusVariant = {
  borrowed: "info",
  returned: "default",
} as const;

export default function UserBorrowingsPage() {
  const [borrowings, setBorrowings] = useState<Borrowing[]>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get My Borrowings
  const getBorrowings = async () => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user") ?? "{}");
      const response = await api.get("/borrowings", {
        params: { borrower_email: user.email, page, per_page: 10 },
      });
      setBorrowings(response.data.data);
      setLastPage(response.data.meta.last_page);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load borrowings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(getBorrowings, 300);
    return () => clearTimeout(delay);
  }, [page]);

  // Handle Return Book
  const handleReturnBook = async (id: string) => {
    try {
      await api.put(`/borrowings/${id}/return`);
      getBorrowings();
    } catch (err) {
      console.error(err);
      setError("Failed to return book");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold text-gray-900">My Borrowings</h2>

      {error && <Toast variant="error">{error}</Toast>}

      {loading ? (
        <PageLoading />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Borrowed At</TableHead>
              <TableHead>Returned At</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {borrowings.map((borrowing) => (
              <TableRow key={borrowing.id}>
                <TableCell className="font-medium text-gray-900">
                  {borrowing.borrowed_at.slice(0, 10)}
                </TableCell>
                <TableCell>
                  {borrowing.returned_at
                    ? borrowing.returned_at.slice(0, 10)
                    : "—"}
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariant[borrowing.status]}>
                    {borrowing.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {borrowing.status === "borrowed" && (
                    <Button
                      variant="secondary"
                      onClick={() => handleReturnBook(borrowing.id)}
                    >
                      Return
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Pagination>
        <PaginationButton
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </PaginationButton>
        {Array.from({ length: lastPage }, (_, i) => (
          <PaginationButton
            key={i + 1}
            active={page === i + 1}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </PaginationButton>
        ))}
        <PaginationButton
          disabled={page === lastPage}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </PaginationButton>
      </Pagination>
    </div>
  );
}