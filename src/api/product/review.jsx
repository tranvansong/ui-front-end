import apiClient from "../apiClient";


export const submitReview = async (reviewData) => {
  try {
    const response = await apiClient.post("/reviews/save", reviewData);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const deleteReview = async (reviewId) => {
  try {
    const response = await apiClient.delete(`/reviews/delete/${reviewId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}