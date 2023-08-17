import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Form, Input, Button, Divider } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "../css/Login.css";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (values) => {
    // Xử lý logic đăng nhập
    console.log("Đăng nhập:", values);
  };

  const handleRegister = () => {
    // Chuyển đến trang đăng ký
    console.log("Chuyển đến trang đăng ký");
  };

  const handleForgotPassword = () => {
    // Chuyển đến trang quên mật khẩu
    console.log("Chuyển đến trang quên mật khẩu");
  };

  const handleGoogleLogin = (credentialResponse) => {
    const decoded = jwt_decode(credentialResponse.credential);

    const { name, email, picture } = decoded;
    const googleUser = {
      name,
      email,
      picture,
    };
    console.log("du lieu gui di", googleUser);
    // Gửi đối tượng user lên server
    axios
      .post("http://localhost:5000/api/auth/google/login", googleUser)
      .then((response) => {
        // Xử lý phản hồi từ server sau khi gửi thành công
        if (response.status === 200) {
          // Lưu thông tin người dùng vào local storage
          localStorage.setItem("user", JSON.stringify(response.data));
          console.log("Lưu trên localStorage thành công");

          // Cập nhật lại trạng thái đăng nhập và thông tin người dùng trong phần header
          window.dispatchEvent(new Event("storage"));
          // Tải lại trang để cập nhật thông tin đăng nhập
          navigate(-1);
        }
      })
      .catch((error) => {
        console.error("Lỗi khi gửi yêu cầu POST:", error);
      });
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Đăng nhập</h2>
        <Form onFinish={handleLogin}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập email!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
              className="input-field"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Mật khẩu"
              className="input-field"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-button">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
        <p className="login-link">
          Bạn chưa có tài khoản?{" "}
          <Link to="/register">
            <a onClick={handleRegister}>Đăng ký ngay</a>
          </Link>
        </p>
        <p className="login-link">
          <a onClick={handleForgotPassword}>Quên mật khẩu?</a>
        </p>
        <Divider />
        <div className="google-login-button">
          <GoogleOAuthProvider clientId="784111210562-0m56kmhe9jfaugmrngol9ot58c870k8r.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => {
                console.log("Login Failed");
              }}
              className="google-login-button"
            />
          </GoogleOAuthProvider>
        </div>
      </div>
    </div>
  );
};

export default Login;
