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

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const profileImage = localStorage.getItem("profileImage") || null;
    if (token && role) {
      setUser({ token, role, profileImage });
    }
    setLoading(false);
  }, []);

  const login = (token, role) => {
    const profileImage = localStorage.getItem("profileImage") || null;
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    setUser({ token, role, profileImage });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("profileImage");
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
