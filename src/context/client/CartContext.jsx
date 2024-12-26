import React, { createContext, useContext, useState, useEffect } from "react";
import { getCartByUserId, updateCart, deleteCartItem, emptyCart } from "../../api/carts/cart";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children, userId }) => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await getCartByUserId(userId);
        setCart(cartData);
      } catch (error) {
        console.error("Lỗi khi lấy giỏ hàng:", error);
      }
    };
    if (userId) fetchCart();
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
      setCart(await getCartByUserId(userId));
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
    updateCartOnServer(updatedCart);
  };

  const changeSize = (cartItemId, newSize) => {
    const updatedCart = {
      ...cart,
      cartItemsResponse: cart.cartItemsResponse.map((item) =>
        item.cartItemId === cartItemId ? { ...item, size: newSize } : item
      ),
    };
    setCart(updatedCart);
    updateCartOnServer(updatedCart);
  };

  const changeColor = (cartItemId, newColorId) => {
    const updatedCart = {
      ...cart,
      cartItemsResponse: cart.cartItemsResponse.map((item) =>
        item.cartItemId === cartItemId ? { ...item, colorId: newColorId } : item
      ),
    };
    setCart(updatedCart);
    updateCartOnServer(updatedCart);
  };

  const deleteItem = async (cartItemId) => {
    try {
      await deleteCartItem(cartItemId);
      setCart(await getCartByUserId(userId));
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      toast.error("Đã xảy ra lỗi khi xóa sản phẩm.");
    }
  };

  const clearCart = async () => {
    try {
      await emptyCart(userId);
      setCart(await getCartByUserId(userId));
    } catch (error) {
      console.error("Lỗi khi xóa giỏ hàng:", error);
      toast.error("Đã xảy ra lỗi khi xóa giỏ hàng.");
    }
  };

  const cartLength = cart?.cartItemsResponse?.length || 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        changeQuantity,
        cartLength,
        changeSize,
        changeColor,
        deleteItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
