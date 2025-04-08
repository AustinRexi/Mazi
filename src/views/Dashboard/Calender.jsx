import dayjs from "dayjs";
import { CalendarOutlined, DownOutlined } from "@ant-design/icons";
import { Space, DatePicker } from "antd";

const Calender = ({ data, placeholder, style }) => {
  const onChange = (date) => {
    if (date) {
      console.log("Date: ", date);
    } else {
      console.log("Clear");
    }
  };

  const defaultPresets = [
    {
      label: "This Month",
      value: dayjs(),
    },
    {
      label: "Three Months",
      value: dayjs().subtract(3, "month"),
    },
    {
      label: "Six Months",
      value: dayjs().subtract(6, "month"),
    },
    {
      label: "One Year",
      value: dayjs().subtract(1, "year"),
    },
  ];

  const presets = defaultPresets || data;

  return (
    <div style={{ padding: 10, ...style }}>
      <Space direction="vertical" size={4}>
        <div
          style={{
            width: "134px",
            display: "flex",
            alignItems: "center",
            border: "1px solid #d9d9d9",
            borderRadius: "8px",
            padding: "4px 11px",
            backgroundColor: "white",
            ...style,
          }}
        >
          <CalendarOutlined />
          <DatePicker
            style={{
              border: "none",
              outline: "none",
              boxShadow: "none",
              padding: 2,
              fontFamily: "",
              fontWeight: 500,
              lineHeight: "24px",
              fontSize: "16px",
              color: "#121515",
            }}
            placeholder={placeholder || "This Month"}
            suffixIcon={<DownOutlined />}
            presets={presets}
            onChange={onChange}
          />
        </div>
      </Space>
    </div>
  );
};

export default Calender;
