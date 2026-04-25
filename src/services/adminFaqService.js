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

export const fetchAdminFaqs = async (params = {}) => {
  const response = await axios.get(`${API_BASE_URL}/admin/faqs`, {
    params,
    headers: authHeaders(),
  });

  return response.data?.data || { data: [], total: 0, current_page: 1, per_page: 10 };
};

export const fetchAdminFaqById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/admin/faqs/${id}`, {
    headers: authHeaders(),
  });

  return response.data?.data || null;
};

export const createAdminFaq = async (payload) => {
  const response = await axios.post(`${API_BASE_URL}/admin/faqs`, payload, {
    headers: authHeaders(),
  });

  return response.data?.data || null;
};

export const updateAdminFaq = async (id, payload) => {
  const response = await axios.put(`${API_BASE_URL}/admin/faqs/${id}`, payload, {
    headers: authHeaders(),
  });

  return response.data?.data || null;
};

export const deleteAdminFaq = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/admin/faqs/${id}`, {
    headers: authHeaders(),
  });

  return response.data;
};
