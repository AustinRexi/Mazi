// import { createContext, useState, useEffect } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const profileImage = localStorage.getItem("profileImage") || null;
//     if (token) {
//       setUser({ token, profileImage });
//     }
//     setLoading(false);
//   }, []);

//   const login = (token) => {
//     localStorage.setItem("token", token);
//     setUser({ token, profileImage: user?.profileImage || null });
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("profileImage");
//     setUser(null);
//   };

//   const updateProfileImage = (base64Image) => {
//     localStorage.setItem("profileImage", base64Image);
//     setUser((prev) => ({ ...prev, profileImage: base64Image }));
//   };

//   return (
//     <AuthContext.Provider
//       value={{ user, login, logout, updateProfileImage, loading }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
import { createContext, useState, useEffect } from "react";
import {
  AUTH_SESSION_CHANGED_EVENT,
  clearStoredAuth,
  getStoredAuth,
  storeAuth,
} from "../utils/authSession";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const syncUserFromStorage = () => {
      const { token, role, profileImage } = getStoredAuth();

      if (token && role) {
        setUser({ token, role, profileImage });
        return;
      }

      setUser(null);
    };

    syncUserFromStorage();
    setLoading(false);

    window.addEventListener(AUTH_SESSION_CHANGED_EVENT, syncUserFromStorage);
    window.addEventListener("storage", syncUserFromStorage);

    return () => {
      window.removeEventListener(AUTH_SESSION_CHANGED_EVENT, syncUserFromStorage);
      window.removeEventListener("storage", syncUserFromStorage);
    };
  }, []);

  const login = (token, role) => {
    const { profileImage } = getStoredAuth();
    storeAuth({ token, role, profileImage });
    setUser({ token, role, profileImage });
  };

  const logout = () => {
    clearStoredAuth();
    setUser(null);
  };

  const updateProfileImage = (base64Image) => {
    localStorage.setItem("profileImage", base64Image);
    setUser((prev) => ({ ...prev, profileImage: base64Image }));
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, updateProfileImage, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
