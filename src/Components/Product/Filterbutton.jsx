import { Tooltip, Button } from "antd";
import Filter from "../../views/Product/Filter";
import Filtericon from "../../Assets/Lineicons/Filtericon.svg";

const Filterbutton = ({ data }) => {
  return (
    <div
      style={{ position: "relative", marginLeft: "10px", marginTop: "10px" }}
    >
      <Tooltip
        title={<Filter data={data} />}
        placement="bottomLeft"
        color="white"
        arrowPointAtCenter
        mouseEnterDelay={0.5}
        mouseLeaveDelay={0.9}
        overlayInnerStyle={{ border: "none" }}
      >
        <Button
          type=""
          style={{
            marginLeft: "10px",
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
      </Tooltip>
    </div>
  );
};

export default Filterbutton;
