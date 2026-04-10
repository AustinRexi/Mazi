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

export const fetchAdminAccounts = async (params = {}) => {
  const response = await axios.get(`${API_BASE_URL}/admin/admin-users`, {
    params,
    headers: authHeaders(),
  });

  return response.data?.data || { data: [] };
};

export const fetchAdminAccountById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/admin/admin-users/${id}`, {
    headers: authHeaders(),
  });

  return response.data?.data || null;
};

export const createAdminAccount = async (payload) => {
  const response = await axios.post(
    `${API_BASE_URL}/admin/admin-users`,
    payload,
    {
      headers: authHeaders(),
    }
  );

  return response.data?.data || null;
};

export const updateAdminAccountStatus = async (id, status) => {
  const response = await axios.patch(
    `${API_BASE_URL}/admin/admin-users/${id}/status`,
    { status },
    { headers: authHeaders() }
  );

  return response.data;
};

export const deleteAdminAccount = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/admin/admin-users/${id}`, {
    headers: authHeaders(),
  });

  return response.data;
};

export const fetchAdminRoles = async () => {
  const response = await axios.get(`${API_BASE_URL}/admin/roles`, {
    headers: authHeaders(),
  });

  return Array.isArray(response.data?.data) ? response.data.data : [];
};
