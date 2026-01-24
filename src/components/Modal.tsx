import type { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-surface rounded-2xl shadow-card p-6 w-full max-w-md z-10">
        <button onClick={onClose} className="absolute top-3 right-3 text-textMuted hover:text-primary" >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
