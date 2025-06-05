// import { useEffect, useState } from "react";
// import { LockOutlined, UserOutlined } from "@ant-design/icons";
// import { Button, Form, Input, Typography } from "antd";
// import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
// const { Title } = Typography;
// function Formpage() {
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [form] = Form.useForm();
//   const [clientReady, setClientReady] = useState(false);

//   useEffect(() => {
//     setClientReady(true);
//   }, []);
//   const onFinish = (values) => {
//     console.log("Finish:", values);
//   };
//   return (
//     <div
//       style={{
//         height: "100vh",
//         width: "50vh",
//         alignContent: "center",
//         justifyContent: "center",
//         marginLeft: "40px",
//       }}
//     >
//       <div style={{ marginLeft: "100px" }}>
//         <Title
//           level={3}
//           style={{ marginLeft: "12px", fontSize: "34px", lineHeight: "22px" }}
//         >
//           Admin Login
//         </Title>
//         <Title level={5}>please enter your login details</Title>
//       </div>
//       <Form
//         form={form}
//         name="horizontal_login"
//         layout="block"
//         onFinish={onFinish}
//         style={{
//           width: "50vh",
//           padding: "24px",
//           background: "white",
//           boxshadow: " 0 0 10px rgba(0, 0, 0, 0.1)",
//           borderradius: "8px",
//           marginLeft: "60px",
//         }}
//       >
//         <Form.Item
//           name="username"
//           rules={[
//             {
//               required: true,
//               message: "Please input your username!",
//             },
//           ]}
//         >
//           <Input
//             prefix={<UserOutlined className="site-form-item-icon" />}
//             placeholder="Username"
//           />
//         </Form.Item>
//         <Form.Item
//           name="password"
//           rules={[
//             {
//               required: true,
//               message: "Please input your password!",
//             },
//           ]}
//         >
//           <Input
//             prefix={<LockOutlined className="site-form-item-icon" />}
//             type={passwordVisible ? "text" : "password"}
//             placeholder="Password"
//             suffix={
//               passwordVisible ? (
//                 <EyeTwoTone onClick={() => setPasswordVisible(false)} />
//               ) : (
//                 <EyeInvisibleOutlined
//                   onClick={() => setPasswordVisible(true)}
//                 />
//               )
//             }
//           />
//         </Form.Item>
//         <p style={{ marginLeft: "170px" }}> Forgot Password?</p>
//         <Form.Item shouldUpdate>
//           {() => (
//             <Button
//               style={{
//                 width: "43vh",
//                 marginTop: "8px",
//                 backgroundColor: "#034147",
//                 color: "white",
//               }}
//               type="primary"
//               htmlType="submit"
//               disabled={
//                 !clientReady ||
//                 !form.isFieldsTouched(true) ||
//                 !!form.getFieldsError().filter(({ errors }) => errors.length)
//                   .length
//               }
//             >
//               Continue
//             </Button>
//           )}
//         </Form.Item>
//       </Form>
//     </div>
//   );
// }

// export default Formpage;
import { useState, useEffect, useContext } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography, Alert } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { loginUser } from "../../services/authService";

const { Title } = Typography;

function Formpage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState(false);
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setClientReady(true);
  }, []);

  const onFinish = async (values) => {
    try {
      const { token } = await loginUser(values); // Call API with username and password
      login(token); // Store token in context and localStorage
      setError(""); // Clear any previous errors
      navigate("/"); // Redirect to root (Board)
    } catch (err) {
      setError(err.message || "Failed to login. Please try again.");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        // width: "50vh",
        alignContent: "center",
        justifyContent: "center",
        // marginLeft: "40px",
      }}
    >
      <div style={{ marginLeft: "100px" }}>
        <Title
          level={3}
          style={{ marginLeft: "12px", fontSize: "34px", lineHeight: "22px" }}
        >
          Admin Login
        </Title>
        <Title level={5}>please enter your login details</Title>
      </div>
      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          style={{ marginBottom: 16, marginLeft: "60px", width: "50vh" }}
        />
      )}
      <Form
        form={form}
        name="horizontal_login"
        layout="block"
        onFinish={onFinish}
        style={{
          width: "50vh",
          padding: "24px",
          background: "white",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          marginLeft: "25px",
        }}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            suffix={
              passwordVisible ? (
                <EyeTwoTone onClick={() => setPasswordVisible(false)} />
              ) : (
                <EyeInvisibleOutlined
                  onClick={() => setPasswordVisible(true)}
                />
              )
            }
          />
        </Form.Item>
        <p style={{ marginLeft: "120px" }}>Forgot Password?</p>
        <Form.Item shouldUpdate>
          {() => (
            <Button
              style={{
                width: "43vh",
                marginTop: "8px",
                backgroundColor: "#034147",
                color: "white",
              }}
              type="primary"
              htmlType="submit"
              disabled={
                !clientReady ||
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Continue
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
}

export default Formpage;
