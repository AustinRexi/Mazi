import { Outlet } from "react-router-dom";

import Navbar from "./Adminnavbar/Adminbar";
import Sidebar from "./Adminnavbar/Sidebar";

function Layout() {
  return (
    <nav>
      <Navbar />
      <Sidebar />
      <Outlet />
    </nav>
  );
}

export default Layout;
