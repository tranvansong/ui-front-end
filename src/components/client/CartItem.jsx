import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Link } from "react-router-dom";

const CartItem = ({ item, onChangeQuantity, onChangeSize, onChangeColor, onDelete }) => {
  const [selectedColorId, setSelectedColorId] = useState(item.colorId); // Thêm state cho màu sắc được chọn
  const [selectedColor, setSelectedColor] = useState(
    item.product.colors.find((color) => color.id === item.colorId)
  );
  const [selectedImage, setSelectedImage] = useState(
    selectedColor ? selectedColor.images[0].image : ""
  );
  const [selectedSize, setSelectedSize] = useState(item.size);
  const [quantity, setQuantity] = useState(item.quantity);

  const maxQuantity = 10; // Giới hạn số lượng mua tối đa

  const selectedVariant = selectedColor
    ? selectedColor.variants.find((variant) => variant.size === selectedSize)
    : null;

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onChangeQuantity(item.cartItemId, newQuantity);
    }
  };

  const handleIncrement = () => {
    if (quantity < selectedVariant.stockQuantity) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onChangeQuantity(item.cartItemId, newQuantity);
    }
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= selectedVariant.stockQuantity) {
      setQuantity(value);
      onChangeQuantity(item.cartItemId, value);
    }
  };

  const handleSizeChange = (e) => {
    const selectedSize = e.target.value;
    setSelectedSize(selectedSize);

    const selectedVariant = selectedColor.variants.find(
      (variant) => variant.size === selectedSize
    );

    if (selectedVariant) {
      onChangeSize(item.cartItemId, selectedSize); // Thông báo cho component cha
    }
  };

  const handleColorChange = (e) => {
    const newColorId = parseInt(e.target.value, 10);
    const newColor = item.product.colors.find((color) => color.id === newColorId);

    if (newColor) {
      setSelectedColorId(newColorId); // Cập nhật state cho dropdown
      setSelectedColor(newColor); // Cập nhật thông tin màu sắc
      setSelectedImage(newColor.images[0].image); // Cập nhật hình ảnh
      setSelectedSize(newColor.variants[0].size); // Đặt lại size mặc định
      onChangeColor(item.cartItemId, newColorId); // Thông báo lên component cha
    }
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat("vi-VN").format(value);
  };

  // Tính giá trị tổng
  const totalPrice = selectedVariant ? selectedVariant.stockQuantity * item.price * quantity : 0;

  return (
    <div className="flex gap-x-6 my-8 w-full pb-2 border-b-2 border-gray-600">
      {/* Product Image */}
      <img className="w-44 h-44 bg-cover" src={selectedImage} alt={item.name} />

      {/* Product Info */}
      <div className="w-2/5">
        <Link to={`/product-detail/${item.product.id}`} className="text-2xl font-bold break-words">
          {item.product.name}
        </Link>
        <p className="text-sm font-bold text-gray-400 my-1">
          SKU: <span className="font-normal">{selectedVariant ? selectedVariant.sku : ""}</span>
        </p>
        <p className="text-base font-bold text-gray-400 my-1">
          Giá: <span className="font-normal">{formatNumber(item.price)} VND</span>
        </p>
        <div className="flex gap-16 mt-2">
          {/* Size Selector */}
          <div>
            <p className="text-base font-bold mb-2">Size</p>
            <select
              value={selectedSize}
              onChange={handleSizeChange}
              className="py-1 px-2 border border-gray-400 rounded-md"
            >
              {selectedColor &&
                selectedColor.variants.map((variant) => (
                  <option key={variant.id} value={variant.size}>
                    {variant.size}
                  </option>
                ))}
            </select>
          </div>

          {/* Color Selector */}
          <div>
            <p className="text-base font-bold mb-2">Màu sắc</p>
            <select
              value={selectedColorId}
              onChange={handleColorChange}
              className="py-1 px-2 border border-gray-400 rounded-md"
            >
              {item.product.colors.map((colorOption) => (
                <option key={colorOption.id} value={colorOption.id}>
                  {colorOption.color}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Stock Quantity */}
        {selectedVariant && (
          <p className="text-base font-bold text-gray-500 my-2">
            Còn lại: <span className="font-normal">{selectedVariant.stockQuantity}</span>
          </p>
        )}
      </div>

      {/* Quantity Management */}
      <div className="flex flex-col justify-between w-1/5">
        <div>
          <p className="text-base font-bold mb-2">Số lượng</p>
          <div className="py-2 px-3 inline-block bg-white border border-gray-400 rounded-md">
            <div className="flex items-center gap-x-1.5">
              <button
                type="button"
                onClick={handleDecrement}
                className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-400 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
              >
                <RemoveIcon style={{ fontSize: "20px" }} />
              </button>
              <input
                className="w-10 bg-transparent text-base text-gray-800 text-center outline-none"
                type="text"
                value={quantity}
                onChange={handleInputChange}
              />
              <button
                type="button"
                onClick={handleIncrement}
                className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-400 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
              >
                <AddIcon style={{ fontSize: "20px" }} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Subtotal and Delete */}
      <div className="w-1/5 flex flex-col items-end">
        <p className="text-xl font-bold text-red-500">
          {formatNumber(item.price * quantity)} <span className="text-sm">VND</span>
        </p>
        <div className="flex flex-col gap-2 mt-4">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
            onClick={() => onDelete(item.cartItemId)}
          >
            <DeleteIcon style={{ fontSize: "20px" }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
