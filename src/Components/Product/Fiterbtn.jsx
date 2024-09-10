import Filter from "../../views/Product/Filter";
import { Tooltip, Button } from "antd";

const text = <Filter />;

const Filterbtn = () => {
  return (
    <div style={{ position: "absolute", top: "60px", right: "200px" }}>
      <Tooltip
        title={text}
        placement="bottom"
        color="white"
        arrowPointAtCenter
        mouseEnterDelay={0.5}
        mouseLeaveDelay={0.9}
        style={{ border: "none" }}
      >
        <Button type="primary">Hover me</Button>
      </Tooltip>
    </div>
  );
};

export default Filterbtn;
