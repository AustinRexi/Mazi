import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Board from "../../views/Dashboard/Board";
import VendorDashboard from "../../vendors/dashboard";

const HomeRoute = () => {
  const { user } = useContext(AuthContext);

  // If no user or still loading, show nothing for now
  if (!user) return null;

  // 🧭 Load dashboard depending on role
  if (user.role === "vendor") {
    return <VendorDashboard />;
  }

  // Default → Admin dashboard
  return <Board />;
};

export default HomeRoute;
