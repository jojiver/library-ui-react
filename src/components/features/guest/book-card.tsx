import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Image } from "lucide-react";

export type Book = {
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

type BookCardProps = {
  book: Book;
  onBorrow: (book: Book) => void;
};

export function BookCard({ book, onBorrow }: BookCardProps) {
  return (
    <div className="flex flex-col justify-between overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
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
            <Badge variant={statusVariant[book.status]}>{book.status}</Badge>
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
            onClick={() => onBorrow(book)}
          >
            Borrow
          </Button>
        </div>
      </div>
    </div>
  );
}