import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

const loginEndpoints = [
  { path: "/admin/login", role: "admin", userKey: "admin" },
  { path: "/login-vendor", role: "vendor", userKey: "user" },
];

export const loginUser = async (credentials) => {
  let lastErrorMessage = "Invalid credentials";

  for (const endpoint of loginEndpoints) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}${endpoint.path}`,
        credentials
      );

      return {
        token: response.data?.token,
        role: endpoint.role,
        user: response.data?.[endpoint.userKey] || response.data?.user || null,
        requires2FA: Boolean(response.data?.requires_2fa),
        challengeId: response.data?.challenge_id || null,
        channel: response.data?.channel || null,
        message: response.data?.message || null,
      };
    } catch (error) {
      lastErrorMessage =
        error.response?.data?.message ||
        error.response?.data?.errors?.email?.[0] ||
        error.message ||
        lastErrorMessage;

      if (error.response?.status && error.response.status < 500) {
        continue;
      }

      throw new Error(lastErrorMessage);
    }
  }

  throw new Error(lastErrorMessage);
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
