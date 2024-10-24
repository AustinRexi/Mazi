import React from "react";
import {
  Card,
  List,
  Row,
  Col,
  Divider,
  Descriptions,
  Tag,
  Typography,
  Space,
  Badge,
} from "antd";
import { CheckCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";

const { Text } = Typography;

const data = [
  {
    icon: null,
    title: "Jollof Rice and Curry Chicken Flavour",
    description: "$140 Per plate",
    quantity: 3,
    price: "$520",
    tag: "MAZI KITCHEN",
  },
  {
    icon: null,
    title: "50Cl of Fearless Drink",
    description: "Free",
    quantity: 1,
    price: "$0",
    tag: "MAZI KITCHEN",
  },
];

const PaymentSummary = () => {
  return (
    <Card>
      <Row gutter={[16, 16]}>
        {/* Unfulfilled Items */}
        <Col span={24}>
          <Badge.Ribbon text="Unfulfilled" color="orange">
            <Card>
              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.title}
                      description={item.description}
                    />
                    <Space size="large">
                      <Text strong>{item.quantity}</Text>
                      <Text strong>{item.price}</Text>
                    </Space>
                    <Tag>{item.tag}</Tag>
                  </List.Item>
                )}
              />
            </Card>
          </Badge.Ribbon>
        </Col>

        {/* Delivery Section */}
        <Col span={24}>
          <Card>
            <Descriptions title="Delivery">
              <Descriptions.Item>
                <Space>
                  <img src="path_to_logo.png" alt="Mazi Delivery" height={20} />
                  <Text>Mazi Delivery</Text>
                </Space>
              </Descriptions.Item>
              <Descriptions.Item>
                <Text strong>Free</Text>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* Payment Summary */}
        <Col span={24}>
          <Card>
            <Descriptions title="Payment Summary">
              <Descriptions.Item label="Jollof Rice and Curry Chicken Flavour">
                $520
              </Descriptions.Item>
              <Descriptions.Item label="50Cl of Fearless Drink">
                $0
              </Descriptions.Item>
              <Descriptions.Item label="Delivery">$0</Descriptions.Item>
              <Descriptions.Item label="Service Fee">
                <Space>
                  $10 <InfoCircleOutlined />
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="Total">
                <Text strong>$1040</Text>
              </Descriptions.Item>
              <Divider />
              <Descriptions.Item label="Status">
                <Space>
                  <CheckCircleOutlined style={{ color: "green" }} />
                  <Text type="success">Successful</Text>
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="Payment method">
                <Text>4526****0556</Text>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default PaymentSummary;
