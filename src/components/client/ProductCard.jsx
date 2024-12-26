import React from "react";
import RatingStars from "./RatingStars";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, widthClass }) => {

  const navigate = useNavigate(); // Khai báo useNavigate

  const handleClick = () => {
    navigate(`/product-detail/${product.id}`); // Điều hướng đến trang chi tiết sản phẩm
  };

  return (
    <div
      className={`${widthClass} cursor-pointer mt-10 rounded-md overflow-hidden hover:shadow-2xl hover:scale-105 transition duration-300 border border-gray-100 bg-white shadow-md relative group`}
      onClick={handleClick}
    >
      <div>
        <img
          className="h-52 w-full object-cover"
          src={product.colors[0]?.images[0]?.image || 'https://firebasestorage.googleapis.com/v0/b/image-storage-ee642.appspot.com/o/1695625858562-370559332_2038835899783718_5144271391318526711_n.jpg?alt=media'}
          alt={product.name}
        />
      </div>
      <div className="mt-4 px-5">
        <div>
          <h5 className="text-md font-bold text-slate-900 truncate">
            {product.name}
          </h5>
          <div className="absolute bottom-36 left-1/2 transform -translate-x-1/2 opacity-0 w-36 group-hover:opacity-100 transition-opacity duration-300 bg-black text-white text-xs rounded py-1 px-2 z-10">
            {product.name}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-black"></div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <RatingStars rating={product.averageRating} />{" "}
          <span>{product.averageRating} ({product.reviews.length})</span>
        </div>
        <div>Đã bán: {product.soldQuantity}</div>
        <div className="my-3 flex items-center justify-between">
          <p>
            <span className="text-md font-bold text-red-500">
              Giá: {product.price.toLocaleString()} VND
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
