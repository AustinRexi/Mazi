import { Typography, Row, Col } from "antd";
import Calender from "./Calender";
import ChartDetail from "./ChartDetail";
import Cardcomponent from "./Cardcomponent";
import waveIcon from "../../utils/icons/emoji-wave.svg";

const { Title } = Typography;

const Board = () => {
  return (
    <section
      style={{
        backgroundColor: "#F8FBFB",
      }}
    >
      <Row gutter={[30, 20]} style={{ padding: 10 }}>
        <Col xs={24} md={19} lg={19}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginLeft: 10,
            }}
          >
            <Title
              level={5}
              style={{
                fontWeight: 600,
                fontSize: "24px",
                lineHeight: "32px",
                fontFamily: "NeueHaasDisplayBoldItalic",
                whiteSpace: "nowrap",
              }}
            >
              Hello Tunde
            </Title>
            <img
              style={{ marginBottom: "6px" }}
              src={waveIcon}
              alt="wave icon"
            />
          </div>
        </Col>
        <Col xs={10} md={5}>
          <Calender />
        </Col>
      </Row>
      <div style={{ marginRight: 50 }}>
        <Cardcomponent />
      </div>

      <div style={{ marginTop: "20px" }}>
        {" "}
        <ChartDetail />
      </div>
    </section>
  );
};

export default Board;
