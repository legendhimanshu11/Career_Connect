import { motion } from "framer-motion";

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, itemName = "job" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white rounded-lg shadow-xl p-6 max-w-sm w-full relative"
      >
        <h2 className="text-xl font-bold mb-2">Confirm Deletion</h2>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
          Are you sure you want to delete this {itemName}? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded border hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm rounded bg-red-600 hover:bg-red-700 text-white shadow"
          >
            Delete
          </button>
        </div>

        {/* Close Button (X) */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-white text-lg"
        >
          ×
        </button>
      </motion.div>
    </div>
  );
};

export default ConfirmDeleteModal;
