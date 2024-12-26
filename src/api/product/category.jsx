import apiClient from "../apiClient";

export const getCategories = async () => {
  try {
    const response = await apiClient("/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const createCategory = async (categoryName) => {
    try {
      const response = await apiClient.post(`/categories/create?categoryName=${categoryName}`);
      return response.data;
    } catch (error) {
      throw error.response;
    }
  }
  
  export const updateCategory = async (categoryId, categoryName) => {
    try {
      const response = await apiClient.put(`/categories/update/${categoryId}?categoryName=${categoryName}`);
      return response.data;
    } catch (error) {
      throw error.response;
    }
  }

export const getCategoryById = async (categoryId) => {
  try {
    const response = await apiClient.get(`/categories/${categoryId}`);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    const response = await apiClient.delete(`/categories/delete/${categoryId}`);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};
