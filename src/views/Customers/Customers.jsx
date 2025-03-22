import { useState } from "react";
import MyTable from "./MyTable";
import Search from "../../Components/Product/Search";
import ActionButton from "./ActionButton";
import Tabbutton from "../../Components/Product/Tabbutton";
import { Flex, Row, Col } from "antd";
import Bottompageignition from "../../Components/Product/Bottompageigition";
import user from "./User";
import store from "./stores";
import FilteredItems from "./FilteredItems";

const dataReference = { user: user, store: store };

function Customers() {
  const [activeTabKey, setActiveTabKey] = useState("user");

  const onTabChange = (tab) => {
    setActiveTabKey(tab);
  };

  const getPlaceholderText = "Search Users or Stores";

  return (
    <div
      style={{
        padding: "8px",
        background: "#F8FBFB",
        minHeight: "100vh",
      }}
    >
      <Row gutter={[16, 16]}>
        <Col
          xs={24} // Full width on mobile
          sm={12} // Half width on small tablets
          md={6} // Quarter width on medium devices
          lg={3} // Original width on desktop
        >
          <h2
            style={{
              marginTop: "20px",
              color: "#000000",
              fontWeight: 600,
              fontSize: "clamp(18px, 4vw, 24px)", // Responsive font size
              lineHeight: "32px",
              marginLeft: 4,
            }}
          >
            Customers
          </h2>
        </Col>

        <Col
          xs={0} // Hidden on mobile
          sm={0}
          md={2}
          lg={2}
        />

        <Col xs={24} sm={24} md={16} lg={18}>
          <Flex
            style={{
              gap: 8,
              flexWrap: "wrap", // Allow wrapping on smaller screens
              width: "100%",
              justifyContent: "flex-end",
            }}
          >
            <Search
              placeholder={getPlaceholderText}
              style={{
                width: "100%", // Full width on all screens
                maxWidth: "531px", // Maximum width on larger screens
                height: "45px",
                borderRadius: "16px",
                border: "1px solid #B5C3C3",
                padding: "0 16px",
                marginLeft: 0, // Remove fixed margin
              }}
            />
            <ActionButton />
            <FilteredItems
              style={{
                minWidth: "119px",
                height: "40px",
                borderRadius: "8px",
                flexShrink: 0,
              }}
            />
          </Flex>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 8 }}>
        <Col xs={24} md={18}>
          <Flex
            style={{
              gap: "10px",
              padding: "2px 8px",
              border: "1px solid #B5B6B5",
              borderRadius: "16px",
              height: "48px",
              width: "100%", // Full width instead of fixed
              maxWidth: "154px",
              marginLeft: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
            wrap
          >
            {[
              { id: "user", label: "Users" },
              { id: "store", label: "Stores" },
            ].map(({ id, label }) => (
              <Tabbutton
                key={id}
                activeTabKey={activeTabKey}
                id={id}
                handleClick={() => onTabChange(id)}
                style={{
                  color: "#494949",
                  fontSize: "clamp(14px, 2vw, 16px)", // Responsive font
                  lineHeight: "24px",
                  width: "60px",
                  borderRadius: "2px",
                  marginTop: "8px",
                }}
              >
                {label}
              </Tabbutton>
            ))}
          </Flex>
        </Col>
        <Col
          xs={24}
          md={6}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Bottompageignition isVisible={false} />
        </Col>
      </Row>

      <MyTable
        activeTabKey={activeTabKey}
        data={dataReference[activeTabKey]}
        style={{ width: "100%" }}
      />
      <Bottompageignition isVisible={true} />
    </div>
  );
}

export default Customers;
