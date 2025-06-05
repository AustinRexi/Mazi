import { Col, Row } from "antd";
import Imagepage from "./Imagepage";
import Formpage from "./Formpage";

function Login() {
  return (
    <div style={{ height: "100vh" }}>
      <Row gutter={[0, 6]}>
        <Col xs={0} md={8} lg={12}>
          <Imagepage />
        </Col>
        <Col xs={24} md={16} lg={12} style={{ marginTop: "30px" }}>
          <Formpage />
        </Col>
      </Row>
    </div>
  );
}

export default Login;
