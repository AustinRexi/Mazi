import { Row, Col } from "antd";
import MapComponent from "./MapComponent";
import CourierDetails from "./CourierDetails";

function TrackOrder() {
  return (
    <div style={{ padding: 10 }}>
      <Row gutter={[4, 10]}>
        <Col span={17}>
          <MapComponent />
        </Col>
        <Col span={7}>
          <CourierDetails />
        </Col>
      </Row>
    </div>
  );
}

export default TrackOrder;
