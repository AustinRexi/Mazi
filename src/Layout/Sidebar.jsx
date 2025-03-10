import { useMediaQuery } from "react-responsive";

import MenuItem from "./MenuItems";

const Sidebar = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <div
      className="sidebar"
      style={{
        display: isMobile ? "none" : "inline-block",
        width: isMobile ? "100%" : "258px",
        minHeight: "100vh",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        padding: 4,
      }}
    >
      <MenuItem />
    </div>
  );
};

export default Sidebar;
