import { Card, Space, Divider, Slider, Row, Col, Button } from "antd";

function Filter({ data, text }) {
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
        title={
          <div
            style={{
              fontFamily: "NeueHaasDisplayRoman",
              fontWeight: 500,
              fontSize: "24px",
              lineHeight: "32px",
            }}
          >
            Sort by
          </div>
        }
        extra={
          <a
            href="#"
            style={{
              color: "#F58B3F",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "24px",
            }}
          >
            Clear All
          </a>
        }
        headStyle={{
          borderBottom: "none",
          paddingBottom: "0px",
        }}
        style={{
          border: "none",
          color: "#121515",
          width: "380px",
          height: "max-content",
          right: "10px",
          borderRadius: "12px",
          padding: "6px",
          backgroundColor: "#FFFFFF",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginTop: "16px",
            fontSize: "16px",
          }}
        >
          {sortByItems.map((item, index) => (
            <Button
              key={index}
              type="default"
              style={{
                borderRadius: "4px",
                padding: "4px 8px",
                border: "none",
              }}
            >
              <span
                style={{
                  fontSize: "16px",
                  lineHeight: "24px",
                  fontWeight: 500,
                  fontFamily: "NeueHaasDisplayRoman",
                  color: " #545E5E",
                }}
              >
                {" "}
                {item}
              </span>
            </Button>
          ))}
        </div>
        <Divider />
        <div>
          <div
            style={{
              fontWeight: 500,
              fontSize: "24px",
              lineHeight: "32px",
              marginBottom: "16px",
              fontFamily: "NeueHaasDisplayRoman",
            }}
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
            style={{
              fontWeight: 500,
              fontSize: "24px",
              lineHeight: "32px",
              marginBottom: "16px",
              fontFamily: "NeueHaasDisplayRoman",
            }}
          >
            {text}
          </div>
          <Row gutter={[18, 2]}>
            {data.map((type, index) => (
              <Col
                span={6}
                key={index}
                style={{ textAlign: "center", marginBottom: "12px" }}
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
