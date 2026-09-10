import { useState } from "react";
import { useNavigate } from "react-router";
import { Section } from "@/components/common/section";
import { BooksSection } from "@/components/features/guest/books-section";
import { BorrowModal } from "@/components/features/user/borrow-modal";
import type { Book } from "@/components/features/guest/book-card";

export default function GuestBooksPage() {
  const navigate = useNavigate();
  const [borrowingBook, setBorrowingBook] = useState<Book | null>(null);

  // Guests are redirected to the login page before borrowing
  const handleBorrow = (book: Book) => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }

    setBorrowingBook(book);
  };

  return (
    <Section>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Book Catalog</h1>
        <p className="mt-1 text-sm text-gray-500">
          Browse the collection and borrow your next read.
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