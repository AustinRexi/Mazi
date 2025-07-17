import { Card, Row, Col, Avatar } from "antd";
import icon from "../../../Assets/Ordericons/delivery.svg";
function Delivery() {
  return (
    <Card style={{ width: "600px" }}>
      <h3
        style={{
          fontFamily: "NeueHaasDisplayBold",
          fontWeight: 500,
          lineHeight: "30px",
          size: "28px",
        }}
      >
        Delivery
      </h3>
      <Row gutter={[10, 16]}>
        <Col xs={2} md={2} lg={2}>
          <Avatar src={icon} alt="delivery" size="large" />
        </Col>
        <Col xs={6} md={16} lg={16}>
          <h4 style={{ fontWeight: 400, lineHeight: "28px", fontSize: "16px" }}>
            Mazi Delivery
          </h4>
        </Col>
        <Col xs={3} md={6} lg={6}>
          <h3
            style={{
              fontWeight: 500,
              fontSize: "20px",
              lineHeight: "28px",
              marginLeft: "20px",
            }}
          >
            Free
          </h3>
        </Col>
      </Row>
    </Card>
  );
}

export default Delivery;
