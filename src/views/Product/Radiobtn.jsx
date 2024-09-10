import { useState } from "react";
import { Radio, Space } from "antd";
const Radiobtn = () => {
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const options = [
    { value: 1, label: "Do Not Allow" },
    { value: 2, label: "Allow but notify customer" },
    { value: 3, label: "Allow" },
  ];
  return (
    <Radio.Group onChange={onChange} value={value}>
      <Space direction="vertical">
        {options.map((option) => (
          <Radio key={option.value} value={option.value}>
            {option.label}
          </Radio>
        ))}
      </Space>
    </Radio.Group>
  );
};
export default Radiobtn;
