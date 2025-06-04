import { Typography } from "antd";
import Calender from "../Dashboard/Calender";
const { Title } = Typography;

function Card2(props) {
  return (
    <div
      style={{
        padding: "4px",
        borderRadius: "4px",
        marginTop: "6px",
        width: "150px",
        height: "296px",
      }}
    >
      <Calender style={{ width: "140px" }} />
      <div style={{ marginRight: "20px" }}>
        {props.data.map((list) => (
          <div
            key={list.detail}
            style={{
              width: "140px",
              height: "64px",
              marginTop: "10px",
              borderRadius: 6,
              marginLeft: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              padding: 2,
              border: "1px solid #DEEAEA",
            }}
          >
            <Title
              level={5}
              style={{
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: "24px",
                marginTop: 4,
              }}
            >
              {list.total}
            </Title>
            <span
              style={{
                marginBottom: "10px",
                fontWeight: 500,
                lineHeight: "24px",
                fontSize: "14px",
                color: "#545E5E",
              }}
            >
              {list.detail}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card2;
