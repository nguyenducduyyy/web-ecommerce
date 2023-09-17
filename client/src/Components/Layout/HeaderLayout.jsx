import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Button, Menu, Dropdown, Avatar } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import logoImage from '../../Img/Main_Logo-removebg-preview (12).png';
import styles from '../css/Header.module.css';

const { Header } = Layout;

function HeaderLayout() {
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem('user');

      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsLoggedIn(true); // Đánh dấu đã đăng nhập
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      } else {
        setIsLoggedIn(false); // Đánh dấu chưa đăng nhập
        setUser(null); // Xóa thông tin người dùng trong state
      }
    };

    handleStorageChange(); // Xử lý trạng thái ban đầu khi component được tạo (refresh trang)

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleUserClick = () => {
    setMenuVisible(!menuVisible);
  };

  const handleMenuClick = ({ key }) => {
    if (key === 'login') {
      navigate('/login');
    } else if (key === 'register') {
      navigate('/register');
    } else if (key === 'user-info') {
      navigate('/user-info');
    }

    setMenuVisible(false);
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); // Xóa thông tin người dùng khỏi local storage
    setIsLoggedIn(false); // Đánh dấu chưa đăng nhập
    setUser(null); // Xóa thông tin người dùng trong state
    navigate('/');
    window.location.reload();
  };

  return (
    <Header style={{ backgroundColor: '#fff', padding: '0', paddingLeft: '5%', paddingRight: '5%' }}>
      <Row align="middle" style={{ alignItems: 'stretch' }}>
        {/* <Col flex={1}>
            <Link to="/" className={styles.logo}>
              Đây là Logo
            </Link>
          </Col> */}
        <Col flex={1}>
          <Link to="/">
            <img src={logoImage} alt="Logo" style={{ maxHeight: '64px', display: 'block', maxWidth: '100%' }} />
          </Link>
        </Col>
        <Col flex={1}>
          <Menu mode="horizontal" style={{ borderBottom: 'none' }} defaultSelectedKeys={['home']}>
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
        <Col flex={1} style={{ textAlign: 'right' }}>
          {isLoggedIn ? (
            <>
              <div>
                <span style={{ marginRight: 14 }}>xin chào {user.name.split(' ')[0] + ' ! '} </span>
                <Button shape="circle" icon={<ShoppingCartOutlined />} onClick={handleCartClick} style={{ marginRight: 5 }} />
                <span className="avatar-wrapper" onClick={handleUserClick}>
                  {user?.picture ? <Avatar src={user.picture} /> : <Avatar icon={<UserOutlined />} />}
                </span>

                {menuVisible && (
                  <Menu
                    onClick={handleMenuClick}
                    style={{
                      position: 'absolute',
                      right: 0,
                      zIndex: 4,
                      border: '1px solid #ddd',
                      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
                      borderRadius: '10px', // Đường viền cho 4 góc
                    }}
                  >
                    <Menu.Item key="user-info">
                      <Link to="/user-info" className={styles.menuItem}>
                        Xem Thông Tin Người Dùng
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="order-info">
                      <Link to="/order-info" className={styles.menuItem}>
                        Xem Đơn Hàng
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="logout" onClick={handleLogout}>
                      <span className={styles.menuItem}>Đăng xuất</span>
                    </Menu.Item>
                  </Menu>
                )}

                {/* {menuVisible && (
                  <div className={styles.dropdownMenu}>
                    <Menu onClick={handleMenuClick} className={styles.menu}>
                      <Menu.Item key="user-info">
                        <Link to="/user-info" className={styles.menuItem}>
                          Xem thông tin người dùng
                        </Link>
                      </Menu.Item>
                      <Menu.Item key="order-info">
                        <Link to="/order-info" className={styles.menuItem}>
                          Xem đơn hàng
                        </Link>
                      </Menu.Item>
                      <Menu.Item key="logout" onClick={handleLogout}>
                        <span className={styles.menuItem}>Đăng xuất</span>
                      </Menu.Item>
                    </Menu>
                  </div>
                )} */}
              </div>
            </>
          ) : (
            <>
              <Button shape="circle" icon={<ShoppingCartOutlined />} onClick={handleCartClick} style={{ marginRight: 5 }} />
              <Button shape="circle" icon={<UserOutlined />} onClick={handleUserClick} />
              {menuVisible && (
                <Menu onClick={handleMenuClick} style={{ position: 'absolute', right: 0, zIndex: 4 }}>
                  <Menu.Item key="login">
                    <Link to="/login" className={styles.menuItem}>
                      Đăng nhập
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="register">
                    <Link to="/register" className={styles.menuItem}>
                      Đăng ký
                    </Link>
                  </Menu.Item>
                </Menu>
              )}
            </>
          )}
        </Col>
      </Row>
    </Header>
  );
}

export default HeaderLayout;
