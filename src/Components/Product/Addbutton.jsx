import { Button } from "antd";
import Addicon from "../../Assets/Lineicons/Addicon.svg";
function Addbutton() {
  return (
    <div>
      <Button
        type="primary"
        shape="round"
        style={{
          marginTop: "16px",
          marginLeft: "6px",
          width: "25vh",
          height: "6vh",
          fontSize: "17px",
          fontWeight: 500,
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
