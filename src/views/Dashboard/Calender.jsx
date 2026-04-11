import dayjs from "dayjs";
import { CalendarOutlined, DownOutlined } from "@ant-design/icons";
import { Space, DatePicker } from "antd";

const Calender = ({
  data,
  placeholder,
  style,
  value,
  onChange,
  isRange = false,
  needConfirm = false,
}) => {
  const { RangePicker } = DatePicker;
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

  const presets = data || defaultPresets;
  const rangePresets = [
    {
      label: "Last 7 Days",
      value: [dayjs().subtract(6, "day").startOf("day"), dayjs().endOf("day")],
    },
    {
      label: "Last 30 Days",
      value: [dayjs().subtract(29, "day").startOf("day"), dayjs().endOf("day")],
    },
    {
      label: "Last 90 Days",
      value: [dayjs().subtract(89, "day").startOf("day"), dayjs().endOf("day")],
    },
    {
      label: "This Year",
      value: [dayjs().startOf("year"), dayjs().endOf("day")],
    },
  ];

  return (
    <div style={{ padding: 10, ...style }}>
      <Space direction="vertical" size={4}>
        <div
          style={{
            width: isRange ? "260px" : "134px",
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
          {isRange ? (
            <RangePicker
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
                width: "100%",
              }}
              placeholder={placeholder || ["Start date", "End date"]}
              suffixIcon={<DownOutlined />}
              value={value}
              onChange={onChange}
              needConfirm={needConfirm}
              presets={rangePresets}
              allowClear
            />
          ) : (
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
              value={value}
              onChange={onChange}
              allowClear
            />
          )}
        </div>
      </Space>
    </div>
  );
};

export default Calender;
