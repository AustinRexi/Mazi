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

export const fetchAdminExpenses = async (params = {}) => {
  const response = await axios.get(`${API_BASE_URL}/admin/expenses`, {
    params,
    headers: authHeaders(),
  });

  return response.data?.data || { data: [], total: 0 };
};

export const fetchAllAdminExpenses = async (params = {}) => {
  const perPage = 1000;
  const firstPage = await fetchAdminExpenses({
    ...params,
    page: 1,
    per_page: perPage,
  });

  const firstRows = Array.isArray(firstPage?.data) ? firstPage.data : [];
  const lastPage = Number(firstPage?.last_page || 1);

  if (lastPage <= 1) {
    return firstRows;
  }

  const remainingPages = await Promise.all(
    Array.from({ length: lastPage - 1 }, (_, index) =>
      fetchAdminExpenses({
        ...params,
        page: index + 2,
        per_page: perPage,
      })
    )
  );

  return [
    ...firstRows,
    ...remainingPages.flatMap((pageResult) =>
      Array.isArray(pageResult?.data) ? pageResult.data : []
    ),
  ];
};

export const fetchAdminExpenseById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/admin/expenses/${id}`, {
    headers: authHeaders(),
  });

  return response.data?.data || null;
};

export const createAdminExpense = async (payload) => {
  const response = await axios.post(`${API_BASE_URL}/admin/expenses`, payload, {
    headers: authHeaders(),
  });

  return response.data?.data || null;
};

export const updateAdminExpense = async (id, payload) => {
  const response = await axios.patch(
    `${API_BASE_URL}/admin/expenses/${id}`,
    payload,
    {
      headers: authHeaders(),
    }
  );

  return response.data?.data || null;
};

export const deleteAdminExpense = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/admin/expenses/${id}`, {
    headers: authHeaders(),
  });

  return response.data;
};
