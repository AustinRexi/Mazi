import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => (
  <section>
    <Navbar style={{ position: "fixed" }} />

    <div style={{ display: "flex" }}>
      <Sidebar style={{ position: "fixed" }} />
      <div style={{ width: "100%" }}>
        <Outlet />
      </div>
    </div>
  </section>
);

export default Layout;
