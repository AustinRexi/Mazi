import dayjs from "dayjs";
import { CalendarOutlined, DownOutlined } from "@ant-design/icons";
import { Space, DatePicker } from "antd";

const Calender = () => {
  const onChange = (date) => {
    if (date) {
      console.log("Date: ", date);
    } else {
      console.log("Clear");
    }
  };
  return (
    <div style={{ padding: 6 }}>
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
          }}
        >
          <CalendarOutlined />
          <DatePicker
            style={{
              border: "none",
              outline: "none",
              boxShadow: "none",
              padding: 2,
            }}
            placeholder="This Month"
            suffixIcon={<DownOutlined />}
            presets={[
              {
                label: "This Month",
                value: dayjs().add(-1, "month"),
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
                value: dayjs().add(-1, "month"),
              },
            ]}
            onChange={onChange}
          />
        </div>
      </Space>
    </div>
  );
};

export default Calender;
