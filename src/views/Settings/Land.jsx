import { useState } from "react";
import { Button, Modal } from "antd";
import { Card, Avatar, Typography } from "antd";
import {
  PhoneOutlined,
  AudioOutlined,
  AudioMutedOutlined,
} from "@ant-design/icons";
import calling from "../../Assets/Couriericons/calling.svg";

const { Text } = Typography;
const Land = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div
          style={{
            width: 400,
            borderRadius: "20px",
            textAlign: "center",
            backgroundColor: "#006D75",
          }}
        >
          <Avatar size={64} src={calling} style={{ marginBottom: 20 }} />
          <Text style={{ display: "block", marginBottom: 8, color: "#ffffff" }}>
            Calling...
          </Text>
          <Text strong style={{ fontSize: 20, color: "#ffffff" }}>
            Tiamiyu Wasiu
          </Text>

          <div style={{ marginTop: 20 }}>
            <Button
              shape="circle"
              icon={<AudioOutlined />}
              size="large"
              style={{
                margin: "0 20px",
                backgroundColor: "#13C2C2",
                color: "#fff",
              }}
            />
            <Button
              shape="circle"
              icon={<PhoneOutlined />}
              size="large"
              style={{ backgroundColor: "#F5222D", color: "#fff" }}
            />
            <Button
              shape="circle"
              icon={<AudioMutedOutlined />}
              size="large"
              style={{
                margin: "0 20px",
                backgroundColor: "#13C2C2",
                color: "#fff",
              }}
            />
          </div>

          <div style={{ marginTop: 10 }}>
            <Text style={{ marginRight: "77px" }}>Speaker</Text>
            <Text>Mute</Text>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default Land;