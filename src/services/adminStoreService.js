import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

export const fetchAdminStores = async (params = {}) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No admin token found.");
  }

  const response = await axios.get(
    `${API_BASE_URL}/admin/restaurants/stores-summary`,
    {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );

  return response.data?.data || { data: [], total: 0 };
};

export const deleteAdminStore = async (storeId) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No admin token found.");
  }

  const response = await axios.delete(
    `${API_BASE_URL}/admin/restaurants/${storeId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );

  return response.data;
};
