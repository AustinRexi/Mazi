import { Button } from "antd";
import Filtericon from "../../Assets/Lineicons/Filtericon.svg";
function Filterbutton() {
  return (
    <div>
      <Button
        type=""
        style={{
          marginLeft: "30px",
          marginTop: "16px",
          width: "15vh",
          height: "6vh",
          background: "#DEEAEA",
          fontSize: "16px",
          fontWeight: 500,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 8px",
        }}
      >
        <span style={{ display: "flex", alignItems: "center" }}>
          Filter
          <img
            src={Filtericon}
            alt="Filter"
            style={{ marginTop: "4px", marginLeft: "12px" }}
          />
        </span>
      </Button>
    </div>
  );
}

export default Filterbutton;
