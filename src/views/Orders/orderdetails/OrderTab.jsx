import { useState } from "react";
import ModalComponent from "../../../Components/shared/ModalComponent";
import option from "../../../Assets/Couriericons/options.svg";
import { Row, Col, Dropdown, Button, Typography, Space } from "antd";
import ProceedCard from "./countdowncard/ProceedCard";
const { Text } = Typography;

function OrderTab() {
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
              fontSize: "16px",
              color: "#27332D",
              fontFamily: "NeueHaasDisplayRoman",
            }}
          >
            Order Details
          </Text>
        </Col>
        <Col span={8}></Col>
        <Col span={8}>
          <Space>
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
                width: "110px",
                fontFamily: "NeueHaasDisplayLight",
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "24px",
              }}
              onClick={showModal}
            >
              Fulfill
            </Button>
          </Space>
        </Col>
      </Row>
      {isModalVisible && (
        <ModalComponent
          isVisible={isModalVisible}
          hideModal={handleCancel}
          wrapClassName="custom-modal"
          style={{
            position: "absolute",
            top: 20,
            right: 380,
            padding: 0,
            margin: 0,
            borderRadius: "8px",
            display: "inline-block",
          }}
          bodyStyle={{
            backgroundColor: "transparent",
            padding: 0,
          }}
        >
          <ProceedCard hideModal={handleCancel} />
        </ModalComponent>
      )}
    </div>
  );
}

export default OrderTab;
