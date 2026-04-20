import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

const buildHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No admin token found.");
  }

  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  };
};

export const fetchAdminSupportTickets = async (params = {}) => {
  const response = await axios.get(`${API_BASE_URL}/admin/support/tickets`, {
    params,
    headers: buildHeaders(),
  });

  return response.data?.data || [];
};

export const replyToAdminSupportTicket = async (ticketId, message) => {
  const response = await axios.post(
    `${API_BASE_URL}/admin/support/tickets/${ticketId}/messages`,
    { message },
    { headers: buildHeaders() }
  );

  return response.data;
};

export const sendAdminSupportTyping = async (ticketId, typing) => {
  const response = await axios.post(
    `${API_BASE_URL}/admin/support/tickets/${ticketId}/typing`,
    { typing },
    { headers: buildHeaders() }
  );

  return response.data;
};

export const resolveAdminSupportTicket = async (ticketId) => {
  const response = await axios.patch(
    `${API_BASE_URL}/admin/support/tickets/${ticketId}/resolve`,
    {},
    { headers: buildHeaders() }
  );

  return response.data;
};

export const fetchRealtimeConfig = async () => {
  const response = await axios.get(`${API_BASE_URL}/realtime/config`, {
    headers: buildHeaders(),
  });

  return response.data?.data || null;
};
