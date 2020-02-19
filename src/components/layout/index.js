import React from "react";
import { Layout, Menu, Breadcrumb, Button, Icon } from "antd";
import "./index.less";

const { Header, Content, Footer } = Layout;

function SystemLayout({ children }) {
  return (
    <Layout className="app-layout">
      <Header className="app-layout-header">
        <img
          className="logo"
          src="https://seeklogo.com/images/M/mestre-free-fire-logo-5998E6A25B-seeklogo.com.png"
          alt="logo"
        />
        <Menu
          className="app-layout-header__menu"
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
        >
          <Menu.Item key="1">
            <span>
              <Icon type="home" />
              <span>Home</span>
            </span>
          </Menu.Item>
          <Menu.Item key="2">
            <span>
              <Icon type="ordered-list" />
              <span>My Tasks</span>
            </span>
          </Menu.Item>
        </Menu>
        <Button
          type="danger"
          icon="logout"
          className="logout-btn"
          onClick={() => (window.location = "/")}
        >
          Logout
        </Button>
      </Header>
      <Content className="app-layout-content-wrapper">
        <Breadcrumb className="app-layout-breadcrumb">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Tasks</Breadcrumb.Item>
        </Breadcrumb>
        <div className="app-layout-content">{children}</div>
      </Content>
      <Footer className="app-layout-footer">
        TaskList @2020 Created by{" "}
        <a
          href="http://github.com/malkgp"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub/malkgp
        </a>
      </Footer>
    </Layout>
  );
}

export default SystemLayout;
