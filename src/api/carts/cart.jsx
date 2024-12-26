import apiClient from "../apiClient";

export const getCartByUserId = async (userId) => {
  try {
    const response = await apiClient.get(`/carts/${userId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const addToCart = async (userId, cartItem) => {
  try {
    const response = await apiClient.post(
      `/carts/addToCart/user/${userId}`,
      cartItem
    );
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const emptyCart = async (userId) => {
  try {
    const response = await apiClient.post(`/carts/emptyCart/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const deleteCartItem = async (cartId) => {
  try {
    const response = await apiClient.delete(`/carts/delete/cartItem/${cartId}`);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const updateCart = async (userId, cartData) => {
  console.log(cartData)
  try {
    const response = await apiClient.put(`/carts/updateCart/user/${userId}`, cartData);
    return response.data;
  } catch (error) {
    throw error.response; 
  }

}