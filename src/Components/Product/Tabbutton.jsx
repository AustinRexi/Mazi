import { Button } from "antd";
function Tabbutton({ children }) {
  const handleClick = () => {};
  return (
    <div>
      <Button
        onClick={handleClick}
        type="link"
        style={{
          color: "#494949",
          fontSize: "16px",
          fontWeight: 600,
          lineHeight: "24px",
        }}
      >
        {children}
      </Button>
    </div>
  );
}

export default Tabbutton;
