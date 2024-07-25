import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => (
  <>
    <Navbar />
    {/* <div className="container"> */}
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ paddingLeft: 0, width: "100%" }}>
        <Outlet />
      </div>
    </div>
    {/* </div> */}
  </>
);

export default Layout;
