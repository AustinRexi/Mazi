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

export const fetchAdminSettings = async () => {
  const response = await axios.get(`${API_BASE_URL}/admin/settings`, {
    headers: authHeaders(),
  });

  return response.data?.data || {};
};

export const updateAdminProfile = async (payload) => {
  const response = await axios.patch(`${API_BASE_URL}/admin/settings/profile`, payload, {
    headers: authHeaders(),
  });

  return response.data?.data || {};
};

export const updateAdminPassword = async (payload) => {
  const response = await axios.patch(`${API_BASE_URL}/admin/settings/password`, payload, {
    headers: authHeaders(),
  });

  return response.data?.data || {};
};

export const updateAdminTransactionPin = async (payload) => {
  const response = await axios.patch(
    `${API_BASE_URL}/admin/settings/transaction-pin`,
    payload,
    {
      headers: authHeaders(),
    }
  );

  return response.data?.data || {};
};

export const updateAdminPreferences = async (payload) => {
  const response = await axios.patch(
    `${API_BASE_URL}/admin/settings/preferences`,
    payload,
    {
      headers: authHeaders(),
    }
  );

  return response.data?.data || {};
};

