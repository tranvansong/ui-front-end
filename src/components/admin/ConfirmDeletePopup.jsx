// ConfirmDeletePopup.jsx
import React from "react";
import { motion } from "framer-motion";

const ConfirmDeletePopup = ({ isOpen, onConfirm, onCancel, itemType }) => {

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-x-0 top-5 mx-auto bg-slate-100 shadow-lg rounded-lg p-4 w-1/4 z-50"
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.3 }}
    >
      <p className="text-gray-800 mb-4">
        Bạn có chắc chắn muốn xóa {itemType} này không?
      </p>
      <div className="flex justify-end space-x-4">
        <button
          onClick={onCancel}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        >
          Hủy
        </button>
        <button
          onClick={onConfirm}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Xác nhận
        </button>
      </div>
    </motion.div>
  );
};

export default ConfirmDeletePopup;