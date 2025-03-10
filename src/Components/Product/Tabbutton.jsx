import { Button } from "antd";
function Tabbutton({ children, handleClick, id, activeTabKey, style }) {
  const isMobile = window.innerWidth <= 1024;
  return (
    <div>
      <Button
        onClick={() => handleClick(id)}
        type="link"
        style={{
          borderBottom: `${activeTabKey === id ? "3px solid #494949" : ""}`,
          fontWeight: `${activeTabKey === id ? "600px" : "500px"}`,
          fontFamily: `${
            activeTabKey === id
              ? "NeueHaasDisplayMediu"
              : "NeueHaasDisplayRoman"
          }`,
          ...style,
          height: isMobile ? "40px" : style.height || "auto",
        }}
        wrap
      >
        {children}
      </Button>
    </div>
  );
}

export default Tabbutton;
