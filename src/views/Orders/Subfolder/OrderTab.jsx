import option from "../../../Assets/Couriericons/options.svg";
import { Row, Col, Dropdown, Button, Typography, Flex } from "antd";
const { Text } = Typography;
function OrderTab() {
  const items = [
    {
      key: "1",
      label: "Edit",
    },
    {
      key: "2",
      label: "Delete",
    },
  ];
  return (
    <div style={{ marginBottom: 16 }}>
      <Row>
        <Col span={8}>
          <Text
            style={{
              marginLeft: 20,
              borderBottom: "2px solid  #27332D",
              fontWeight: 600,
              lineHeight: "24px",
              size: "18px",
            }}
          >
            Order Details
          </Text>
        </Col>
        <Col span={8}></Col>
        <Col span={8}>
          <Flex>
            <Dropdown menu={{ items }} placement="bottomRight">
              <Button shape="" style={{ marginRight: 8 }}>
                Action <img src={option} alt="more" />
              </Button>
            </Dropdown>
            <Button
              type="primary"
              shape="round"
              style={{
                backgroundColor: "#005F63",
                borderColor: "#005F63",
                width: "100px",
              }}
            >
              Fulfill
            </Button>
          </Flex>
        </Col>
      </Row>
    </div>
  );
}

export default OrderTab;
