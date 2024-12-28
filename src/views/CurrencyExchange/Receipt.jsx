import { Card, Row, Col, Typography, Divider } from "antd";

const { Title, Text } = Typography;

const Receipt = () => {
  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "auto" }}>
      <Card
        bordered={false}
        style={{ boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}
      >
        {/* Header Section */}
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={4} style={{ margin: 0 }}>
              <img src="/path-to-logo.png" alt="Logo" style={{ height: 30 }} />
              Mazi
            </Title>
          </Col>
          <Col>
            <Text strong>Transaction Receipt</Text>
          </Col>
        </Row>
        <Divider />

        {/* Exchange Details */}
        <Row style={{ marginBottom: 20 }}>
          <Col span={24}>
            <Title level={5} style={{ marginBottom: 8 }}>
              Exchange Details
            </Title>
            <Text>Date: Saturday, Dec 9, 2023</Text>
            <br />
            <Text>Ref: THE-123456789</Text>
          </Col>
        </Row>

        {/* Conversion and Receiver Info */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Title level={5}>Convert From</Title>
            <Text>Currency: USD</Text>
            <br />
            <Text>Amount: $500</Text>
            <br />
            <Text>Card Number: **** **** **** 1234</Text>
            <br />
            <Text>Name on Card: Testy McTest</Text>
          </Col>
          <Col xs={24} sm={12}>
            <Title level={5}>Receiver</Title>
            <Text>Currency: NGN</Text>
            <br />
            <Text>Amount: NGN 365,000</Text>
            <br />
            <Text>Account Number: 1234567890</Text>
            <br />
            <Text>Account Name: John Doe</Text>
            <br />
            <Text>Description: From Mazi to your wallet</Text>
          </Col>
        </Row>

        <Divider />

        {/* Footer Section */}
        <Row justify="space-between">
          <Col>
            <Text>Service Fee: $3.00</Text>
          </Col>
          <Col>
            <Title level={4} style={{ color: "green" }}>
              $503.00
            </Title>
          </Col>
        </Row>
        <Row style={{ marginTop: 10 }}>
          <Col>
            <Text>Status: </Text>
            <Text style={{ color: "green" }}>Successful</Text>
          </Col>
          <Col>
            <Text>Reference: 0987654321ABCDEF</Text>
          </Col>
        </Row>

        <Divider />

        <Row>
          <Col span={24}>
            <Text type="secondary" style={{ fontSize: 12 }}>
              If you have any questions, please contact us at support@mazi.com
            </Text>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Receipt;
