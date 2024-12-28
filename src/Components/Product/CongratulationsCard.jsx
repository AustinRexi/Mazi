import { useNavigate } from "react-router-dom";
import { Card, Button, Typography } from "antd";
import congratulation from "../../utils/icons/congratulation.svg";

const { Title, Text } = Typography;

const CongratulationsCard = () => {
  const navigate = useNavigate();

  const handleViewProducts = () => {
    navigate("/products");
  };

  return (
    <>
      <Card
        style={{
          width: "370px",
          textAlign: "center",
          height: "350px",
          border: "none",
          borderRadius: "28px",
          justifyContent: "center",
          alignContent: "center",
        }}
        cover={
          <div style={{ margin: "20px 0" }}>
            <img
              src={congratulation}
              alt="Congratulations"
              style={{ width: "180px", height: "100px" }}
            />
          </div>
        }
      >
        <Title
          level={3}
          style={{
            fontSize: "24px",
            fontWeight: 700,
            lineHeight: "32px",
            textAlign: "center",
            fontFamily: "NeueHaasDisplayLight",
            color: " #034147",
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
            fontFamily: "NeueHaasDisplayRoman",
            wordBreak: "break-word",
            whiteSpace: "wrap",
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
