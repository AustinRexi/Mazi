import React from "react";
import dayjs from "dayjs";
import { CalendarOutlined } from "@ant-design/icons";
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
    <div style={{ padding: 8 }}>
      <Space direction="vertical" size={4}>
        <DatePicker
          suffixIcon={<CalendarOutlined />}
          placeholder="This Month"
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
      </Space>
    </div>
  );
};

export default Calender;
