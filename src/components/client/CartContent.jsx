import React, { useState, useEffect } from "react";
import { deleteCartItem, emptyCart, getCartByUserId, updateCart } from "../../api/carts/cart";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/client/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmDeletePopup from "../admin/ConfirmDeletePopup";
import { cart as mockCart } from "../../assets/data"

const CartContent = () => {
  
  const { user } = useAuth();
  const [cart, setCart] = useState(null);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const userId = user?.userId;
  console.log(user);
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await getCartByUserId(userId);
        setCart(cartData);
        console.log(cartData);
      } catch (error) {
        console.error("Lỗi khi lấy giỏ hàng:", error);
      }
    };

    fetchCart();
  }, [userId]);

  const updateCartOnServer = async (updatedCart) => {
    try {
      const payload = {
        userId,
        cartItems: updatedCart.cartItemsResponse.map((item) => ({
          cartItemId: item.cartItemId,
          productId: item.product.id,
          quantity: item.quantity,
          size: item.size,
          colorId: item.colorId,
        })),
      };

      await updateCart(userId, payload);
      toast.success("Cập nhật giỏ hàng thành công!");
      const updatedCartFromServer = await getCartByUserId(userId);
      setCart(updatedCartFromServer); // Đồng bộ lại state
    } catch (error) {
      console.error("Lỗi khi cập nhật giỏ hàng:", error);
      toast.error("Đã xảy ra lỗi khi cập nhật giỏ hàng.");
    }
  };
  const changeQuantity = (cartItemId, newQuantity) => {
    const updatedCart = {
      ...cart,
      cartItemsResponse: cart.cartItemsResponse.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
      ),
    };
    setCart(updatedCart);
    updateCartOnServer(updatedCart); // Gửi cập nhật
  };

  const changeSize = (cartItemId, newSize) => {
    const updatedCart = {
      ...cart,
      cartItemsResponse: cart.cartItemsResponse.map((item) =>
        item.cartItemId === cartItemId ? { ...item, size: newSize } : item
      ),
    };
    setCart(updatedCart);
    updateCartOnServer(updatedCart); // Gửi cập nhật
  };

  const changeColor = (cartItemId, newColorId) => {
    const updatedCart = {
      ...cart,
      cartItemsResponse: cart.cartItemsResponse.map((item) =>
        item.cartItemId === cartItemId ? { ...item, colorId: newColorId } : item
      ),
    };
    setCart(updatedCart);
    updateCartOnServer(updatedCart); // Gửi cập nhật
  };

  const handleClearCartClick = () => {
    setItemToDelete(null);
    setIsConfirmDeleteOpen(true);
  }

  const handleDeleteItem = (cartItemId) => {
    setItemToDelete(cartItemId);
    setIsConfirmDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (itemToDelete === null) {
      try {
        const result = await emptyCart(userId);
        console.log(result);
        toast.success(result);
  
        const cartData = await getCartByUserId(userId);
        setCart(cartData);
      } catch (error) {
        console.error("Failed to clear cart:", error);
        alert("Đã xảy ra lỗi khi xóa giỏ hàng. Vui lòng thử lại.");
      }
    } else {
      try {
        await deleteCartItem(itemToDelete);
        const cartData = await getCartByUserId(userId);
        setCart(cartData);
      } catch (error) {
        console.error("Failed to delete item:", error);
        alert("Đã xảy ra lỗi khi xóa sản phẩm. Vui lòng thử lại.");
      }
    }
    setIsConfirmDeleteOpen(false);
    setItemToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsConfirmDeleteOpen(false);
  };

  const handleChangeQuantity = (id, newQuantity) => {
    changeQuantity(id, newQuantity);
  };

  const handleChangeSize = (id, newSize) => {
    changeSize(id, newSize);
  };

  const handleChangeColor = (id, newColor) => {
    changeColor(id, newColor);
  }

  const formatNumber = (value) => {
    return new Intl.NumberFormat("vi-VN").format(value);
  };

  return (
    <div>
      <div className="my-12 px-10 flex gap-10">
        <div className="w-7/12 rounded-md overflow-hidden">
          <h1 className="bg-gray-200 font-semibold text-2xl p-4">Giỏ hàng</h1>
          {cart && cart.cartItemsResponse?.length > 0 ? (
            cart.cartItemsResponse.map((item) => (
              <CartItem
                key={item.cartItemId}
                item={item}
                onChangeQuantity={handleChangeQuantity}
                onChangeSize={handleChangeSize}
                onChangeColor={handleChangeColor}
                onDelete={handleDeleteItem}
              />
            ))
          ) : (
            <div className="text-center py-10">Chưa có gì trong giỏ hàng.</div>
          )}
          <div className="flex items-center justify-between mt-5">
            <Link
              to="/all-products"
              className="bg-gray-800 rounded-lg cursor-pointer transition-all duration-300 text-white text-lg font-semibold border border-gray-500 px-5 py-3 hover:bg-gray-900 hover:text-white"
            >
              Tiếp tục mua sắm
            </Link>
            <div>
              <button
                className="bg-gray-800 rounded-lg cursor-pointer transition-all duration-300 text-white text-lg font-semibold border border-gray-500 px-5 py-3 hover:bg-gray-900"
                onClick={handleClearCartClick}
              >
                Xóa giỏ hàng
              </button>
              <ToastContainer position="top-right" autoClose={2000} />
            </div>
          </div>
        </div>
        <div className="w-5/12">
          <div className="bg-slate-200 p-5 rounded-md">
            <div>
              <h1 className="bg-gray-200 font-bold border-b-2 border-slate-700 text-2xl pb-4">
                Đơn hàng
              </h1>
              <div className="mt-5">
                <h2 className="font-bold text-lg uppercase mb-3">
                  Mã giảm giá
                </h2>
                <div className="flex items-center shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-md overflow-hidden">
                  <input
                    className="text-lg outline-none w-4/5 px-3 py-2"
                    placeholder="Mã của bạn"
                    type="text"
                  />
                  <div className="bg-red-500 w-1/5 px-3 py-2 text-center text-white text-lg font-bold">
                    Áp dụng
                  </div>
                </div>
              </div>
              <div className="mt-10 py-8 border-y-2 border-dashed border-gray-400">
                <div className="flex justify-between items-center text-lg text-slate-700 font-bold mb-2">
                  <div>Đơn hàng</div>
                  <div>{formatNumber(cart?.totalPrice)} VND</div>
                </div>
                <div className="flex justify-between items-center text-lg text-slate-700 font-bold">
                  <div>Giảm giá</div>
                  <div className="font-normal">0 VND</div>
                </div>
              </div>
              <div>
                <div className="my-10 flex justify-between items-center text-2xl font-bold">
                  <div>Ước tính</div>
                  <div>{formatNumber(cart?.totalPrice)} VND</div>
                </div>
              </div>
              <Link
                to="/check-out"
                state={{
                  cart: {
                    cartId: cart?.cartId,
                    userId: cart?.userId,
                    totalPrice: cart?.totalPrice,
                    cartItems: cart?.cartItemsResponse?.map((item) => {
                      // Tìm color dựa vào colorId
                      const color = item.product.colors.find((c) => c.id === item.colorId);
                      
                      return {
                        cartItemId: item.cartItemId,
                        productId: item.product.id,
                        productName: item.product.name,
                        imageUrl: color?.images?.[0]?.image || '', // Lấy ảnh đầu tiên nếu tồn tại
                        color: color?.color || '', // Tên màu sắc
                        size: item.size,
                        quantity: item.quantity,
                        price: item.price,
                      };
                    }),
                  },
                }}
                className="mt-20 rounded-md block uppercase font-bold text-xl bg-red-500 p-5 text-white text-center hover:text-white"
              >
                Đến thanh toán
              </Link>
            </div>
          </div>
        </div>
        <ConfirmDeletePopup
            isOpen={isConfirmDeleteOpen}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
            itemType={itemToDelete ? "sản phẩm" : "giỏ hàng"}
          />
      </div>
    </div>
  );
};

export default CartContent;
