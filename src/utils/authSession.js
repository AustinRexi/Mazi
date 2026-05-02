export const AUTH_SESSION_CHANGED_EVENT = "auth:session-changed";

const TOKEN_KEY = "token";
const ROLE_KEY = "role";
const PROFILE_IMAGE_KEY = "profileImage";

const notifySessionChange = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(AUTH_SESSION_CHANGED_EVENT));
};

export const getStoredAuth = () => {
  if (typeof window === "undefined") {
    return { token: null, role: null, profileImage: null };
  }

  return {
    token: localStorage.getItem(TOKEN_KEY),
    role: localStorage.getItem(ROLE_KEY),
    profileImage: localStorage.getItem(PROFILE_IMAGE_KEY) || null,
  };
};

export const storeAuth = ({ token, role, profileImage }) => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(ROLE_KEY, role);

  if (profileImage) {
    localStorage.setItem(PROFILE_IMAGE_KEY, profileImage);
  }

  notifySessionChange();
};

export const clearStoredAuth = () => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
  localStorage.removeItem(PROFILE_IMAGE_KEY);
  notifySessionChange();
};

export const getLoginPath = ({ role, pathname } = {}) => {
  if (role === "vendor" || pathname?.startsWith("/vendors")) {
    return "/login";
  }

  return "/admin/login";
};
