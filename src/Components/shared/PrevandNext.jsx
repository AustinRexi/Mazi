import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const PrevandNext = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <Button
        icon={<LeftOutlined />}
        size="medium"
        type="default"
        style={{
          border: "none",
          color: "#969696",
          fontWeight: 500,
          backgroundColor: "#F1F5F5",
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
        }}
      >
        Next <RightOutlined />
      </Button>
    </div>
  );
};

export default PrevandNext;
