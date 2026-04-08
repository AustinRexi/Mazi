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

export const fetchDistributionSettings = async () => {
  const response = await axios.get(`${API_BASE_URL}/admin/distribution-settings`, {
    headers: authHeaders(),
  });

  return response.data?.data || null;
};

export const updateDistributionSettings = async (payload) => {
  const response = await axios.put(`${API_BASE_URL}/admin/distribution-settings`, payload, {
    headers: authHeaders(),
  });

  return response.data?.data || null;
};
