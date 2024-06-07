import React from "react";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";

const onChange = (date) => {
  if (date) {
    console.log("Date: ", date);
  } else {
    console.log("Clear");
  }
};

const Board = () => (
  <Space direction="vertical" size={4}>
    <DatePicker
      placeholder="This Month"
      presets={[
        {
          label: "This Month",
          value: dayjs().add(-1, "d"),
        },
        {
          label: "Three Months",
          value: dayjs().add(-7, "d"),
        },
        {
          label: "Six Months",
          value: dayjs().add(-1, "month"),
        },
        {
          label: "One Year",
          value: dayjs().add(-1, "month"),
        },
      ]}
      onChange={onChange}
    />
  </Space>
);
export default Board;
