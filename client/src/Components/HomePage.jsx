import { Layout, Row, Col, Button, Menu } from "antd";

import { UserOutlined } from "@ant-design/icons";

import HeaderLayout from "./Layout/HeaderLayout";

import { Routes, Route, Link, Outlet } from "react-router-dom";
import ProductList from "./ProductList";
import About from "./About";
import Contact from "./Contact";
import Home from "./Home";
import FooterLayout from "./Layout/Footer";
import ViewProduct from "./ViewProduct";
import UserAddInfo from "./User/AddInfoUser";
import Login from "./User/Login";
const { Header, Content } = Layout;
function HomePage() {
  return (
    <Layout>
      <HeaderLayout></HeaderLayout>
      <Content>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ViewProduct />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/user/add-info" element={<UserAddInfo />} />
          <Route path="/login" element={<Login />} /> 
        </Routes>
        <Outlet />
      </Content>
      <FooterLayout></FooterLayout>
    </Layout>
  );
}
export default HomePage;
