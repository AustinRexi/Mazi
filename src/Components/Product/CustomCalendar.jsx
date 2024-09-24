import { useState } from "react";
import { DatePicker, Input, Button, Form } from "antd";
import dayjs from "dayjs";
// import "antd/dist/antd.css";

const CustomCalendar = () => {
  const [form] = Form.useForm();
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date ? dayjs(date).format("YYYY-MM-DD") : null);
  };

  const handleFormSubmit = (values) => {
    console.log("Form Submitted:", values);
  };

  const handleReset = () => {
    form.resetFields();
    setSelectedDate(null);
  };

  return (
    <div
      style={{
        width: 300,
        padding: 20,
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
      }}
    >
      <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
        <Form.Item label="Date Joined" name="dateJoined">
          <DatePicker
            onChange={handleDateChange}
            value={selectedDate ? dayjs(selectedDate) : null}
            style={{ width: "100%" }}
            format="MMMM YYYY"
            picker="month"
          />
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input placeholder="Enter Name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter your email" }]}
        >
          <Input placeholder="Enter Email" />
        </Form.Item>

        <Form.Item label="Verified" name="verified">
          <Input placeholder="Verified?" />
        </Form.Item>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={handleReset}>Reset</Button>
          <Button type="primary" htmlType="submit">
            Done
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CustomCalendar;
