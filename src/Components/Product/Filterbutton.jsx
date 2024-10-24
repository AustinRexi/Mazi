import { Dropdown, Button } from "antd";
import Filter from "../../views/Product/Filter";
import Filtericon from "../../Assets/Lineicons/Filtericon.svg";
import { useState } from "react";

const Filterbutton = ({ data, onFilterApply, overlay }) => {
  const [filterData, setFilterData] = useState(null);

  const handleFilterClick = (selectedFilterData) => {
    setFilterData(selectedFilterData);

    if (onFilterApply) {
      onFilterApply(selectedFilterData);
    }
  };

  // Default filter menu, which will be used if 'overlay' prop is not passed
  const filterMenu = (
    <div
      style={{
        padding: "10px",
        backgroundColor: "#fff",
        borderRadius: "4px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      }}
    >
      <Filter data={data} onFilterClick={handleFilterClick} />
    </div>
  );

  return (
<<<<<<< HEAD
    <div
      style={{ position: "relative", marginLeft: "10px", marginTop: "10px" }}
    >
      <Dropdown
        overlay={overlay || filterMenu}
        trigger={["click"]}
        placement="bottomLeft"
        arrow
=======
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
>>>>>>> dev-meg
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
      </Dropdown>
    </div>
  );
};

export default Filterbutton;
