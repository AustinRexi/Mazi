import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <div>Loading...</div>;
  if (user) {
    return children;
  }

  const loginPath = location.pathname.startsWith("/admin")
    ? "/admin/login"
    : "/login";

  return <Navigate to={loginPath} />;
};

export default ProtectedRoute;
