import { useState } from "react";
import { Radio, Space } from "antd";
const Radiobtn = () => {
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  return (
    <Radio.Group onChange={onChange} value={value}>
      <Space direction="vertical">
        <Radio value={1}>Do Not Allow</Radio>
        <Radio value={2}>Allow but notify customer</Radio>
        <Radio value={3}>Allow</Radio>
      </Space>
    </Radio.Group>
  );
};
export default Radiobtn;
