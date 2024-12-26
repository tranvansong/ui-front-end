import apiClient from "../apiClient";

export const getAllOrders = async () => {
  try {
    const response = await apiClient.get("/orders");
    return response.data;
  } catch (error) {
    throw error.response;
  }
}

export const getOrdersByUserId = async (userId) => {
  try {
    const response = await apiClient.get(`/orders/user/${userId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};


export const createOrder = async (userId, orderRequest) => {
    try {
        const response = await apiClient.post(`/orders/save/user/${userId}`, orderRequest)
        return response.data;
    } catch (error) {
        throw error.response;
    }
}

export const getOrderByOrderCode = async (orderCode) => {
  try {
    const response = await apiClient.get(`/orders/orderCode/${orderCode}`);
    return response.data;
  } catch (error) {
    throw error.response;
  }
}

export const cancelOrder = async (orderCode) => {
  try {
    const response = await apiClient.post(`/orders/cancelOrder/${orderCode}`);
    return response.data;
  } catch (error) {
    throw error.response;
  }
}

export const confirmOrder = async (orderCode) => {
  try {
    const response = await apiClient.post(`/orders/confirmOrder/${orderCode}`)
    return response.data;
  } catch (error) {
    throw error.response;
  }
}

export const deliveringOrder = async (orderCode) => {
  try {
    const response = await apiClient.post(`/orders/deliveringOrder/${orderCode}`)
    return response.data;
  } catch (error) {
    throw error.response;
  }
}

export const deliveredOrder = async (orderCode) => {
  try {
    const response = await apiClient.post(`/orders/deliveredOrder/${orderCode}`)
    return response.data;
  } catch (error) {
    throw error.response;
  }
}