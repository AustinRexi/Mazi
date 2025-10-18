import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com"; // mock API

export const loginUser = async (credentials) => {
  try {
    // Simulate loading (1 second delay before checking anything)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Hardcoded admin login
    if (
      credentials.username === "admin" &&
      credentials.password === "admin123"
    ) {
      return { token: "mock-jwt-token-admin", role: "admin" };
    }

    // Hardcoded vendor login
    if (
      credentials.username === "vendor" &&
      credentials.password === "vendor123"
    ) {
      return { token: "mock-jwt-token-vendor", role: "vendor" };
    }

    // Optional: mock fallback API call
    const response = await axios.post(`${API_URL}/posts`, credentials);
    return { token: "mock-jwt-token", role: "vendor" };
  } catch (error) {
    throw new Error("Invalid credentials");
  }
};
