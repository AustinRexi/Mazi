import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com"; // Replace with your backend

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/posts`, credentials); // Mock endpoint
    return { token: "mock-jwt-token" }; // Replace with real token
  } catch (error) {
    throw new Error("Invalid credentials");
  }
};
