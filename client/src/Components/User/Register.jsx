import React from "react";
import { Form, Input, Button, Divider } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import "../css/Register.css";

const Register = () => {
  const handleRegister = (values) => {
    // Xử lý logic đăng ký
    console.log("Đăng ký:", values);
  };

  const handleLogin = () => {
    // Chuyển đến trang đăng nhập
    console.log("Chuyển đến trang đăng nhập");
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2 className="register-title">Đăng ký</h2>
        <Form onFinish={handleRegister}>
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Tên"
              className="input-field"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
              className="input-field"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu!" },
              { min: 6, message: "Mật khẩu phải chứa ít nhất 6 ký tự!" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Mật khẩu"
              className="input-field"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu xác nhận không khớp!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Xác nhận mật khẩu"
              className="input-field"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="register-button"
            >
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
        <p className="register-link">
          Đã có tài khoản? <a onClick={handleLogin}>Đăng nhập ngay</a>
        </p>
        <Divider />
      </div>
    </div>
  );
};

export default Register;
