import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { Image } from "lucide-react";

export type Book = {
  id: string;
  title: string;
  author: string;
  isbn?: string;
  category: string;
  published_year: number;
  quantity: number;
  available_quantity: number;
  status: "available" | "unavailable";
  description?: string | null;
  book_image?: string | null;
};

const statusVariant = {
  available: "success",
  unavailable: "danger",
} as const;

type BookCardProps = {
  book: Book;
  onBorrow: (book: Book) => void;
};

export function BookCard({ book, onBorrow }: BookCardProps) {
  return (
    <div className="flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="h-56 bg-gray-200">
        {book.book_image ? (
          <img
            src={book.book_image}
            alt={book.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-50 to-gray-100">
            <Image className="h-12 w-12 text-brand-300" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between space-y-3 p-5">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h2 className="font-semibold text-gray-900">{book.title}</h2>
            <Badge variant={statusVariant[book.status]}>{book.status}</Badge>
          </div>
          <p className="mt-1 text-sm text-gray-500">{book.author}</p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <Badge>{book.category}</Badge>
          <Badge variant="info">{book.published_year}</Badge>
        </div>

        <p
          className={cn(
            "text-sm",
            book.available_quantity <= 0 ? "text-red-500" : "text-gray-500",
          )}
        >
          {book.available_quantity}/{book.quantity} available
        </p>

        <div className="grid gap-2 lg:grid-cols-2">
          <Link to={`/books/${book.id}`}>
            <Button className="w-full">View</Button>
          </Link>
          <Button
            disabled={book.available_quantity <= 0}
            onClick={() => onBorrow(book)}
          >
            Borrow
          </Button>
        </div>
      </div>
    </div>
  );
}