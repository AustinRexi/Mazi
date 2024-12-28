import { Button } from "antd";
import Addicon from "../../Assets/Lineicons/Addicon.svg";

function Addbutton({ onClick, text = "Add product" }) {
  return (
    <div>
      <Button
        type="primary"
        shape="round"
        size="large"
        style={{
          borderRadius: "24px",
          marginTop: "16px",
          marginLeft: "6px",
          height: "8vh",
          width: "160px",

          padding: "14px, 28px, 14px, 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
        }}
        onClick={onClick}
      >
        <span
          style={{
            lineHeight: "24px",
            fontFamily: "NeueHaasDisplayLight",
            fontSize: "18px",
            fontWeight: 500,
          }}
        >
          {text}
        </span>
        <img
          src={Addicon}
          alt="add"
          style={{ marginTop: "2px", marginLeft: "6px", paddingRight: "6px" }}
        />
      </Button>
    </div>
  );
}

export default Addbutton;
