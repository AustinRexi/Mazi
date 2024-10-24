import { Card, Space, Divider, Slider, Row, Col, Button } from "antd";

function Filter({ data }) {
  const sortByItems = [
    "Popularity",
    "Delivery time",
    "A-Z",
    "Z-A",
    "Open",
    "Near me",
    "Rating",
    "Delivery fee",
  ];

  return (
    <Space size={18} direction="vertical">
      <Card
        size="small"
        title={<div style={{ fontWeight: 500, fontSize: "24px" }}>Sort by</div>}
        extra={
          <a href="#" style={{ color: "#F58B3F" }}>
            Clear All
          </a>
        }
        headStyle={{
          borderBottom: "none",
          paddingBottom: "0px",
        }}
        style={{
          border: "none",
          fontFamily: "Neue Haas Grotesk Display Pro",
          color: "#121515",
          fontSize: "16px",
          lineHeight: "24px",
          width: "100%",
          borderRadius: "12px",
          padding: "10px",
          backgroundColor: "#FFFFFF",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginTop: "16px",
          }}
        >
          {sortByItems.map((item, index) => (
            <Button
              key={index}
              type="default"
              style={{
                backgroundColor: "#F5F5F5",
                borderRadius: "4px",
                padding: "4px 8px",
                fontSize: "14px",
                color: "#333",
                border: "none",
              }}
            >
              {item}
            </Button>
          ))}
        </div>
        <Divider style={{ margin: "10px 0" }} />
        <div>
          <div
            style={{ fontWeight: 500, fontSize: "16px", marginBottom: "16px" }}
          >
            Price
          </div>
          <Slider range defaultValue={[1200, 15000]} min={500} max={35000} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>N500</span>
            <span>N35,000</span>
          </div>
        </div>
        <Divider style={{ margin: "8px 0" }} />
        <div>
          <div
            style={{ fontWeight: 500, fontSize: "16px", marginBottom: "16px" }}
          >
            Types of restaurant
          </div>
          <Row gutter={[8, 8]}>
            {data.map((type, index) => (
              <Col
                span={8}
                key={index}
                style={{ textAlign: "center", marginBottom: "5px" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <img
                    src={type.icon}
                    style={{ marginBottom: "8px" }}
                    alt={`Restaurant type ${index}`}
                  />
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </Card>
    </Space>
  );
}

export default Filter;
