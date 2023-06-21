import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

function Contact() {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    const redirectUri = encodeURIComponent('http://localhost:5000/api/auth/google');
    window.location.href = `http://localhost:5000/api/auth/google?redirect_uri=${redirectUri}`;
  };

  return (
    <div>
      <Button onClick={handleGoogleLogin}>Đăng nhập bằng Google</Button>
    </div>
  );
}

export default Contact;
