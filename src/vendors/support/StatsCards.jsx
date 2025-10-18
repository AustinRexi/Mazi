import { Row, Col, Card, Typography, Space } from "antd";
import {
  MessageOutlined,
  AlertOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const StatsCards = ({ total, open, inProgress, resolved }) => (
  <Row gutter={[16, 16]}>
    <Col xs={24} sm={8} md={6}>
      <Card>
        <Space>
          <MessageOutlined style={{ color: "#1890ff" }} />
          <div>
            <Text>Total Tickets</Text>
            <Title level={4}>{total}</Title>
          </div>
        </Space>
      </Card>
    </Col>

    <Col xs={24} sm={8} md={6}>
      <Card>
        <Space>
          <AlertOutlined style={{ color: "#ff4d4f" }} />
          <div>
            <Text>Open</Text>
            <Title level={4}>{open}</Title>
          </div>
        </Space>
      </Card>
    </Col>

    <Col xs={24} sm={8} md={6}>
      <Card>
        <Space>
          <ClockCircleOutlined style={{ color: "#faad14" }} />
          <div>
            <Text>In Progress</Text>
            <Title level={4}>{inProgress}</Title>
          </div>
        </Space>
      </Card>
    </Col>

    <Col xs={24} sm={8} md={6}>
      <Card>
        <Space>
          <CheckCircleOutlined style={{ color: "#52c41a" }} />
          <div>
            <Text>Resolved</Text>
            <Title level={4}>{resolved}</Title>
          </div>
        </Space>
      </Card>
    </Col>
  </Row>
);

export default StatsCards;
