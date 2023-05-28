import React, { useState } from "react";
import { Layout, Menu } from "antd";
import FormCreateProduct from "./FormCreateProduct";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import ProductManagement from "./ProductManagement";
import UserManagement from "./UserManagement";
import EditProduct from "./EditProduct"
// axios test

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const colorBgContainer = "#fff";


  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu.Item key="1" icon={<VideoCameraOutlined />}>
            <Link to="quan-ly-san-pham">Quản lý sản phẩm</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="quan-ly-nguoi-dung">Quản lý người dùng</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            <Link to="nav-3">Nav 3</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Routes>
            <Route path="/quan-ly-san-pham" element={<ProductManagement />} />
            <Route path="/quan-ly-san-pham/tao-moi-san-pham" element={<FormCreateProduct />}/>
            <Route path="/quan-ly-san-pham/:id/edit" element={<EditProduct />}/>
            <Route path="/quan-ly-nguoi-dung" element={<UserManagement />} />
          </Routes>

          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
