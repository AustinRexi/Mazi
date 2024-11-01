import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const PrevandNext = () => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <Button
        icon={<LeftOutlined />}
        size="large"
        type="default"
        style={{
          border: "none",
          color: "#969696",
          fontWeight: 500,
          fontSize: "16px",
          lineHeight: "20px",
        }}
      >
        Previous
      </Button>
      <Button
        size="large"
        type="default"
        style={{
          backgroundColor: "#EBF0ED",
          color: "#969696",
          fontWeight: 500,
          fontSize: "16px",
          lineHeight: "20px",
        }}
      >
        Next <RightOutlined />
      </Button>
    </div>
  );
};

export default PrevandNext;
