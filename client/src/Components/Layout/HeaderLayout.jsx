import React, { useState } from "react";
import { Layout, Row, Col, Button, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import styles from "../css/Header.module.css";

const { Header } = Layout;

function HeaderLayout() {
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Thêm state để xác định trạng thái đăng nhập

  const handleUserClick = () => {
    setMenuVisible(!menuVisible);
  };

  const handleMenuClick = ({ key }) => {
    if (key === "login") {
      navigate("/login");
    } else if (key === "register") {
      navigate("/register");
    }
    setMenuVisible(false);
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleLogout = () => {
    // Xử lý đăng xuất ở đây
    setIsLoggedIn(false);
  };

  return (
    <Layout>
      <Header style={{ backgroundColor: "#fff" }}>
        <Row align="middle">
          <Col flex={1}>
            <Link to="/" className={styles.logo}>
              Đây là Logo
            </Link>
          </Col>
          <Col flex={1}>
            <Menu
              mode="horizontal"
              style={{ borderBottom: "none" }}
              defaultSelectedKeys={["home"]}
            >
              <Menu.Item key="home">
                <Link to="/" className={styles.menuItem}>
                  Trang chủ
                </Link>
              </Menu.Item>
              <Menu.Item key="products">
                <Link to="/products" className={styles.menuItem}>
                  Sản phẩm
                </Link>
              </Menu.Item>
              <Menu.Item key="contact">
                <Link to="/contact" className={styles.menuItem}>
                  Liên Hệ
                </Link>
              </Menu.Item>
              <Menu.Item key="about">
                <Link to="/about" className={styles.menuItem}>
                  Về chúng tôi
                </Link>
              </Menu.Item>
            </Menu>
          </Col>
          <Col flex={1} style={{ textAlign: "right" }}>
            {isLoggedIn ? (
              <>
                <span className={styles.menuItem}>Xin chào người dùng abc...</span>
                <Menu
                  onClick={handleMenuClick}
                  style={{ position: "absolute", right: 0, zIndex: 4 }}
                >
                  <Menu.Item key="user-info">
                    <Link to="/user" className={styles.menuItem}>
                      Xem thông tin người dùng
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="logout">
                    <span onClick={handleLogout} className={styles.menuItem}>
                      Đăng xuất
                    </span>
                  </Menu.Item>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  shape="circle"
                  icon={<ShoppingCartOutlined />}
                  onClick={handleCartClick}
                  style={{ marginRight: 5 }}
                />
                <Button
                  shape="circle"
                  icon={<UserOutlined />}
                  onClick={handleUserClick}
                />
                {menuVisible && (
                  <Menu
                    onClick={handleMenuClick}
                    style={{ position: "absolute", right: 0, zIndex: 4 }}
                  >
                    <Menu.Item key="login">
                      <Link to="/login" className={styles.menuItem}>
                        Đăng nhập
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="register">Đăng ký</Menu.Item>
                  </Menu>
                )}
              </>
            )}
          </Col>
        </Row>
      </Header>
    </Layout>
  );
}

export default HeaderLayout;
