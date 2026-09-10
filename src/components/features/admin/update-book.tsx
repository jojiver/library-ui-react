import { useState, type FormEvent } from "react";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

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
};

type UpdateBookFormProps = {
  book: Book;
  onSuccess: () => void;
  onCancel: () => void;
};

type FormErrors = {
  title?: string;
  author?: string;
  isbn?: string;
  category?: string;
  publishedYear?: string;
  quantity?: string;
  availableQuantity?: string;
};

const errorMessages: FormErrors = {
  title: "Title is required",
  author: "Author is required",
  isbn: "ISBN is required",
  category: "Category is required",
  publishedYear: "Published year is required",
  quantity: "Quantity is required",
  availableQuantity: "Available quantity is required",
};

export function UpdateBookForm({ book, onSuccess, onCancel }: UpdateBookFormProps) {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [isbn, setIsbn] = useState(book.isbn);
  const [category, setCategory] = useState(book.category);
  const [publishedYear, setPublishedYear] = useState(String(book.published_year));
  const [quantity, setQuantity] = useState(String(book.quantity));
  const [availableQuantity, setAvailableQuantity] = useState(String(book.available_quantity));
  const [status, setStatus] = useState(book.status);
  const [errors, setErrors] = useState<FormErrors>({});

  // Error Required Validations
  const checkField = (field: keyof FormErrors, value: string) => {
    setErrors({
      ...errors,
      [field]: value.trim() === "" ? errorMessages[field] : undefined,
    });
  }

  // Handle Book Submission
  const handleUpdateBook = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const values = { title, author, isbn, category, publishedYear, quantity, availableQuantity };
    const newErrors: FormErrors = {};
    let hasError = false;

    for (const field in values) {
      const key = field as keyof FormErrors;

      if (values[key].trim() === "") {
        newErrors[key] = errorMessages[key];
        hasError = true;
      }
    }

    setErrors(newErrors);

    if (hasError === true) {
      return;
    }

    try {
      await api.put(`/books/${book.id}`, {
        title,
        author,
        isbn,
        category,
        published_year: Number(publishedYear),
        quantity: Number(quantity),
        available_quantity: Number(availableQuantity),
        status,
      });

      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleUpdateBook} className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div>
        <Label error={errors.title}>Title</Label>
        <Input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            checkField("title", e.target.value);
          }}
          onBlur={() => checkField("title", title)}
          error={errors.title}
        />
      </div>

      <div>
        <Label error={errors.author}>Author</Label>
        <Input
          type="text"
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value);
            checkField("author", e.target.value);
          }}
          onBlur={() => checkField("author", author)}
          error={errors.author}
        />
      </div>

      <div>
        <Label error={errors.isbn}>ISBN</Label>
        <Input
          type="text"
          value={isbn}
          onChange={(e) => {
            setIsbn(e.target.value);
            checkField("isbn", e.target.value);
          }}
          onBlur={() => checkField("isbn", isbn)}
          error={errors.isbn}
        />
      </div>

      <div>
        <Label error={errors.category}>Category</Label>
        <Input
          type="text"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            checkField("category", e.target.value);
          }}
          onBlur={() => checkField("category", category)}
          error={errors.category}
        />
      </div>

      <div>
        <Label error={errors.publishedYear}>Published Year</Label>
        <Input
          type="number"
          value={publishedYear}
          onChange={(e) => {
            setPublishedYear(e.target.value);
            checkField("publishedYear", e.target.value);
          }}
          onBlur={() => checkField("publishedYear", publishedYear)}
          error={errors.publishedYear}
        />
      </div>

      <div>
        <Label error={errors.quantity}>Quantity</Label>
        <Input type="number" min={1} value={quantity}
          onChange={(e) => { setQuantity(e.target.value); checkField("quantity", e.target.value); }}
          onBlur={() => checkField("quantity", quantity)}
          error={errors.quantity}
        />
      </div>

      <div>
        <Label error={errors.availableQuantity}>Available Quantity</Label>
        <Input type="number" min={0} value={availableQuantity}
          onChange={(e) => { setAvailableQuantity(e.target.value); checkField("availableQuantity", e.target.value); }}
          onBlur={() => checkField("availableQuantity", availableQuantity)}
          error={errors.availableQuantity}
        />
      </div>

      <div className="md:col-span-2">
        <Label>Status</Label>
        <Select value={status} onChange={(e) => setStatus(e.target.value as Book["status"])}>
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </Select>
      </div>

      <div className="flex gap-2 md:col-span-2">
        <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" className="flex-1">
          Update Book
        </Button>
      </div>
    </form>
  );
}