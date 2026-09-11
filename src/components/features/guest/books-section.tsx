import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
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
  const [searchParams] = useSearchParams();
  const [books, setBooks] = useState<Book[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [search, setSearch] = useState(searchParams.get("q") ?? "");
  const [selectedGenres, setSelectedGenres] = useState<string[]>(
    searchParams.get("genre")?.split(",").filter(Boolean) ?? [],
  );
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const toggleGenre = (g: string) => {
    setSelectedGenres((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g],
    );
    setPage(1);
  };

  // Get existing genres for the filter checkboxes
  useEffect(() => {
    let cancelled = false;

    api
      .get("/books", { params: { per_page: 1000 } })
      .then((response) => {
        if (cancelled) return;
        const unique = [
          ...new Set(
            (response.data.data as Book[]).map((book) => book.category).filter(Boolean),
          ),
        ].sort();
        setGenres(unique);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error(err);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Get All Books
  const getBooks = async () => {
    setLoading(true);
    try {
      const response = await api.get("/books", {
        params: {
          page,
          per_page: 12,
          search: search || undefined,
          category: selectedGenres.length > 0 ? selectedGenres : undefined,
        },
      });
      setBooks(response.data.data);
      setLastPage(response.data.meta.last_page);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load books");
      setBooks([]);
      setLastPage(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(getBooks, 300);
    return () => clearTimeout(delay);
  }, [page, search, selectedGenres]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <SearchBar
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search title, author, ISBN..."
        />
        {genres.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3">
            <span className="mr-1 text-sm font-medium text-gray-700">
              Genre:
            </span>
            {genres.map((g) => (
              <label
                key={g}
                className="flex cursor-pointer items-center gap-1.5 rounded-lg px-2 py-1 text-sm text-gray-600 transition-colors hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={selectedGenres.includes(g)}
                  onChange={() => toggleGenre(g)}
                  className="h-4 w-4 accent-brand-700"
                />
                {g}
              </label>
            ))}
          </div>
        )}
      </div>

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