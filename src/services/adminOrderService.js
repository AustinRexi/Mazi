import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

export const fetchAdminOrderCards = async (params = {}) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No admin token found.");
  }

  const response = await axios.get(`${API_BASE_URL}/admin/orders/cards`, {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  return response.data?.data || { cards: [], summary: {} };
};

export const fetchAdminOrderById = async (id) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No admin token found.");
  }

  const response = await axios.get(`${API_BASE_URL}/admin/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  return response.data?.data || null;
};
