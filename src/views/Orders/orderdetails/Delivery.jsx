import { Card, Row, Col, Avatar } from "antd";
import icon from "../../../Assets/Ordericons/delivery.svg";
function Delivery() {
  return (
    <Card style={{ width: "600px" }}>
      <h3 style={{ fontWeight: 700, lineHeight: "30px", size: "28px" }}>
        Delivery
      </h3>
      <Row gutter={[10, 16]}>
        <Col span={2}>
          <Avatar src={icon} alt="delivery" size="large" />
        </Col>
        <Col span={16}>
          <h4 style={{ fontWeight: 400, lineHeight: "28px", fontSize: "16px" }}>
            Mazi Delivery
          </h4>
        </Col>
        <Col span={6}>
          <h3
            style={{
              fontWeight: 700,
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
