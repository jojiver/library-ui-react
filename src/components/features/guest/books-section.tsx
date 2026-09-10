import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { BookCard, type Book } from "@/components/features/guest/book-card";
import { SearchBar } from "@/components/common/search/search-bar";
import { Pagination, PaginationButton } from "@/components/ui/pagination";
import { PageLoading } from "@/components/common/loading";
import { Toast } from "@/components/ui/toast";

type BooksSectionProps = {
  onBorrow: (book: Book) => void;
};

export function BooksSection({ onBorrow }: BooksSectionProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
            <BookCard key={book.id} book={book} onBorrow={onBorrow} />
          ))}
        </div>
      )}

      {lastPage > 1 && (
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
      )}
    </div>
  );
}