import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Image } from "lucide-react";
import { Pagination, PaginationButton } from "@/components/ui/pagination";
import { SearchBar } from "@/components/common/search/search-bar";
import { PageLoading } from "@/components/common/loading";
import { Toast } from "@/components/ui/toast";
import { BorrowModal } from "@/components/features/user/borrow-modal";

type Book = {
  id: string;
  title: string;
  author: string;
  category: string;
  published_year: number;
  quantity: number;
  available_quantity: number;
  status: "available" | "unavailable";
  book_image?: string | null;
};

const statusVariant = {
  available: "success",
  unavailable: "danger",
} as const;

export default function UserBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [borrowingBook, setBorrowingBook] = useState<Book | null>(null);

  // Get All Books
  const getBooks = async () => {
    setLoading(true);
    try {
      const response = await api.get("/books", {
        params: { page, per_page: 12, search: search || undefined },
      });
      setBooks(response.data.data);
      setLastPage(response.data.meta.last_page);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(getBooks, 300);
    return () => clearTimeout(delay);
  }, [page, search]);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold text-gray-900">Book Catalog</h2>

      <SearchBar
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        placeholder="Search title, author, ISBN..."
      />

      {error && <Toast variant="error">{error}</Toast>}

      {loading ? (
        <PageLoading />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <div
              key={book.id}
              className="flex flex-col justify-between overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
            >
              {book.book_image ? (
                <img
                  src={book.book_image}
                  alt={book.title}
                  className="h-40 w-full object-cover"
                />
              ) : (
                <div className="flex h-40 w-full items-center justify-center bg-gray-100">
                  <Image className="h-10 w-10 text-gray-300" />
                </div>
              )}

              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-gray-900">{book.title}</h3>
                    <Badge variant={statusVariant[book.status]}>
                      {book.status}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{book.author}</p>
                  <p className="mt-1 text-xs text-gray-400">
                    {book.category} · {book.published_year}
                  </p>
                </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {book.available_quantity}/{book.quantity} available
                </span>
                <Button
                  disabled={book.available_quantity <= 0}
                  onClick={() => setBorrowingBook(book)}
                >
                  Borrow
                </Button>
              </div>
              </div>
            </div>
          ))}
        </div>
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

      {borrowingBook && (
        <BorrowModal
          key={borrowingBook.id}
          book={borrowingBook}
          onClose={() => setBorrowingBook(null)}
          onBorrowed={() => {
            setBorrowingBook(null);
            getBooks();
          }}
        />
      )}
    </div>
  );
}