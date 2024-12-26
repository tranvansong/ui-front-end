import apiClient from "../apiClient";

export const uploadImage = async (formData) => {
  try {
    const response = await apiClient.post(`/upload/images`, formData);

    return response.data;
  } catch (error) {
    throw error.response;
  }
};
