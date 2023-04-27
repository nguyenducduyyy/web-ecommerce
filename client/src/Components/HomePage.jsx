import React from "react";

import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Footer } = Layout;
function HomePage() {

  return (
    <div>
      <Layout>
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={new Array(6).fill(null).map((_, index) => {
            const key = index + 1;
            return {
              key,
              label: `nav ${key}`,
            };
          })}
        />
      </Header>
        <Content >Content</Content>
        <Footer >Footer</Footer>
      </Layout>
    </div>
  );
}

export default HomePage;
