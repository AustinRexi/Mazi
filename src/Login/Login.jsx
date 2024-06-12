import { Col, Row } from "antd";
import Imagepage from "./Imagepage";
import Formpage from "./Formpage";

function Login() {
  return (
    <div style={{ height: "100vh" }}>
      <Row style={{ padding: 0, marginBottom: 5, height: "100vh" }}>
        <Col span={12}>
          <Imagepage />
        </Col>
        <Col span={12} style={{ marginTop: "30px" }}>
          <Formpage />
        </Col>
      </Row>
    </div>
  );
}

export default Login;
