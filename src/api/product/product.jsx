import apiClient from "../apiClient";


const api_url = "/products";

export const getProducts = async (query) => {
  try {
    const url = query ? `${api_url}?${query}` : api_url;
    console.log(url);
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getTopSellerProducts = async () => {
  try {
    const response = await apiClient.get("/products/top-seller");
    return response.data;
  } catch (error) {
    throw error
  }
}

export const getNewArrivals = async () => {
  try {
    const response = await apiClient.get("/products/new-arrivals");
    return response.data;
  } catch (error) {
    throw error
  }
}

export const getProductById = async (id) => {
  try {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductsByBrand = async (brand) => {
  try {
    const response = await apiClient.get(`/products/?brandName=${brand}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductsByCategory = async (category) => {
  try {
    const response = await apiClient.get(`/products/?categoryName=${category}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createProduct = async (productRequest) => {
  console.log(productRequest);
  try {
    const response = await apiClient.post(`/products/create`, productRequest);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await apiClient.delete(`/products/delete/${productId}`);
    return response.data;
  } catch (error) {
    throw error.response;
  }
}

export const updateProduct = async (id, productRequest) => {
  console.log(id, productRequest);
  try {
    const response = await apiClient.put(`/products/update/${id}`, productRequest);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};
