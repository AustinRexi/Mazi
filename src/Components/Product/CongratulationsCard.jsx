import { useNavigate } from "react-router-dom";
import { Card, Button, Typography } from "antd";
import congratulation from "../../utils/icons/congratulation.svg";

const { Title, Text } = Typography;

const CongratulationsCard = () => {
  const navigate = useNavigate();

  const handleViewProducts = () => {
    navigate("/products");
    console.log("ffff");
  };

  return (
    <>
      <Card
        style={{
          width: "398px",
          textAlign: "center",
          height: "370px",
          border: "none",
          borderRadius: "24px",
          gap: "24px",
          padding: "32px",
        }}
        cover={
          <div style={{ margin: "20px 0" }}>
            <img src={congratulation} alt="Congratulations" />
          </div>
        }
      >
        <Title
          level={4}
          style={{
            fontSize: "24px",
            fontWeight: 600,
            lineHeight: "32px",
            textAlign: "center",
          }}
        >
          Congratulations
        </Title>
        <Text
          style={{
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "24px",
            textAlign: "center",
          }}
        >
          Congratulations, your product has been added to the list successfully.
        </Text>

        <div style={{ marginTop: "20px" }}>
          <Button
            type="primary"
            style={{
              width: "100%",
              height: "40px",
              borderRadius: "24px",
              gap: 12,
              padding: "14px 28px",
              backgroundColor: "#055961",
            }}
            onClick={handleViewProducts}
          >
            View Product List
          </Button>
        </div>
      </Card>
    </>
  );
};

export default CongratulationsCard;
