import { Button } from "antd";
function Tabbutton({ children, handleClick, id, activeTabKey, style }) {
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
        }}
        wrap
      >
        {children}
      </Button>
    </div>
  );
}

export default Tabbutton;
