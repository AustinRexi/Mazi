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

  return response.data?.data || {
    cards: [],
    sales_report: {
      range: "12m",
      summary: {
        revenue: 0,
        orders: 0,
      },
      chart: {
        labels: [],
        revenue: [],
        orders: [],
      },
    },
    summary: {},
    wallet: {},
    gross_profit: 0,
    service_performance: {
      food_delivery: {
        revenue: 0,
        profit: 0,
        transactions: 0,
      },
      courier_services: {
        revenue: 0,
        profit: 0,
        transactions: 0,
      },
    },
    total_products: 0,
    product_breakdown: {},
  };
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
