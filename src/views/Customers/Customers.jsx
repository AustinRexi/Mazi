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
    <div style={{ padding: 8, background: "#F8FBFB" }}>
      <Row>
        <Col span={3}>
          <h2
            style={{
              marginTop: "20px",
              color: "#000000",
              fontWeight: 600,
              fontSize: "24px",
              lineHeight: "32px",
              marginLeft: 4,
            }}
          >
            Customers
          </h2>
        </Col>
        <Col span={2}></Col>
        <Col span={18}>
          <div style={{ display: "flex", gap: 8 }}>
            {" "}
            <Search
              placeholder={getPlaceholderText}
              style={{
                marginLeft: "42px",
                width: "531px",
                height: "45px",
                borderRadius: "16px",
                border: "1px solid #B5C3C3",
                padding: "0 16px",
              }}
            />
            <ActionButton />
            <FilteredItems
              style={{ width: 119, height: 40, borderRadius: 8 }}
            />
          </div>
        </Col>
      </Row>

      <Row gutter={4} style={{ marginTop: 8 }}>
        <Col span={18}>
          <Flex
            style={{
              gap: "10px",
              padding: "2px 8px",
              border: "1px solid #B5B6B5",
              borderRadius: "16px",
              height: "48px",
              width: "154px",
              marginLeft: 15,
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
                  fontSize: "16px",
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
        <Col span={6}>
          {" "}
          <Bottompageignition isVisible={false} />
        </Col>
      </Row>

      {/* MyTable receives active data based on activeTabKey */}
      <MyTable activeTabKey={activeTabKey} data={dataReference[activeTabKey]} />
      <Bottompageignition isVisible={true} />
    </div>
  );
}

export default Customers;
