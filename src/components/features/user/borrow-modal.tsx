import { useState, type FormEvent } from "react";
import api from "@/lib/axios";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type Book = {
  id: string;
  title: string;
};

type BorrowModalProps = {
  book: Book;
  onClose: () => void;
  onBorrowed: () => void;
};

type FormErrors = {
  borrowerName?: string;
  borrowerEmail?: string;
};

const errorMessages: FormErrors = {
  borrowerName: "Your name is required",
  borrowerEmail: "Your email is required",
};

export function BorrowModal({ book, onClose, onBorrowed }: BorrowModalProps) {
  const [borrowerName, setBorrowerName] = useState("");
  const [borrowerEmail, setBorrowerEmail] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [borrowing, setBorrowing] = useState(false);

  // Error Required Validations
  const checkField = (field: keyof FormErrors, value: string) => {
    setErrors({
      ...errors,
      [field]: value.trim() === "" ? errorMessages[field] : undefined,
    });
  };

  // Handle Borrow Submission
  const handleBorrow = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const values = { borrowerName, borrowerEmail };
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

    setBorrowing(true);
    setFormError(null);

    try {
      await api.post("/borrowings", {
        book_id: book.id,
        borrower_name: borrowerName,
        borrower_email: borrowerEmail,
      });

      setBorrowerName("");
      setBorrowerEmail("");
      onBorrowed();
    } catch (error) {
      console.error(error);
      setFormError(
        (error as { response?: { data?: { message?: string } } }).response?.data
          ?.message ?? "Unable to borrow this book right now",
      );
    } finally {
      setBorrowing(false);
    }
  };

  return (
    <Modal open onClose={onClose} title={`Borrow "${book.title}"`}>
      <form onSubmit={handleBorrow} className="flex flex-col gap-4">
        <div>
          <Label error={errors.borrowerName}>Your Name</Label>
          <Input
            type="text"
            value={borrowerName}
            onChange={(e) => {
              setBorrowerName(e.target.value);
              checkField("borrowerName", e.target.value);
            }}
            onBlur={() => checkField("borrowerName", borrowerName)}
            error={errors.borrowerName}
          />
        </div>

        <div>
          <Label error={errors.borrowerEmail}>Your Email</Label>
          <Input
            type="email"
            value={borrowerEmail}
            onChange={(e) => {
              setBorrowerEmail(e.target.value);
              checkField("borrowerEmail", e.target.value);
            }}
            onBlur={() => checkField("borrowerEmail", borrowerEmail)}
            error={errors.borrowerEmail}
          />
        </div>

        {formError && <p className="text-sm text-red-600">{formError}</p>}

        <div className="flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={borrowing}>
            {borrowing ? "Borrowing..." : "Confirm Borrow"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}