import { Card, Tag, Typography, Row, Col } from "antd";
import { formatAdminMoney } from "../../utils/adminCurrency";

const { Text } = Typography;

// Define metric configurations
const metrics = [
  {
    label: "Revenue",
    key: "revenue",
    format: (value, currencyCode) => formatAdminMoney(value, currencyCode),
    textStyle: { fontSize: 14, color: "#8c8c8c" },
    valueStyle: { fontWeight: "500" },
  },
  {
    label: "Profit",
    key: "profit",
    format: (value, currencyCode) => formatAdminMoney(value, currencyCode),
    textStyle: { fontSize: 14, color: "#8c8c8c" },
    valueStyle: { fontWeight: "500", color: "#52c41a" },
  },
  {
    label: "Transactions",
    key: "transactions",
    format: (value) => value.toLocaleString(),
    textStyle: { fontSize: 14, color: "#8c8c8c" },
    valueStyle: { fontWeight: "500" },
  },
];

function ServicePerformance({ serviceData, currencyCode }) {
  return (
    <Card title="Service Performance">
      <Text
        style={{ color: "#8c8c8c", marginBottom: "16px", display: "block" }}
      >
        Revenue and profit breakdown by service category
      </Text>
      <Row gutter={[24, 24]}>
        {serviceData.map((service) => {
          const IconComponent = service.icon;
          return (
            <Col xs={24} md={8} key={service.name}>
              <div
                style={{
                  padding: "16px",
                  border: "1px solid #f0f0f0",
                  borderRadius: "8px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "12px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        padding: "8px",
                        borderRadius: "8px",
                        backgroundColor: `${service.color}20`,
                      }}
                    >
                      <IconComponent
                        style={{ color: service.color, fontSize: 16 }}
                      />
                    </div>
                    <Text strong>{service.name}</Text>
                  </div>
                  <Tag
                    color={service.growth > 0 ? "green" : "red"}
                    style={{ fontSize: 12 }}
                  >
                    {service.growth > 0 ? "+" : ""}
                    {service.growth}%
                  </Tag>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {metrics.map((metric) => (
                    <div
                      key={metric.key}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={metric.textStyle}>{metric.label}</Text>
                      <Text style={metric.valueStyle}>
                        {metric.format(service[metric.key], currencyCode)}
                      </Text>
                    </div>
                  ))}
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </Card>
  );
}

export default ServicePerformance;
