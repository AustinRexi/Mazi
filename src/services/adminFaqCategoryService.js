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

export const fetchAdminFaqCategories = async (params = {}) => {
  const response = await axios.get(`${API_BASE_URL}/admin/faq-categories`, {
    params,
    headers: authHeaders(),
  });

  return response.data?.data || { data: [], total: 0, current_page: 1, per_page: 10 };
};

export const fetchAdminFaqCategoryById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/admin/faq-categories/${id}`, {
    headers: authHeaders(),
  });

  return response.data?.data || null;
};

export const updateAdminFaqCategory = async (id, payload) => {
  const response = await axios.put(`${API_BASE_URL}/admin/faq-categories/${id}`, payload, {
    headers: authHeaders(),
  });

  return response.data?.data || null;
};

export const deleteAdminFaqCategory = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/admin/faq-categories/${id}`, {
    headers: authHeaders(),
  });

  return response.data;
};
