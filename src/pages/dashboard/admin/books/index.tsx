import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Toast } from "@/components/ui/toast";
import { Pagination, PaginationButton } from "@/components/ui/pagination";
import { SearchBar } from "@/components/common/search/search-bar";
import { PageLoading } from "@/components/common/loading";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { AddBookForm } from "@/components/features/admin/addbook";
import { UpdateBookForm } from "@/components/features/admin/update-book";
import { ConfirmDialog } from "@/components/features/admin/confirm-dialog";

type Book = {
  id: string;
  title: string;
  author: string;
  isbn: string;
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

export default function AdminBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const [formOpen, setFormOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [deletingBook, setDeletingBook] = useState<Book | null>(null);
  const [deleting, setDeleting] = useState(false);

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
            (response.data.data as Book[])
              .map((book) => book.category)
              .filter(Boolean),
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
          per_page: 10,
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(getBooks, 300);
    return () => clearTimeout(delay);
  }, [page, search, selectedGenres]);

  // Auto-hide toast
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  // Handle Book Deletion
  const handleDeleteBook = async () => {
    if (!deletingBook) return;

    setDeleting(true);
    try {
      await api.delete(`/books/${deletingBook.id}`);
      setDeletingBook(null);
      setToast("Book deleted");
      getBooks();
    } catch (err) {
      console.error(err);
      setError("Failed to delete book");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Manage Books</h2>
        <Button
          onClick={() => {
            setEditingBook(null);
            setFormOpen(true);
          }}
        >
          Add Book
        </Button>
      </div>

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

      {error && <Toast variant="error">{error}</Toast>}
      {toast && <Toast variant="success">{toast}</Toast>}

      {loading ? (
        <PageLoading />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>Available</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id}>
                <TableCell className="font-medium text-gray-900">
                  {book.title}
                </TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.category}</TableCell>
                <TableCell>
                  {book.available_quantity}/{book.quantity}
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariant[book.status]}>
                    {book.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="tertiary"
                      onClick={() => {
                        setEditingBook(book);
                        setFormOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                    <button
                      type="button"
                      className="cursor-pointer text-sm text-red-600 hover:underline"
                      onClick={() => setDeletingBook(book)}
                    >
                      Delete
                    </button>
                  </div>
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

      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editingBook ? "Edit Book" : "Add Book"}
      >
        {editingBook ? (
          <UpdateBookForm
            book={editingBook}
            onSuccess={() => {
              setFormOpen(false);
              setToast("Book updated");
              getBooks();
            }}
            onCancel={() => setFormOpen(false)}
          />
        ) : (
          <AddBookForm
            onSuccess={() => {
              setFormOpen(false);
              setToast("Book added");
              getBooks();
            }}
            onCancel={() => setFormOpen(false)}
          />
        )}
      </Modal>

      <ConfirmDialog
        open={!!deletingBook}
        title={`Delete "${deletingBook?.title ?? ""}"?`}
        message="This action cannot be undone."
        onCancel={() => setDeletingBook(null)}
        onConfirm={handleDeleteBook}
        loading={deleting}
      />
    </div>
  );
}
