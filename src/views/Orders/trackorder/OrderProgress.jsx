import { Card, Typography, Avatar } from "antd";
import firstavatar from "../../../Assets/Ordericons/orderprogressicons/firstavatar.svg";

const { Text } = Typography;
const OrderProgress = () => {
  return (
    <Card
      style={{
        width: 304,
        height: 322,
        padding: 3,
      }}
    >
      <Text
        style={{
          fontFamily: "NeueHaasDisplayMediu",
          fontSize: "20px",
          fontWeight: 600,
          lineHeight: "24px",
        }}
      >
        {" "}
        Order Progress
      </Text>
      <section
        style={{
          width: 220,
          height: 92,
          padding: 8,
          gap: 16,
          borderRadius: 8,
          border: "1px solid #DEEAEA",
        }}
      >
        <Avatar size={36} src={firstavatar} />
      </section>
      <section></section>
      <section></section>
    </Card>
  );
};

export default OrderProgress;
