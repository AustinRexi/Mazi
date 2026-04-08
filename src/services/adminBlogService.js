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

export const fetchAdminBlogs = async (params = {}) => {
  const response = await axios.get(`${API_BASE_URL}/admin/blogs`, {
    params,
    headers: authHeaders(),
  });

  return response.data?.data || { data: [], total: 0, current_page: 1, per_page: 10 };
};

export const createAdminBlog = async (payload) => {
  const response = await axios.post(`${API_BASE_URL}/admin/blogs`, payload, {
    headers: {
      ...authHeaders(),
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data?.data || null;
};

export const fetchAdminBlogById = async (blogId) => {
  const response = await axios.get(`${API_BASE_URL}/admin/blogs/${blogId}`, {
    headers: authHeaders(),
  });

  return response.data?.data || null;
};

export const updateAdminBlog = async (blogId, payload) => {
  const response = await axios.post(
    `${API_BASE_URL}/admin/blogs/${blogId}?_method=PUT`,
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

export const deleteAdminBlog = async (blogId) => {
  const response = await axios.delete(`${API_BASE_URL}/admin/blogs/${blogId}`, {
    headers: authHeaders(),
  });

  return response.data;
};
