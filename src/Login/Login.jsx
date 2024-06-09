import { Col, Row } from "antd";
import Imagepage from "./Imagepage";
import Formpage from "./Formpage";

function Login() {
  return (
    <div>
      <Row>
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
