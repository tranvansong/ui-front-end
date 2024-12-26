import apiClient from "./apiClient";

export const login = async (email, password) => {
  try {
    const response = await apiClient.post("/auth/login", { email, password });
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const logout = async (refreshToken) => {
  try {
    const response = await apiClient.post("/auth/logout", { refreshToken });
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const register = async (email, password, repeatPassword) => {
  try {
    const response = await apiClient.post("/auth/register", {
      email,
      password,
      repeatPassword,
    });
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await apiClient.post(`/auth/forgot-password?email=${email}`);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    console.log({token, newPassword})
    const response = await apiClient.post("/auth/reset-password", { token, newPassword });
    return response.data;
  } catch (error) {
    throw error.response;
  }
};
