// ConfirmDeletePopup.jsx
import React from "react";

const ConfirmDeletePopup = ({ isOpen, onConfirm, onCancel, itemType }) => {

  if (!isOpen) return null;

  return (
    <div
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
    </div>
  );
};

export default ConfirmDeletePopup;
