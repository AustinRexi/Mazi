import { Typography } from "antd";
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
        paddingLeft: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "space-between",
          width: "1030px",
          padding: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Title
            level={5}
            style={{
              fontWeight: 600,
              fontSize: "24px",
              lineHeight: "32px",
              fontFamily: "NeueHaasDisplayBoldItalic",
            }}
          >
            Hello Tunde
          </Title>
          <img style={{ marginBottom: "6px" }} src={waveIcon} alt="wave icon" />
        </div>
        <Calender />
      </div>

      <Cardcomponent />
      <div style={{ marginTop: "20px" }}>
        <ChartDetail />
      </div>
    </section>
  );
};

export default Board;
