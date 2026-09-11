import { useState, type FormEvent } from "react";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Image } from "lucide-react";

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
  description?: string | null;
  book_image?: string | null;
};

type UpdateBookFormProps = {
  book: Book;
  onSuccess: () => void;
  onCancel: () => void;
};

type FormErrors = {
  title?: string;
  author?: string;
  genre?: string;
  publishedYear?: string;
  quantity?: string;
  availableQuantity?: string;
};

const errorMessages: FormErrors = {
  title: "Title is required",
  author: "Author is required",
  genre: "Genre is required",
  publishedYear: "Published year is required",
  quantity: "Quantity is required",
  availableQuantity: "Available quantity is required",
};

export function UpdateBookForm({ book, onSuccess, onCancel }: UpdateBookFormProps) {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [genre, setGenre] = useState(book.category);
  const [publishedYear, setPublishedYear] = useState(String(book.published_year));
  const [quantity, setQuantity] = useState(String(book.quantity));
  const [availableQuantity, setAvailableQuantity] = useState(String(book.available_quantity));
  const [status, setStatus] = useState(book.status);
  const [description, setDescription] = useState(book.description ?? "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(book.book_image ?? null);
  const [errors, setErrors] = useState<FormErrors>({});

  // Error Required Validations
  const checkField = (field: keyof FormErrors, value: string) => {
    setErrors({
      ...errors,
      [field]: value.trim() === "" ? errorMessages[field] : undefined,
    });
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);

    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(book.book_image ?? null);
    }
  };

  // Handle Book Submission
  const handleUpdateBook = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const values = { title, author, genre, publishedYear, quantity, availableQuantity };
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
      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("title", title);
      formData.append("author", author);
      formData.append("isbn", book.isbn);
      formData.append("category", genre);
      formData.append("published_year", publishedYear);
      formData.append("quantity", quantity);
      formData.append("available_quantity", availableQuantity);
      formData.append("status", status);
      formData.append("description", description);

      if (imageFile) {
        formData.append("book_image", imageFile);
      }

      await api.post(`/books/${book.id}`, formData);

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
        <Label error={errors.genre}>Genre</Label>
        <Input
          type="text"
          value={genre}
          onChange={(e) => {
            setGenre(e.target.value);
            checkField("genre", e.target.value);
          }}
          onBlur={() => checkField("genre", genre)}
          error={errors.genre}
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

      <div className="md:col-span-2">
        <Label>Description</Label>
        <Textarea
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Book description (optional)"
        />
      </div>

      <div className="md:col-span-2">
        <Label>Book Image (optional)</Label>
        <div className="flex items-center gap-4">
          <div className="flex h-24 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Book cover preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <Image className="h-6 w-6 text-gray-300" />
            )}
          </div>

          <label className="cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
            Choose image
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>

          {imageFile && (
            <button
              type="button"
              className="text-sm font-medium text-red-500 hover:text-red-700"
              onClick={() => {
                setImageFile(null);
                setImagePreview(book.book_image ?? null);
              }}
            >
              Remove
            </button>
          )}
        </div>
        <p className="mt-1 text-xs text-gray-400">
          JPG, PNG, WebP or GIF up to 2MB.
        </p>
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