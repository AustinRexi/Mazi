import axios from "axios";
import { clearStoredAuth, getLoginPath, getStoredAuth } from "../utils/authSession";

let isInterceptorRegistered = false;

const isAuthenticationRequest = (url = "") =>
  url.includes("/login") || url.includes("/verify-2fa") || url.includes("/resend-2fa");

// These endpoints are optional helpers used while completing the withdrawal
// form. A failure to load a bank list or resolve an account must not destroy
// the current vendor session (for example, when Paystack is temporarily
// unavailable or the backend has not been deployed yet).
const isWithdrawalHelperRequest = (url = "") =>
  /\/vendor\/wallet\/(banks|resolve|beneficiaries)(?:[/?]|$)/.test(url);

const getCurrentPathname = () => {
  if (typeof window === "undefined") {
    return "/";
  }

  return window.location.hash.replace(/^#/, "") || "/";
};

export const setupAxiosInterceptors = () => {
  if (isInterceptorRegistered) {
    return;
  }

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error.response?.status;
      const requestUrl = error.config?.url || "";

      if (
        (status === 401 || status === 419) &&
        !isAuthenticationRequest(requestUrl) &&
        !isWithdrawalHelperRequest(requestUrl)
      ) {
        const pathname = getCurrentPathname();
        const { role } = getStoredAuth();
        const loginPath = getLoginPath({ role, pathname });

        clearStoredAuth();

        if (pathname !== loginPath && typeof window !== "undefined") {
          window.location.hash = loginPath;
        }
      }

      return Promise.reject(error);
    }
  );

  isInterceptorRegistered = true;
};
