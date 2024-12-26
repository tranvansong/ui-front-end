import apiClient from "../apiClient";


export const getBrands = async () => {
  try {
    const response = await apiClient.get("/brands");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error.response;
  }
};

export const createBrand = async (brandName) => {
  try {
    const response = await apiClient.post(`/brands/create?brandName=${brandName}`);
    return response.data;
  } catch (error) {
    throw error.response;
  }
}

export const updateBrand = async (brandId, brandName) => {
  try {
    const response = await apiClient.put(`/brands/update/${brandId}?brandName=${brandName}`);
    return response.data;
  } catch (error) {
    throw error.response;
  }
}

export const getBrandById = async (brandId) => {
  try {
    const response = await apiClient.get(`/brands/${brandId}`);
    return response.data;
  } catch (error) {
    throw error.response;
  }
}

export const deleteBrand = async (brandId) => {
  try {
    const response = await apiClient.delete(`/brands/delete/${brandId}`);
    return response.data;
  } catch (error) {
    throw error.response;
  }
}