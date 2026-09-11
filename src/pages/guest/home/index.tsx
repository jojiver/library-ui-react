import { useState } from "react";
import { Link } from "react-router";
import { Section } from "@/components/common/section";
import { Fleuron } from "@/components/common/fleuron";
import { BooksSection } from "@/components/features/guest/books-section";
import { BorrowModal } from "@/components/features/user/borrow-modal";
import { HomepageHeroSection } from "@/components/features/home/homepage-hero-section";
import { LibraryServicesSection } from "@/components/features/home/library-services-section";
import type { Book } from "@/components/features/guest/book-card";

export default function HomePage() {
  const [borrowingBook, setBorrowingBook] = useState<Book | null>(null);

  // Anyone can borrow from the catalog
  const handleBorrow = (book: Book) => {
    setBorrowingBook(book);
  };

  return (
    <>
      <HomepageHeroSection />
      <LibraryServicesSection />

      {/* New arrivals */}
      <Section className="py-12">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <Fleuron className="mb-3" />
            <h2 className="font-display text-2xl font-bold text-brand-900">
              New arrivals
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Recent additions to the lending collection.
            </p>
          </div>
          <Link
            to="/books"
            className="hidden text-sm font-medium text-brand-700 underline-offset-4 hover:underline md:block"
          >
            View all books
          </Link>
        </div>

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
    </>
  );
}