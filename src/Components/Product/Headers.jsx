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
import Tabledata from "../Table/Tabledata";

const dataRefrence = { tab1: Fooddata, tab2: Grocerydata };

function Headers() {
  const [activeTabKey, setActiveTabKey] = useState("tab1");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);

  const onTabChange = (key) => {
    setActiveTabKey(key);
  };

  const getPlaceholderText = () => {
    return activeTabKey === "tab1"
      ? "Search food or kitchen"
      : "Search grocery or store";
  };

  const getFilterItems = () => {
    return activeTabKey === "tab1"
      ? { data: Restauranttypes, text: "Restaurant Types" }
      : { data: Groceriescategories, text: "Grocery Categories" };
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
          {!activeProduct && (
            <>
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
                      gap: "10px",
                      padding: "2px,8px,2px,8px",
                      marginLeft: "118px",
                      marginTop: "18px",
                      border: "1px solid #B5B6B5",
                      borderRadius: "16px",
                      height: "8vh",
                      width: "175px",
                    }}
                    wrap
                  >
                    {[
                      { id: "tab1", label: "Food" },
                      { id: "tab2", label: "Groceries" },
                    ].map(({ id, label }) => (
                      <Tabbutton
                        key={id}
                        activeTabKey={activeTabKey}
                        id={id}
                        handleClick={onTabChange}
                        style={{
                          color: "#494949",
                          fontSize: "16px",
                          lineHeight: "24px",
                          width: "70px",
                          borderRadius: "2px",
                          marginTop: "8px",
                        }}
                      >
                        {label}
                      </Tabbutton>
                    ))}
                  </Flex>
                  <Addbutton onClick={handleAddButtonClick} />
                  <Search
                    placeholder={getPlaceholderText()}
                    style={{
                      width: "250px",
                      height: "56px",
                      padding: "16px",
                      border: "1px solid #B5C3C3",
                    }}
                  />
                  <Filterbutton
                    data={getFilterItems().data}
                    text={getFilterItems().text}
                  />
                </Flex>
              </Flex>
              <Pageignition />
            </>
          )}
          <Tabledata
            setActiveProduct={setActiveProduct}
            activeProduct={activeProduct}
            data={dataRefrence[activeTabKey]}
          />
          {!activeProduct && <Bottompageignition isVisible={true} />}
        </div>
      )}
    </div>
  );
}

export default Headers;
