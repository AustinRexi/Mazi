import { Col, Row, Card, Typography } from "antd";
import image from "../../assets/images/image.png";
const { Title } = Typography;
function Login() {
  return (
    <div>
      <Row style={{ paddingBottom: "30px" }}>
        <Col
          span={12}
          style={{
            paddingBottom: "40px",
          }}
        >
          <Card
            span={12}
            hoverable
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "#034147",
              height: "150vh",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                marginTop: "630px",
                left: "50%",
                transform: "translateX(-50%)",
                padding: "10px",
                textAlign: "center",
              }}
            >
              <Title level={3} style={{ color: "white" }}>
                Welcome to Mazi
              </Title>
              <Title level={5}>
                Buy fresh ingredients, try dishes from different places and
                easily convert currencies-<span>all in one app</span>
              </Title>
            </div>
          </Card>
        </Col>
        <Col span={12}>col-12</Col>
      </Row>
    </div>
  );
}

export default Login;
