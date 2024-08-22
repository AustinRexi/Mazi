import { useState } from "react";
import Addbutton from "./Addbutton";
import Filterbutton from "./Filterbutton";
import Search from "./Search";
import { Flex } from "antd";
import Tabbutton from "./Tabbutton";
import Pageignition from "./Pageignition";
import Fooddata from "../../Assets/Fooddata";
import Grocerydata from "../../Assets/Grocerydata";
import Restauranttypes from "../../Assets/Restauranttypes";
import Groceriescategories from "../../Assets/Groceriescategories";
import AddProduct from "../../views/Product/Addproduct";
import Bottompageignition from "./Bottompageigition";

const dataRefrence = { tab1: Fooddata, tab2: Grocerydata };

function Headers() {
  const [activeTabKey, setActiveTabKey] = useState("tab1");
  const [showAddProduct, setShowAddProduct] = useState(false);

  const onTabChange = (key) => {
    setActiveTabKey(key);
  };

  const getPlaceholderText = () => {
    return activeTabKey === "tab1"
      ? "Search food or kitchen"
      : "Search grocery or store";
  };

  const getFilterItems = () => {
    return activeTabKey === "tab1" ? Restauranttypes : Groceriescategories;
  };

  const handleAddButtonClick = () => {
    setShowAddProduct(true);
  };

  return (
    <div>
      {showAddProduct ? (
        <AddProduct />
      ) : (
        <div>
          <Flex gap="middle" align="start" vertical>
            <Flex gap="middle" style={{ display: "flex", gap: 24 }}>
              <h2
                style={{
                  marginTop: "20px",
                  color: "#000000",
                  fontWeight: 600,
                  fontSize: "24px",
                  lineHeight: "32px",
                  marginLeft: 25,
                }}
              >
                Products
              </h2>
              <Flex
                style={{
                  gap: "8px",
                  padding: "2px,8px,2px,8px",
                  marginLeft: "118px",
                  marginTop: "18px",
                  border: "1px solid #B5B6B5",
                  borderRadius: "16px",
                  height: "8vh",
                  width: "170px",
                }}
                wrap
              >
                <Tabbutton
                  activeTabKey={activeTabKey}
                  id="tab1"
                  handleClick={(id) => onTabChange(id)}
                >
                  Food
                </Tabbutton>
                <Tabbutton
                  activeTabKey={activeTabKey}
                  id="tab2"
                  handleClick={(id) => onTabChange(id)}
                >
                  Groceries
                </Tabbutton>
              </Flex>
              <Addbutton onClick={handleAddButtonClick} />
              <Search placeholder={getPlaceholderText()} />
              <Filterbutton data={getFilterItems()} />
            </Flex>
          </Flex>
          <Pageignition data={dataRefrence[activeTabKey]} />
          <Bottompageignition />
        </div>
      )}
    </div>
  );
}

export default Headers;
