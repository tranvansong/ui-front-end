import React, { useEffect, useState } from "react";
import Header from "../../components/client/Header";
import Footer from "../../components/client/Footer";
import ImageSlideshow from "../../components/client/ImageSlideshow";
import RatingStars from "../../components/client/RatingStars";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useParams } from "react-router-dom";
import { getProductById } from "../../api/product/product";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addToCart } from "../../api/carts/cart";
import { useAuth } from "../../context/client/AuthContext";
import { deleteReview, submitReview } from "../../api/product/review";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useNavigate } from "react-router-dom";

const ProductDetailsPage = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedTab, setSelectedTab] = useState("information");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("");
  const [selectedVariant, setSelectedVariant] = useState(null);
  const sizes = ["XS", "S", "M", "L", "XL", "2XL"];
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(id);
        console.log(response);
        setProduct(response); // Lưu thông tin sản phẩm vào state
        if (response.colors && response.colors.length > 0) {
          setSelectedColor(response.colors[0]); // Chọn màu đầu tiên mặc định
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleQuantityChange = (delta) => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + delta;
      if (newQuantity < 1) return 1;
      if (newQuantity > 10) return 10;
      return newQuantity;
    });
  };

  const handleBuyNow = () => {
    console.log("Buy Now clicked with quantity:", quantity);
    console.log("Selected Size:", selectedSize);
    console.log("Selected color:", selectedColor);

    const totalPrice = product.price * quantity;

    const cart = {
      userId: user?.userId,
      totalPrice: totalPrice,
      cartItems: {
        productId: product.id,
        productName: product.name,
        imageUrl: selectedColor?.images?.[0]?.image || "",
        color: selectedColor?.color || "",
        size: selectedSize,
        quantity: quantity,
        price: product.price,
      },
    };

    navigate("/check-out", { state: { cart } });
  };

  const handleAddToCart = async () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Vui lòng chọn size và màu");
      return;
    }
    if (user == null) {
      toast.error("Bạn cần đăng nhập mới thêm được giỏ hàng");
      return;
    }
    const cartItem = {
      productId: product.id,
      colorId: selectedColor.id,
      variantId: selectedVariant.id,
      size: selectedSize,
      quantity: quantity,
      price: product.price,
    };
    try {
      await addToCart(user.userId, cartItem);
      toast.success("Thêm vào giỏ hàng thành công");
    } catch (error) {
      alert(error.message);
    }
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    console.log("Item to add to cart:", cartItem);
  };

  const handleWriteReview = () => {
    setShowReviewForm(true);
  };

  const handleHideReviewForm = () => {
    setShowReviewForm(false);
    setReviewText("");
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (user === null) {
      toast.error("Bạn cần đăng nhập để đánh giá");
      return;
    }

    if (!reviewText || !rating) {
      toast.error("Vui lòng điền đủ thông tin review.");
      return;
    }

    const reviewData = {
      userId: user?.userId,
      username: user?.email,
      productId: product.id,
      rating: rating,
      comment: reviewText,
    };

    try {
      await submitReview(reviewData);
      toast.success("Cảm ơn bạn đã gửi đánh giá!");

      const response = await getProductById(product.id);
      setProduct(response); // Cập nhật lại state sản phẩm với dữ liệu mới
      setReviewText("");
      setRating("");
      setShowReviewForm(false);
    } catch (error) {
      toast.error("Đã có lỗi xảy ra khi gửi review.");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(reviewId);
      toast.success("Đã xóa review thành công.");
      // Fetch lại dữ liệu sản phẩm sau khi xóa review
      const response = await getProductById(product.id);
      setProduct(response);
    } catch (error) {
      toast.error("Đã có lỗi xảy ra khi xóa review.");
    }
  };

  const hideEmailPrefix = (email) => {
    const parts = email.split("@");
    const hiddenPart = parts[0].slice(0, 2) + "*****";
    return `${hiddenPart}@${parts[1]}`;
  };

  const handleSizeSelect = (size, variant) => {
    setSelectedSize(size);
    setSelectedVariant(variant);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <div className="flex gap-12 mx-10 my-16 text-base">
        <div className="w-5/12">
          {selectedColor && (
            <ImageSlideshow
              images={selectedColor.images.map((img) => img.image)}
            />
          )}
        </div>
        <div className="w-7/12 text-lg">
          <h2 className="text-3xl font-semibold">{product.name}</h2>

          <div className="mt-4 space-x-10">
            <span className="font-semibold">
              Giá:{" "}
              <span className="text-red-500 ml-2">
                {product.price.toLocaleString()} VND
              </span>
            </span>
            <span className="font-semibold">
              Đã bán:{" "}
              <span className="text-red-500 ml-2">{product.soldQuantity}</span>
            </span>
          </div>
          <div className="mt-4">
            <span className="font-semibold">Danh mục: </span>
            <span className="ml-2">{product.category}</span>
          </div>
          <div className="mt-2">
            <span className="font-semibold">Thương hiệu: </span>
            <span className="ml-2">{product.brand}</span>
          </div>
          <div className="mt-4">
            <span className="font-semibold">
              Màu sắc:{" "}
              <div className="flex gap-4 mt-2">
                {product.colors.map((color) => (
                  <div
                    key={color.id}
                    className={`w-10 h-10 border-2 rounded-full cursor-pointer ${
                      selectedColor?.id === color.id ? "border-red-500" : ""
                    }`}
                    style={{ backgroundColor: color.colorCode }}
                    onClick={() => setSelectedColor(color)}
                  ></div>
                ))}
              </div>
            </span>
          </div>
          <div className="mt-4">
            <span className="font-semibold">Size:</span>
            <div className="grid grid-cols-4 gap-4 mt-2">
              {sizes.map((size) => {
                const matchingVariant = selectedColor?.variants.find(
                  (variant) => variant.size === size
                );

                const isDisabled =
                  !matchingVariant || matchingVariant.stock_quantity === 0;

                return (
                  <div
                    key={size}
                    className={`p-2 border rounded cursor-pointer ${
                      selectedSize === size ? "bg-blue-500 text-white" : ""
                    } ${isDisabled ? "bg-gray-300 cursor-not-allowed" : ""}`} // Áp dụng background xám nếu size không hợp lệ
                    onClick={() =>
                      !isDisabled && handleSizeSelect(size, matchingVariant)
                    } // Không chọn nếu bị disable
                  >
                    {size}
                  </div>
                );
              })}
            </div>
          </div>
          {selectedVariant && (
            <div className="mt-4">
              <span className="font-semibold">Số lượng đã bán: </span>
              <span className="ml-2">{selectedVariant.soldQuantity}</span>
            </div>
          )}
          <div className="mt-4 flex justify-between items-center">
            <div className="mt-4 flex items-center">
              <span className="font-bold mr-4">Số lượng:</span>
              <div className="w-24 border border-gray-500 relative">
                <input
                  type="text"
                  min="1"
                  max="10"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(
                      Math.max(1, Math.min(10, parseInt(e.target.value) || 1))
                    )
                  }
                  className="w-full text-base border border-b-gray-500 p-2 text-center outline-none"
                />
                <div className="w-full">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="w-1/2 text-xl font-bold border transition-all duration-300 ease-in-out hover:bg-red-500 hover:text-white hover:border-red-500 border-r-gray-500"
                    disabled={quantity === 1}
                  >
                    -
                  </button>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="w-1/2 border text-xl font-bold transition-all duration-300 ease-in-out hover:bg-red-500 hover:text-white hover:border-red-500"
                    disabled={quantity === 10}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex gap-4">
            <div>
              <button
                onClick={handleAddToCart}
                className="bg-red-500 cursor-pointer rounded-lg transition-all duration-300 text-white text-lg font-semibold border-2 border-white px-7 py-3 hover:bg-white hover:text-red-500 hover:border-red-500"
              >
                Thêm vào giỏ
              </button>
              <ToastContainer position="top-right" autoClose={1000} />
            </div>
            <button className="bg-blue-500 cursor-pointer rounded-lg transition-all duration-300 text-white text-lg font-semibold border-2 border-white px-7 py-3 hover:bg-white hover:text-blue-500 hover:border-blue-500">
              Mua ngay
            </button>
          </div>
        </div>
      </div>

      <nav className="border-t mt-10 pt-5">
        <ul className="flex justify-center gap-20 py-2 text-xl font-bold">
          <li
            className={`cursor-pointer ${
              selectedTab === "information"
                ? "text-red-600 border-b-2 pb-4 border-red-600"
                : ""
            }`}
            onClick={() => setSelectedTab("information")}
          >
            Thông tin
          </li>
          <li
            className={`cursor-pointer ${
              selectedTab === "reviews"
                ? "text-red-600 border-b-2 pb-4 border-red-600"
                : ""
            }`}
            onClick={() => setSelectedTab("reviews")}
          >
            Đánh giá
          </li>
        </ul>
      </nav>
      <div className="mx-10 my-5 border-2 p-10">
        {selectedTab === "information" && (
          <div>
            <h3 className="text-2xl font-bold">Thông tin sản phẩm</h3>
            <p className="mt-2">{product.description}</p>
          </div>
        )}

        {selectedTab === "reviews" && (
          <div className="border-2 p-10">
            <h3 className="text-2xl font-bold">Đánh giá</h3>
            <div className="my-2 border-b pb-5 border-b-slate-300">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <RatingStars rating={product.averageRating} />
                  <span className="ml-2">
                    {product.averageRating
                      ? `${product.averageRating} / 5`
                      : "Chưa có đánh giá"}
                  </span>
                </div>
              </div>
            </div>

            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((review, index) => (
                <div
                  key={index}
                  className="my-5 border-b pb-5 border-b-slate-300"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold">
                      {hideEmailPrefix(review.username)}
                    </h4>
                    <div className="flex gap-6">
                      <div className="text-lg font-semibold text-slate-500">
                        Ngày đăng: {review.createdAt}
                      </div>
                      {(user.role === "ADMIN" ||
                        user.email === review.username) && (
                        <button
                          className="text-red-500"
                          onClick={() => handleDeleteReview(review.id)}
                        >
                          <DeleteOutlineIcon />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <StarIcon key={i} style={{ color: "yellow" }} />
                    ))}
                    {Array.from({ length: 5 - review.rating }).map((_, i) => (
                      <StarBorderIcon key={i} style={{ color: "yellow" }} />
                    ))}
                  </div>
                  <p className="mt-2">{review.comment}</p>
                </div>
              ))
            ) : (
              <p>Chưa có đánh giá</p>
            )}

            <button
              onClick={handleWriteReview}
              className="mt-5 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Viết đánh giá
            </button>

            {showReviewForm && (
              <form onSubmit={handleSubmitReview} className="mt-5">
                <div className="my-3">
                  <label
                    htmlFor="rating"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Đánh giá(1-5)
                  </label>
                  <input
                    type="number"
                    id="rating"
                    name="rating"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="border border-gray-400 p-2 rounded outline-none ring-1 mt-2"
                    required
                  />
                </div>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  rows="4"
                  className="w-full border border-gray-400 p-2 rounded outline-none ring-1"
                  required
                  placeholder="Viết đánh giá của bạn"
                ></textarea>
                <div className="mt-3 flex gap-4">
                  <button
                    type="submit"
                    className="bg-green text-white px-4 py-2 rounded"
                  >
                    Gửi
                  </button>
                  <button
                    type="button"
                    onClick={handleHideReviewForm}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Hủy
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
