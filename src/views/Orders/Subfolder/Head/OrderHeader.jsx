import { Button, Space, Flex } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import PrevandNext from "../../../../Components/shared/Buttons/PrevandNext";
import PaymentSummary from "../Orderdetails/PaymentSummary";

const OrderHeader = () => {
  const orderDate = dayjs("2024-02-13T10:15:00"); // Date in ISO format

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Flex style={{ gap: 10 }}>
          <h2
            style={{
              marginTop: 12,
              fontWeight: 600,
              lineHeight: "32px",
              fontSize: "24px",
            }}
          >
            Order #465765322
          </h2>
          <Space style={{ marginLeft: "15px", gap: 10 }}>
            <Button
              type="secondary"
              style={{
                border: "1px solid #22BB5F",
                borderRadius: "18px",
                color: "#22BB5F",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "20px",
              }}
              variant="solid"
            >
              Paid
            </Button>
            <Button
              style={{
                border: "1px solid #ED9922",
                borderRadius: "18px",
                color: "#ED9922",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "20px",
              }}
              variant="solid"
            >
              Unfulfilled
            </Button>
          </Space>
        </Flex>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "200px",
          }}
        >
          <CalendarOutlined style={{ marginRight: "10px" }} />
          <span>{orderDate.format("MMM D, YYYY [at] h:mm A")}</span>
        </div>

        <PrevandNext />
      </div>
      <PaymentSummary />
    </>
  );
};

export default OrderHeader;
