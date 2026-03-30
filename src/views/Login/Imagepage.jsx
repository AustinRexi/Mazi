import { Card, Typography } from "antd";
import image from "../../utils/icons/Images/image.png";
const { Title, Paragraph } = Typography;

function Imagepage() {
  return (
    <div style={{ height: "100%", padding: 0 }}>
      <Card
        style={{
          height: "100vh",
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center 18%",
          padding: 0,
          backgroundColor: "#034147",
          position: "relative",
          borderRadius: 0,
          border: "none",
          overflow: "hidden",
        }}
        bodyStyle={{ padding: 0, height: "100%" }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(3,65,71,0.2) 0%, rgba(3,65,71,0.88) 100%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "flex-end",
            padding: "0 48px 64px 48px",
          }}
        >
          <div style={{ maxWidth: 520 }}>
            <Title
              level={2}
              style={{
                color: "#ffffff",
                marginBottom: 10,
                lineHeight: "1.15",
                fontFamily: "NeueHaasDisplayMediu",
              }}
            >
              Welcome to Mazi
            </Title>
            <Paragraph
              style={{
                color: "rgba(255,255,255,0.92)",
                fontSize: 16,
                lineHeight: "25px",
                marginBottom: 0,
                fontFamily: "NeueHaasDisplayRoman",
              }}
            >
              Buy fresh ingredients, discover great dishes, and manage business
              operations from one platform.
            </Paragraph>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Imagepage;
