import { Typography } from "antd";
import Calender from "../Dashboard/Calender";
const { Title } = Typography;

function Card2(props) {
  return (
    <div
      style={{
        padding: "8px",
        borderRadius: "4px",
        marginTop: "6px",
        width: "150px",
        height: "296px",
      }}
    >
      <Calender />
      <div style={{ marginRight: "20px" }}>
        {props.data.map((list) => (
          <div
            key={list.detail} // Ensure unique key for list items
            style={{
              width: "134px",
              height: "52px",

              marginTop: "14px",

              borderRadius: 6,
              marginLeft: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center", // Center content vertically
              alignItems: "center", // Center content horizontally
              textAlign: "center",
              padding: 4,
              border: "1px solid #DEEAEA",
            }}
          >
            <Title
              level={5}
              style={{ fontSize: "14px", fontWeight: 500, lineHeight: "16px" }}
            >
              {list.total}
            </Title>
            <span
              style={{
                marginBottom: "10px",
                fontWeight: 400,
                lineHeight: "14px",
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
