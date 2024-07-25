import { Button } from "antd";
function Tabbutton({ children, handleClick, id, activeTabKey }) {
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
          width: "70px",
          borderRadius: "6px",
        }}
        wrap
      >
        {children}
      </Button>
    </div>
  );
}

export default Tabbutton;
