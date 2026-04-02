import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

export const fetchAdminUsers = async (params = {}) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No admin token found.");
  }

  const response = await axios.get(`${API_BASE_URL}/admin/users`, {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  return response.data?.data || { data: [] };
};

export const updateAdminUserStatus = async (userId, status) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No admin token found.");
  }

  const response = await axios.patch(
    `${API_BASE_URL}/admin/users/${userId}/status`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );

  return response.data;
};
