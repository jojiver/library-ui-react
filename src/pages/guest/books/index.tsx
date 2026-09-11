import { useState } from "react";
import { Link } from "react-router";
import { Section } from "@/components/common/section";
import { Fleuron } from "@/components/common/fleuron";
import { BooksSection } from "@/components/features/guest/books-section";
import { BorrowModal } from "@/components/features/user/borrow-modal";
import type { Book } from "@/components/features/guest/book-card";

export default function BooksPage() {
  const [borrowingBook, setBorrowingBook] = useState<Book | null>(null);

  // Anyone can borrow from the catalog
  const handleBorrow = (book: Book) => {
    setBorrowingBook(book);
  };

  return (
    <Section className="py-12">
      <nav className="mb-2 text-sm text-gray-400">
        <Link to="/" className="transition-colors hover:text-brand-700">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-600">Catalog</span>
      </nav>

      <div className="mb-8">
        <Fleuron className="mb-3" />
        <h1 className="font-display text-3xl font-bold text-brand-900">
          Book Catalog
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
          Browse books by title, author, or ISBN. Check availability in real
          time and borrow your next read from the stacks.
        </p>
      </div>

      <BooksSection onBorrow={handleBorrow} />

      {borrowingBook && (
        <BorrowModal
          key={borrowingBook.id}
          book={borrowingBook}
          onClose={() => setBorrowingBook(null)}
          onBorrowed={() => setBorrowingBook(null)}
        />
      )}
    </Section>
  );
}
