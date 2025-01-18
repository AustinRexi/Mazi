import { useState } from "react";
import ModalComponent from "../../../Components/shared/ModalComponent";
import option from "../../../Assets/Couriericons/options.svg";
import { Row, Col, Dropdown, Button, Flex, Space } from "antd";
import ProceedCard from "./countdowncard/ProceedCard";
import FulfillCard from "./countdowncard/FulfillCard";
import Tabbutton from "../../../Components/Product/Tabbutton";
import OrderData from "./OrderSummary";
import TrackOrder from "../trackorder/Index";

const dataRefrence = { tab1: OrderData, tab2: TrackOrder };

function OrderTab({ isVisible: initialIsVisible }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeTabKey, setActiveTabKey] = useState("tab1");
  const [currentView, setCurrentView] = useState("proceed");
  const [isButtonVisible, setIsButtonVisible] = useState(initialIsVisible);

  const items = [
    { key: "1", label: "Edit" },
    { key: "2", label: "Delete" },
  ];

  const onTabChange = (tab) => {
    setActiveTabKey(tab);
    if (tab === "tab2") {
      setIsButtonVisible(initialIsVisible);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentView("proceed");
  };

  const ActiveComponent = dataRefrence[activeTabKey];

  return (
    <div style={{ marginBottom: 16 }}>
      <Row>
        <Col span={9}>
          {isButtonVisible ? (
            <Flex>
              {[
                { id: "tab1", label: "Order Details" },
                { id: "tab2", label: "Track Order" },
              ].map(({ id, label }) => (
                <Tabbutton
                  key={id}
                  activeTabKey={activeTabKey}
                  id={id}
                  handleClick={onTabChange}
                  style={{
                    marginLeft: 15,
                    fontWeight: 600,
                    lineHeight: "24px",
                    fontSize: "16px",
                    color: "#27332D",
                    fontFamily: "NeueHaasDisplayRoman",
                    borderRadius: 0,
                  }}
                >
                  {label}
                </Tabbutton>
              ))}
            </Flex>
          ) : (
            <Flex>
              {[{ id: "tab1", label: "Order Details" }].map(({ id, label }) => (
                <Tabbutton
                  key={id}
                  activeTabKey={activeTabKey}
                  id={id}
                  handleClick={onTabChange}
                  style={{
                    marginLeft: 15,
                    fontWeight: 600,
                    lineHeight: "24px",
                    fontSize: "16px",
                    color: "#27332D",
                    fontFamily: "NeueHaasDisplayRoman",
                    borderRadius: 0,
                  }}
                >
                  {label}
                </Tabbutton>
              ))}
            </Flex>
          )}
        </Col>
        <Col span={8}></Col>
        <Col span={6}>
          <Space>
            <Dropdown menu={{ items }} placement="bottomRight">
              <Button shape="" style={{ marginRight: 5 }}>
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
                display: !isButtonVisible ? "flex" : "none",
              }}
              onClick={showModal}
            >
              Fulfill
            </Button>
          </Space>
        </Col>
      </Row>
      <div style={{ padding: 16 }}>
        <section>
          <ActiveComponent />
        </section>
      </div>
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
          {currentView === "proceed" ? (
            <ProceedCard
              onProceed={() => setCurrentView("fulfill")}
              hideModal={handleCancel}
            />
          ) : (
            <FulfillCard
              onBack={() => setCurrentView("proceed")}
              hideModal={handleCancel}
            />
          )}
        </ModalComponent>
      )}
    </div>
  );
}

export default OrderTab;
