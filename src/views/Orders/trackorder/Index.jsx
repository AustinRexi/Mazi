import { Row, Col } from "antd";
import MapComponent from "./MapComponent";
import CourierDetails from "./CourierDetails";

function TrackOrder() {
  return (
    <div style={{ padding: 16 }}>
      <Row gutter={[0, 16]}>
        <Col
          xs={{ span: 24, offset: 0 }}
          md={{ span: 24, offset: 0 }}
          lg={{ span: 16, offset: 0 }}
        >
          <MapComponent />
        </Col>
        <Col
          xs={{ span: 24, offset: 0 }}
          md={{ span: 24, offset: 0 }}
          lg={{ span: 7, offset: 1 }}
        >
          <CourierDetails />
        </Col>
      </Row>
    </div>
  );
}

export default TrackOrder;
