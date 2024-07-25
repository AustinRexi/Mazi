import { Card, Space, Divider, Slider, Row, Col } from "antd";

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
          fontFamily: "Neue Haas Grotesk Display Pro",
          color: "#121515",
          fontSize: "16px",
          lineHeight: "24px",
          width: "380px",
          height: "900px",
          right: "10px",
          borderRadius: "12px",
          padding: "24px",
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 9px 18px 0px #AAAAAA26",
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
            <div
              key={index}
              style={{
                backgroundColor: "#F5F5F5",
                borderRadius: "4px",
                padding: "4px 8px",
                fontSize: "14px",
                color: "#333",
              }}
            >
              {item}
            </div>
          ))}
        </div>
        <Divider />
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
        <Divider />
        <div>
          <div
            style={{ fontWeight: 500, fontSize: "16px", marginBottom: "16px" }}
          >
            Types of restaurant
          </div>
          <Row gutter={[16, 16]}>
            {data.map((type, index) => (
              <Col
                span={8}
                key={index}
                style={{ textAlign: "center", marginBottom: "12px" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    // alignItems: "center",
                  }}
                >
                  <img
                    src={type.icon}
                    style={{ marginBottom: "8px" }}
                    alt={`Restaurant type ${index}`}
                  />
                  {/* Add alt text for accessibility */}
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
