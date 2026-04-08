import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";
  

const parseAuthResponse = (response, role, userKey) => ({
  token: response.data?.token,
  role,
  user: response.data?.[userKey] || response.data?.user || null,
  requires2FA: Boolean(response.data?.requires_2fa),
  challengeId: response.data?.challenge_id || null,
  channel: response.data?.channel || null,
  message: response.data?.message || null,
});

const buildAuthError = (error, fallbackMessage) =>
  new Error(
    error.response?.data?.message ||
      error.response?.data?.errors?.email?.[0] ||
      error.message ||
      fallbackMessage
  );

export const loginAdmin = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin/login`, credentials);
    return parseAuthResponse(response, "admin", "admin");
  } catch (error) {
    throw buildAuthError(error, "Failed to login as admin.");
  }
};

export const loginVendor = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login-vendor`, credentials);
    return parseAuthResponse(response, "vendor", "user");
  } catch (error) {
    throw buildAuthError(error, "Failed to login as vendor.");
  }
};

export const verifyVendor2FA = async ({ challengeId, otp }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login-vendor/verify-2fa`, {
      challenge_id: challengeId,
      otp,
    });

    return {
      token: response.data?.token,
      role: "vendor",
      user: response.data?.user || null,
    };
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to verify OTP. Please try again."
    );
  }
};

export const resendVendor2FA = async (challengeId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login-vendor/resend-2fa`, {
      challenge_id: challengeId,
    });

    return response.data?.message || "OTP resent successfully.";
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to resend OTP. Please try again."
    );
  }
};

export const registerVendor = async (payload) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register-vendor`, payload);

    return {
      token: response.data?.token,
      user: response.data?.user || null,
      message: response.data?.message || "User registered successfully.",
    };
  } catch (error) {
    const errMessage =
      error.response?.data?.message ||
      error.response?.data?.errors?.email?.[0] ||
      error.response?.data?.errors?.phone?.[0] ||
      error.message ||
      "Failed to create account.";

    throw new Error(errMessage);
  }
};
