import React from "react";
import { Input, Button, Typography } from "antd";

const { TextArea } = Input;
const { Title, Text } = Typography;

export default function FulfillConfirm() {
  const containerStyle = {
    padding: "20px",
    maxWidth: "600px",
    margin: "0 auto",
  };

  const estimatedTimeContainerStyle = {
    backgroundColor: "#feeede",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
    marginBottom: "20px",
  };

  const timeDisplayStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10px",
  };

  const timeBoxStyle = {
    fontSize: "36px",
    width: "80px",
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "white",
    borderRadius: "8px",
    border: "1px solid #d9d9d9",
    padding: "8px 0",
  };

  const colonStyle = {
    fontSize: "36px",
    fontWeight: "bold",
    margin: "0 10px",
  };

  const orderInfoStyle = {
    marginTop: "20px",
    marginBottom: "20px",
  };

  const noteStyle = {
    marginTop: "10px",
  };

  const continueButtonStyle = {
    width: "100%",
    backgroundColor: "#006d75",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    padding: "10px 0",
    borderRadius: "8px",
  };

  return (
    <div style={containerStyle}>
      {/* Header with Estimated Time */}
      <div style={estimatedTimeContainerStyle}>
        <Title level={5}>Estimated time (16 mins) 10:15 to 10:31</Title>
        <div style={timeDisplayStyle}>
          <div style={timeBoxStyle}>16</div>
          <span style={colonStyle}>:</span>
          <div style={timeBoxStyle}>00</div>
        </div>
      </div>

      {/* Order Information */}
      <div style={orderInfoStyle}>
        <Title level={4}>Order #4567872</Title>
        <Text>Leave a note for the courier (Optional)</Text>

        {/* Note for the Courier */}
        <TextArea
          rows={4}
          placeholder="Note For the Courier: Go to counter 4 on the left where the sign for “pick up” is and present the order number."
          style={noteStyle}
        />
      </div>

      {/* Continue Button */}
      <Button style={continueButtonStyle}>Continue</Button>
    </div>
  );
}
