import Modal from "./Modal";

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  danger?: boolean;
}

const ConfirmModal = ({
  isOpen,
  title = "Are you sure?",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  danger = true,
}: ConfirmModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <h2 className="mb-2">{title}</h2>

      <p className="text-textMuted mb-6 text-sm">
        {message}
      </p>

      <div className="flex justify-end gap-3">
        <button
          className="btn-outline"
          onClick={onCancel}
        >
          {cancelText}
        </button>

        <button
          className={danger ? "btn-danger" : "btn-primary"}
          onClick={onConfirm}
        >
          {confirmText}
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
