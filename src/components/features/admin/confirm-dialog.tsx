import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  message?: string;
  onCancel: () => void;
  onConfirm: () => void;
  loading?: boolean;
};

export function ConfirmDialog({
  open,
  title,
  message,
  onCancel,
  onConfirm,
  loading,
}: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={onCancel} title={title}>
      <p className="text-sm text-gray-600">{message}</p>
      <div className="mt-6 flex justify-end gap-2">
        <Button variant="secondary" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button
          className="bg-red-600 hover:bg-red-700"
          onClick={onConfirm}
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </Modal>
  );
}