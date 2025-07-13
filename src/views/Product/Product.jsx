import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Row, Col } from "antd";
import Addbutton from "../../Components/Product/Addbutton";
import Filterbutton from "../../Components/Product/Filterbutton";
import Search from "../../Components/Product/Search";
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
    navigate("/addproduct"); // Adjusted to match your latest code
  };

  return (
    <div>
      {!activeProduct && (
        <>
          <Row gutter={[4, 16]} style={{ marginTop: "10px", flexWrap: "wrap" }}>
            <Col xs={24} md={6} lg={3} order={{ xs: 2, lg: 1 }}>
              <h2
                style={{
                  marginTop: "20px",
                  color: "#000000",
                  fontWeight: 400,
                  fontSize: "24px",
                  lineHeight: "32px",
                  marginLeft: 14,
                }}
              >
                Products
              </h2>
            </Col>
            <Col
              xs={{ span: 24, order: 3, offset: 0 }}
              md={{ span: 10, order: 2, offset: 0 }}
              lg={{ span: 7, order: 2, offset: 0 }}
            >
              <Flex
                style={{
                  gap: "10px",
                  padding: "2px 8px",
                  marginLeft: "118px",
                  marginTop: "18px",
                  border: "1px solid #B5B6B5",
                  borderRadius: "16px",
                  height: "50px",
                  width: "175px",
                }}
                wrap="wrap"
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
            <Col
              xs={{ span: 24, order: 4, offset: 0 }}
              md={{ span: 6, order: 4, offset: 0 }}
              lg={{ span: 4, order: 3, offset: 0 }}
            >
              <Addbutton onClick={handleAddButtonClick} />
            </Col>

            <Col
              xs={{ span: 24, order: 2, offset: 5 }}
              md={{ span: 10, order: 3, offset: 2 }}
              lg={{ span: 6, order: 4, offset: 0 }}
            >
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
            <Col
              xs={{ span: 24, order: 5, offset: 0 }}
              md={{ span: 4, order: 5, offset: 0 }}
              lg={{ span: 4, order: 5, offset: 0 }}
            >
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
