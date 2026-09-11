import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import api from "@/lib/axios";
import { Image } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/common/section";
import { PageLoading } from "@/components/common/loading";
import { Toast } from "@/components/ui/toast";
import { BorrowModal } from "@/components/features/user/borrow-modal";
import type { Book } from "@/components/features/guest/book-card";

const statusVariant = {
  available: "success",
  unavailable: "danger",
} as const;

export default function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [borrowing, setBorrowing] = useState(false);

  useEffect(() => {
    const getBook = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/books/${id}`);
        setBook(response.data.data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load this book");
      } finally {
        setLoading(false);
      }
    };

    getBook();
  }, [id]);

  const handleBorrow = () => {
    setBorrowing(true);
  };

  const handleBorrowed = async () => {
    setBorrowing(false);
    const response = await api.get(`/books/${id}`);
    setBook(response.data.data);
  };

  if (loading) {
    return <PageLoading />;
  }

  if (error || !book) {
    return (
      <Section className="py-12">
        <Toast variant="error">{error ?? "Book not found."}</Toast>
        <Link
          to="/books"
          className="mt-4 inline-block text-sm font-medium text-brand-600 underline"
        >
          Back to catalog
        </Link>
      </Section>
    );
  }

  return (
    <Section className="py-12">
      <nav className="text-sm text-gray-400">
        <Link to="/" className="transition-colors hover:text-brand-700">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link to="/books" className="transition-colors hover:text-brand-700">
          Catalog
        </Link>
        <span className="mx-2">/</span>
        <Link
          to={`/books/${book.id}`}
          className="underline-offset-4 hover:underline"
        >
          Book details
        </Link>
      </nav>

      <div className="mt-8 flex flex-col gap-8 lg:flex-row">
        {book.book_image ? (
          <img
            src={book.book_image}
            alt={book.title}
            className="h-80 w-full rounded-2xl border border-gray-200 object-cover shadow-sm lg:w-64"
          />
        ) : (
          <div className="flex h-80 w-full items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-gray-100 shadow-sm lg:w-64">
            <Image className="h-16 w-16 text-brand-300" />
          </div>
        )}

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-3xl font-bold text-brand-900">
              {book.title}
            </h1>
            <Badge variant={statusVariant[book.status]}>{book.status}</Badge>
          </div>
          <p className="mt-2 text-gray-500">
            by <span className="font-medium text-gray-700">{book.author}</span>
          </p>

          <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 text-sm sm:grid-cols-2 lg:max-w-lg">
            <div className="rounded-lg border border-gray-200 bg-white px-4 py-3">
              <dt className="text-gray-400">Genre</dt>
              <dd className="mt-0.5 font-medium text-gray-900">
                {book.category}
              </dd>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white px-4 py-3">
              <dt className="text-gray-400">Published</dt>
              <dd className="mt-0.5 font-medium text-gray-900">
                {book.published_year}
              </dd>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white px-4 py-3">
              <dt className="text-gray-400">Availability</dt>
              <dd className="mt-0.5 font-medium text-gray-900">
                {book.available_quantity}/{book.quantity}
              </dd>
            </div>
          </dl>

          <div className="mt-8">
            <h2 className="text-sm font-semibold text-gray-900">Synopsis</h2>
            <p className="mt-1 max-w-2xl text-sm leading-7 text-gray-600">
              {book.description || "No synopsis available for this book yet."}
            </p>
          </div>

          <div className="mt-8">
            <Button
              disabled={book.available_quantity <= 0}
              onClick={handleBorrow}
            >
              Borrow this book
            </Button>
          </div>
        </div>
      </div>

      {borrowing && book && (
        <BorrowModal
          key={book.id}
          book={book}
          onClose={() => setBorrowing(false)}
          onBorrowed={handleBorrowed}
        />
      )}
    </Section>
  );
}
