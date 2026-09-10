import { useState } from "react";
import { useNavigate } from "react-router";
import { Section } from "@/components/common/section";
import { BooksSection } from "@/components/features/guest/books-section";
import { BorrowModal } from "@/components/features/user/borrow-modal";
import type { Book } from "@/components/features/guest/book-card";
import heroImage from "@/assets/hero.png";

export default function GuestHomePage() {
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
    <div className="flex flex-col gap-10">
      <section className="border-b border-gray-200 bg-gray-50">
        <Section className="flex items-center justify-between gap-8">
          <div className="max-w-xl">
            <h1 className="text-3xl font-bold text-gray-900">
              Discover your next read
            </h1>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Browse the school library catalog, check availability, and borrow
              a book — no account needed to explore.
            </p>
          </div>
          <img
            src={heroImage}
            alt="Library illustration"
            className="hidden h-40 w-40 object-contain md:block"
          />
        </Section>
      </section>

      <Section className="pt-0">
        <BooksSection onBorrow={handleBorrow} />
      </Section>

      {borrowingBook && (
        <BorrowModal
          key={borrowingBook.id}
          book={borrowingBook}
          onClose={() => setBorrowingBook(null)}
          onBorrowed={() => setBorrowingBook(null)}
        />
      )}
    </div>
  );
}