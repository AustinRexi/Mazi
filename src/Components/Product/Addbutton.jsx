import { Button } from "antd";
import Addicon from "../../Assets/Lineicons/Addicon.svg";
function Addbutton() {
  return (
    <div>
      <Button
        type="primary"
        shape="round"
        style={{
          gap: "12px",
          borderRadius: "24px",
          marginTop: "16px",
          marginLeft: "6px",
          //   width: "25vh",
          height: "7vh",
          width: "177px",
          fontSize: "17px",
          fontWeight: 500,
          padding: "14px,28px,14px,28px",
        }}
      >
        Add product
        <img
          src={Addicon}
          alt="add"
          style={{ marginTop: "5px", marginLeft: "12px", paddingRight: "8px" }}
        />
      </Button>
    </div>
  );
}

export default Addbutton;
