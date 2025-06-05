import { Card, Typography } from "antd";
import image from "../../utils/icons/Images/image.png";
const { Title } = Typography;

function Imagepage() {
  return (
    <div style={{ padding: 0 }}>
      <Card
        span={12}
        hoverable
        style={{
          height: "130vh",
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: 0,
          backgroundColor: "#034147",
          position: "relative",
          marginBottom: "20px",
        }}
      >
        <div>
          <div
            style={{
              position: "absolute",
              marginTop: "580px",
              left: "50%",
              transform: "translateX(-50%)",

              textAlign: "center",
            }}
          >
            <Title level={3} style={{ color: "white" }}>
              Welcome to Mazi
            </Title>
            <Title level={5} style={{ color: "white" }}>
              Buy fresh ingredients, try dishes from different places and easily
              convert currencies-
              <span style={{ color: "orange" }}>all in one app</span>
            </Title>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Imagepage;
