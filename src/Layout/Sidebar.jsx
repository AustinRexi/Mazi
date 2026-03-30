import { useMediaQuery } from "react-responsive";

import MenuItem from "./MenuItems";

const Sidebar = () => {
  const isMobile = useMediaQuery({ maxWidth: 758 });

  return (
    <div
      className="sidebar"
      style={{
        display: isMobile ? "none" : "inline-block",
        width: isMobile ? "100%" : 258,
        height: isMobile ? "auto" : "100%",
        overflowY: isMobile ? "visible" : "auto",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        padding: 4,
        backgroundColor: "white",
      }}
    >
      <MenuItem />
    </div>
  );
};

export default Sidebar;
