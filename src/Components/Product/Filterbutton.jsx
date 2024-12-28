import { Dropdown, Button } from "antd";
import Filter from "../../views/Product/Filter";
import Filtericon from "../../Assets/Lineicons/Filtericon.svg";
import { useState } from "react";

const Filterbutton = ({ data, onFilterApply, overlay, text, style }) => {
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
      <Filter data={data} onFilterClick={handleFilterClick} text={text} />
    </div>
  );

  return (
    <div
      style={{ position: "relative", marginLeft: "10px", marginTop: "10px" }}
    >
      <Dropdown
        overlay={overlay || filterMenu}
        trigger={["click"]}
        placement="bottomLeft"
        arrow
      >
        <Button
          type=""
          style={{
            marginLeft: "10px",
            borderRadius: "18px",
            width: "119px",
            height: "56px",
            background: "#DEEAEA",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 8px",
            ...style,
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              lineHeight: "20px",
              fontSize: "16px",
              fontWeight: 500,
              color: "#121515",
              fontFamily: "NeueHaasDisplayLight",
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
      </Dropdown>
    </div>
  );
};

export default Filterbutton;
