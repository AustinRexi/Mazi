import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Adminbar from "./Adminnavbar/Adminbar";

function layout() {
  return (
    <nav>
      <Adminbar />
      {/* <Sidebar /> */}
      <Outlet />
    </nav>
  );
}

export default layout;
