import { Button } from "antd";
function Tabbutton({ children, handleClick, id, activeTabKey, style }) {
  return (
    <div>
      <Button
        onClick={() => handleClick(id)}
        type="link"
        style={{
          marginTop: "8px",
          borderBottom: `${activeTabKey === id ? "3px solid #494949" : ""}`,
          color: "#494949",
          fontSize: "16px",
          fontWeight: 600,
          lineHeight: "24px",
          width: "50px",
          borderRadius: "2px",
          marginLeft: "10px",
          ...style,
        }}
        wrap
      >
        {children}
      </Button>
    </div>
  );
}

export default Tabbutton;
