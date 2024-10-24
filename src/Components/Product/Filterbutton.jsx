import { Tooltip, Button } from "antd";
import Filter from "../../views/Product/Filter";
import Filtericon from "../../Assets/Lineicons/Filtericon.svg";

const Filterbutton = ({ data }) => {
  return (
    <div style={{ position: "relative" }}>
      <Tooltip
        title={
          <div style={{ padding: "0" }}>
            <Filter data={data} />
          </div>
        }
        placement="bottomLeft"
        color="white"
        arrowPointAtCenter
        mouseEnterDelay={0.5}
        mouseLeaveDelay={0.9}
        overlayStyle={{ maxWidth: "300px" }}
        overlayInnerStyle={{
          padding: 0,
          borderRadius: "12px",
          boxShadow: "none",
          border: "none",
        }}
      >
        <Button
          type=""
          style={{
            borderRadius: "18px",
            width: "119px",
            height: "56px",
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
              lineHeight: "10px",
              fontSize: "14px",
              fontWeight: 500,
              color: "#121515",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            Filter
            <img src={Filtericon} alt="Filter" />
          </span>
        </Button>
      </Tooltip>
    </div>
  );
};

export default Filterbutton;
