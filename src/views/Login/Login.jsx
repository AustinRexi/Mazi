import { Col, Row } from "antd";
import Imagepage from "./Imagepage";
import Formpage from "./Formpage";

function Login() {
  return (
    <div style={{ minHeight: "100vh", background: "#f5f7fa" }}>
      <Row style={{ minHeight: "100vh" }}>
        <Col xs={0} md={8} lg={12}>
          <Imagepage />
        </Col>
        <Col
          xs={24}
          md={16}
          lg={12}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px 20px",
          }}
        >
          <Formpage />
        </Col>
      </Row>
    </div>
  );
}

export default Login;
