import axios from "axios";

const api_url = "http://localhost:8100/api/products/colors";

export const getColors = async () => {
  try {
    const response = await axios.get(api_url);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};