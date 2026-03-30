import { Row, Col, Card, Statistic, Typography } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import chartIcon from "../../utils/icons/chart.svg";
import orderIcon from "../../utils/icons/orders.svg";
import productIcon from "../../utils/icons/product.svg";
import { formatVendorMoney } from "../utils/currency";

const { Text } = Typography;

const MetricsSection = ({ metrics, currencyCode = "" }) => {
  const metricItems = [
    {
      key: "revenue",
      title: "Total Revenue",
      value: Number(metrics?.revenue || 0),
      icon: (
        <img
          src={chartIcon}
          alt="revenue"
          style={{ height: 30, borderRadius: 5 }}
        />
      ),
      precision: 2,
      description: "paid orders",
    },
    {
      key: "orders",
      title: "Total Orders",
      value: Number(metrics?.orders || 0),
      icon: (
        <img
          src={orderIcon}
          alt="orders"
          style={{ height: 30, borderRadius: 5 }}
        />
      ),
      description: "vendor orders",
    },
    {
      key: "products",
      title: "Products Sold",
      value: Number(metrics?.productsSold || 0),
      icon: (
        <img
          src={productIcon}
          alt="products"
          style={{ height: 30, borderRadius: 5 }}
        />
      ),
      description: "units ordered",
    },
    {
      key: "pendingOrders",
      title: "Pending Orders",
      value: Number(metrics?.pendingOrders || 0),
      icon: <ClockCircleOutlined style={{ color: "#faad14" }} />,
      description: "awaiting action",
    },
  ];

  return (
    <Row gutter={[16, 16]}>
      {metricItems.map((metric) => (
        <Col key={metric.key} xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={metric.title}
              value={metric.value}
              prefix={metric.icon}
              precision={metric.precision}
              formatter={(value) =>
                metric.key === "revenue"
                  ? formatVendorMoney(value, currencyCode)
                  : Number(value).toLocaleString(undefined, {
                      minimumFractionDigits: metric.precision || 0,
                      maximumFractionDigits: metric.precision || 0,
                    })
              }
            />
            <Text type="secondary">{metric.description}</Text>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default MetricsSection;
