import { Button } from "antd";
import Filtericon from "../../Assets/Lineicons/Filtericon.svg";
function Filterbutton() {
  return (
    <div>
      <Button
        type=""
        style={{
          borderRadius: "18px",
          marginLeft: "30px",
          marginTop: "16px",
          width: "15vh",
          height: "7vh",
          background: "#DEEAEA",
          fontSize: "14px",
          fontWeight: 500,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 8px",
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            lineHeight: "20px",
            fontSize: "14px",
            fontWeight: 500,
            color: "#121515",
          }}
        >
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
