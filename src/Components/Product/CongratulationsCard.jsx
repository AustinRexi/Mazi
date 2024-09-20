import { Card, Button, Typography } from "antd";

import congratulation from "../../utils/icons/congratulation.svg";
const { Title, Text } = Typography;

export const CongratulationsCard = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
        backgroundColor: "#ffffff",
      }}
    >
      <Card
        style={{
          width: "398px",
          textAlign: "center",
          height: "370px",

          borderRadius: "24px",
          gap: "24px",
          padding: "32px",
        }}
        cover={
          <div style={{ margin: "20px 0" }}>
            <img src={congratulation} />
          </div>
        }
      >
        <Title
          level={4}
          style={{
            fontsize: "24px",
            fontweight: 600,
            lineheight: "32px",
            textalign: "center",
          }}
        >
          Congratulations
        </Title>
        <Text
          style={{
            fontsize: "16px",
            fontweight: 500,
            lineheight: "24px",
            textalign: "center",
          }}
        >
          Congratulations, your product has been added to the list successfully.
        </Text>
        <div style={{ marginTop: "20px" }}>
          <Button
            type="primary"
            style={{
              width: "300px",
              height: "40px",
              borderRadius: "24px",
              gap: 12,
              Padding: "14px, 28px, 14px, 28px",
              backgroundColor: "#055961",
            }}
          >
            View Product List
          </Button>
        </div>
      </Card>
    </div>
  );
};
