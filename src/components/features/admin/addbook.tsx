import { useState, type FormEvent } from "react";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Image } from "lucide-react";

type AddBookFormProps = {
  onSuccess: () => void;
  onCancel: () => void;
};

type FormErrors = {
  title?: string;
  author?: string;
  isbn?: string;
  genre?: string;
  publishedYear?: string;
  quantity?: string;
  description?: string;
};

const errorMessages: FormErrors = {
  title: "Title is required",
  author: "Author is required",
  isbn: "ISBN is required",
  genre: "Genre is required",
  publishedYear: "Published year is required",
  quantity: "Quantity is required",
  description: "Description is required",
};

export function AddBookForm({ onSuccess, onCancel }: AddBookFormProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [genre, setGenre] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  // Error Required Validations
  const checkField = (field: keyof FormErrors, value: string) => {
    setErrors({
      ...errors,
      [field]: value.trim() === "" ? errorMessages[field] : undefined,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);

    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  // Handle Book Submission
  const handleAddBook = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const values = {
      title,
      author,
      isbn,
      genre,
      publishedYear,
      quantity,
      description,
    };
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
      formData.append("title", title);
      formData.append("author", author);
      formData.append("isbn", isbn);
      formData.append("category", genre);
      formData.append("published_year", publishedYear);
      formData.append("quantity", quantity);
      formData.append("available_quantity", quantity);
      formData.append("status", "available");
      formData.append("description", description);

      if (imageFile) {
        formData.append("book_image", imageFile);
      }

      await api.post("/books", formData);

      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleAddBook}
      className="grid grid-cols-1 md:grid-cols-2 gap-3"
    >
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
        <Input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => {
            setQuantity(e.target.value);
            checkField("quantity", e.target.value);
          }}
          onBlur={() => checkField("quantity", quantity)}
          error={errors.quantity}
        />
      </div>

      <div className="md:col-span-2">
        <Label error={errors.description}>Description</Label>
        <Textarea
          rows={4}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            checkField("description", e.target.value);
          }}
          onBlur={() => checkField("description", description)}
          error={errors.description}
          placeholder="Describe the book"
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
                setImagePreview(null);
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
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button type="submit" className="flex-1">
          Add Book
        </Button>
      </div>
    </form>
  );
}
