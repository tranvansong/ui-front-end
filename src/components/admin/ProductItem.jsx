// components/admin/ProductItem.js
import React from "react";

const ProductItem = ({ product, onDelete, onViewDetails }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-600">Price: {product.price}</p>
        <p className="text-sm text-gray-600">Stock: {product.stock}</p>
        <div className="flex space-x-2 mt-4">
          <button
            onClick={() => onViewDetails(product.id)}
            className="w-full bg-blue-500 text-white text-sm font-semibold py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            View Details
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="w-full bg-red-500 text-white text-sm font-semibold py-2 px-4 rounded hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
