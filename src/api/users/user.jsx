import apiClient from "../apiClient";

export const getAllAccounts = async () => {
    try {
        const response = await apiClient.get("/admin/users");
        return response.data;
    } catch (error) {
        throw error.response;
    }
};

export const getRoles = async () => {
    try {
        const response = await apiClient.get("/admin/users/roles")
        return response.data;
    } catch (error) {
        throw error.response;
    }
}

export const getAllAdmins = async () => {
    try {
        const response = await apiClient.get("/admin/users/list-admins");
        return response.data;
    } catch (error) {
        throw error.response;
    }
};

export const getUserById = async (id) => {
    try {
        const response = await apiClient.get(`/admin/users/${id}`);
        return response.data;
    } catch (error) {
        throw error.response;
    }
};

export const createUser = async (userRequest) => {
    try {
        const response = await apiClient.post("/admin/users/create-user", userRequest);
        return response.data;
    } catch (error) {
        throw error.response;
    }
};

// Cập nhật thông tin người dùng theo ID
export const updateUser = async (id, userRequest) => {
    try {
        const response = await apiClient.put(`/admin/users/update/${id}`, userRequest);
        return response.data;
    } catch (error) {
        throw error.response;
    }
};

// Xóa người dùng theo ID
export const deleteUser = async (id) => {
    try {
        const response = await apiClient.delete(`/admin/users/delete/${id}`);
        return response.data;
    } catch (error) {
        throw error.response;
    }
};


export const getUserInfoById = async (credentialId) => {
    try {
        const response = await apiClient.get(`/admin/users-info/credentialId/${credentialId}`);
        return response.data;
    } catch (error) {
        throw error.response;
    }
}

export const createUserInfo = async (userRequest) => {
    try {
        const response = await apiClient.post(`/admin/users-info/create`, userRequest);
        return response.data;
    } catch (error) {
        throw error.response;
    }
}

export const updateUserInfo = async (id, userRequest) => {
    try {
        const response = await apiClient.put(`/admin/users-info/update/${id}`, userRequest)
        return response.data;
    } catch (error) {
        throw error.response;
    }
}

export const deteteUserInfo = async (credentialId) => {
    try {
        const response = await apiClient.delete(`/admin/users-info/delete/credentialId/${credentialId}`)
        return response.data;
    } catch (error) {
        throw error.response;
    }
}