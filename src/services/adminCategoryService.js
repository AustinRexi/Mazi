import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

const authHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No admin token found.");
  }

  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  };
};

export const fetchAdminCategories = async (params = {}) => {
  const response = await axios.get(`${API_BASE_URL}/admin/categories`, {
    params,
    headers: authHeaders(),
  });

  const payload = response.data || {};
  return {
    data: payload.data || [],
    pagination: payload.pagination || { offset: 0, limit: 10, total: 0 },
  };
};

export const createAdminCategory = async (payload) => {
  const response = await axios.post(`${API_BASE_URL}/admin/categories`, payload, {
    headers: {
      ...authHeaders(),
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data?.data || null;
};

export const updateAdminCategory = async (categoryId, payload) => {
  const response = await axios.post(
    `${API_BASE_URL}/admin/categories/${categoryId}?_method=PUT`,
    payload,
    {
      headers: {
        ...authHeaders(),
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data?.data || null;
};

export const deleteAdminCategory = async (categoryId) => {
  const response = await axios.delete(`${API_BASE_URL}/admin/categories/${categoryId}`, {
    headers: authHeaders(),
  });

  return response.data;
};
