import { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { Button } from "antd";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
function  Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginFormSubmit = (e) => {
    e.preventDefault();

    // Xử lý đăng nhập bằng tài khoản được người dùng tạo
    console.log("Email:", email);
    console.log("Password:", password);
  };
  const location = useLocation();

  useEffect(() => {
    console.log("Đường dẫn hiện tại:", location.pathname);
  }, [location]);

  
  const handleGoogleLogin = () => {
    const redirectUri = encodeURIComponent(
      "http://localhost:5000/api/auth/google"
    );
    const previousPageUrl = window.location.pathname;
    window.location.href = `http://localhost:5000/api/auth/google?redirect_uri=${redirectUri}&previous=${previousPageUrl}`;
  };
  return (
    <div>
      <h2>Đăng nhập</h2>

      <form onSubmit={handleLoginFormSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label>Mật khẩu:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Đăng nhập</button>
      </form>

      <div>
        <Button onClick={handleGoogleLogin}>Đăng nhập bằng Google</Button>
      </div>
    </div>
  );
}

export default Login;
