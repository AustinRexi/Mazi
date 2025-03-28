import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Addbutton from "../../Components/Product/Addbutton";
import Filterbutton from "../../Components/Product/Filterbutton";
import Search from "../../Components/Product/Search";
import { Flex, Row, Col } from "antd";
import Tabbutton from "../../Components/Product/Tabbutton";
import Pageignition from "../../Components/Product/Pageignition";
import Fooddata from "../../Assets/Fooddata";
import Grocerydata from "../../Assets/Grocerydata";
import Restauranttypes from "../../Assets/Restauranttypes";
import Groceriescategories from "../../Assets/Groceriescategories";
import Bottompageignition from "../../Components/Product/Bottompageigition";
import Tabledata from "../../Components/Table/Tabledata";

const dataRefrence = { tab1: Fooddata, tab2: Grocerydata };

function Product() {
  const [activeTabKey, setActiveTabKey] = useState("tab1");
  const [activeProduct, setActiveProduct] = useState(null);
  const navigate = useNavigate();

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
    navigate("/addproduct");
  };

  return (
    <div>
      {!activeProduct && (
        <>
          <Row gutter={[28, 15]} style={{ gap: 16 }}>
            <Col xs={3} md={4} lg={2}>
              <h2
                style={{
                  marginTop: "20px",
                  color: "#000000",
                  fontWeight: 600,
                  fontSize: "24px",
                  lineHeight: "32px",
                  marginLeft: 14,
                }}
              >
                Products
              </h2>
            </Col>
            <Col xs={16} md={12} lg={7}>
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
                      height: window.innerWidth <= 1024 ? "40px" : "auto",
                    }}
                  >
                    {label}
                  </Tabbutton>
                ))}
              </Flex>
            </Col>
            <Col xs={11} md={0} lg={0}></Col>
            <Col xs={12} md={7} lg={5}>
              <Addbutton onClick={handleAddButtonClick} />
            </Col>
            <Col xs={4} md={7} lg={0}></Col>
            <Col xs={18} md={10} lg={5}>
              <Search
                placeholder={getPlaceholderText()}
                style={{
                  width: "250px",
                  height: "56px",
                  padding: "16px",
                  border: "1px solid #B5C3C3",
                }}
              />
            </Col>

            <Col xs={8} md={6} lg={3}>
              <Filterbutton
                data={getFilterItems().data}
                text={getFilterItems().text}
              />
            </Col>
          </Row>

          <Row>
            <Col xs={0} md={24}>
              <Pageignition />
            </Col>
          </Row>
        </>
      )}
      <Tabledata
        setActiveProduct={setActiveProduct}
        activeProduct={activeProduct}
        data={dataRefrence[activeTabKey]}
      />
      {!activeProduct && <Bottompageignition isVisible={true} />}
    </div>
  );
}

export default Product;
