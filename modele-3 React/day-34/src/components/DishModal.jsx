// src/components/DishModal.jsx
import Modal from "../ui/Modal";

export default function DishModal({ dish, isOpen, onClose, onAdd }) {
  if (!dish) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={dish.name}>
      <p className="text-sm text-gray-600">{dish.description}</p>
      <p className="mt-3 text-sm font-medium text-gray-900">{dish.price} ETB</p>
      <div className="mt-5 flex justify-end gap-2">
        <button
          onClick={onClose}
          className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
        >
          Close
        </button>
        <button
          onClick={() => {
            onAdd(dish);
            onClose();
          }}
          className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Add to cart
        </button>
      </div>
    </Modal>
  );
}
