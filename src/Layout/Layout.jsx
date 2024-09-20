import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const MainLayout = () => {
  return (
    <div style={styles.layout}>
      <Sidebar />
      <div style={styles.mainArea}>
        <Navbar style={styles.navbar} />
        <main style={styles.mainContent}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const styles = {
  layout: {
    display: "flex",
    height: "100vh",
  },
  mainArea: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    marginLeft: "20%", // To align with sidebar
    width: "80%",
  },
  mainContent: {
    flex: 1,
    padding: "2px",
  },
};

export default MainLayout;
