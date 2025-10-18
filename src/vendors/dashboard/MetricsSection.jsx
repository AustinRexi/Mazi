import { Row, Col, Card, Statistic, Typography } from "antd";
import { StarFilled, ArrowUpOutlined } from "@ant-design/icons";
import chartIcon from "../../utils/icons/chart.svg";
import orderIcon from "../../utils/icons/orders.svg";
import productIcon from "../../utils/icons/product.svg";

const { Text } = Typography;

const MetricsSection = () => {
  // Dynamic metrics configuration
  const metrics = [
    {
      key: "revenue",
      title: "Total Revenue",
      value: 8500,
      icon: (
        <img
          src={chartIcon}
          alt="revenue"
          style={{ height: 30, borderRadius: 5 }}
        />
      ),
      suffix: "$",
      precision: 2,
      growth: "+12.5%",
      description: "from last month",
    },
    {
      key: "orders",
      title: "Total Orders",
      value: 85,
      icon: (
        <img
          src={orderIcon}
          alt="orders"
          style={{ height: 30, borderRadius: 5 }}
        />
      ),
      growth: "+8.2%",
      description: "from last month",
    },
    {
      key: "products",
      title: "Products Sold",
      value: 717,
      icon: (
        <img
          src={productIcon}
          alt="products"
          style={{ height: 30, borderRadius: 5 }}
        />
      ),
      growth: "+15.1%",
      description: "from last month",
    },
    {
      key: "rating",
      title: "Store Rating",
      value: 4.8,
      icon: <StarFilled style={{ color: "#fadb14" }} />,
      precision: 1,
      growth: "+0.2",
      description: "from last month",
    },
  ];

  return (
    <Row gutter={[16, 16]}>
      {metrics.map((metric) => (
        <Col key={metric.key} xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={metric.title}
              value={metric.value}
              prefix={metric.icon}
              precision={metric.precision}
            />
            <Text type="success">
              <ArrowUpOutlined /> {metric.growth} {metric.description}
            </Text>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default MetricsSection;
