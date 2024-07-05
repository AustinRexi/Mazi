import { Card, Col, Row, Statistic, Typography } from "antd";
import {
  ArrowUpOutlined,
  TeamOutlined,
  LineChartOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

const data = [
  {
    key: "revenue",
    title: "Revenue",
    value: "N150.456M",
    previous: "N132.77M",
    difference: "15.4%",
    icon: <LineChartOutlined style={{ color: "green" }} />,
    trendIcon: <ArrowUpOutlined style={{ color: "green" }} />,
  },
  {
    key: "newCustomers",
    title: "New Customers",
    value: "5,456",
    previous: "4,877",
    difference: "15.4%",
    icon: <TeamOutlined style={{ color: "orange" }} />,
    trendIcon: <ArrowUpOutlined style={{ color: "green" }} />,
  },
];

const Settings = () => {
  return (
    <Row gutter={16}>
      {data.map((item) => (
        <Col span={12} key={item.key}>
          <Card>
            <Row>
              <Col span={4}>
                <div style={{ fontSize: "24px" }}>{item.icon}</div>
              </Col>
              <Col span={20}>
                <Title level={4}>{item.title}</Title>
                <Statistic
                  value={item.value}
                  valueStyle={{ fontSize: "24px" }}
                />
                <Row>
                  <Col span={8}>
                    <Statistic title="Previous" value={item.previous} />
                  </Col>
                  <Col span={8}>
                    <Statistic title="Difference" value={item.difference} />
                  </Col>
                  <Col span={8}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ marginRight: "8px" }}>Trend</span>
                      {item.trendIcon}
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Settings;
