import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { Flex, Layout } from "antd";
import { useEffect, useState } from "react";
const { Header, Sider, Content } = Layout;

const LayoutDesign = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Flex>
      <Layout
        style={{
          maxWidth: "100vw",
          width: "100vw",
          overflowX: "hidden",
          backgroundColor: "white",
          margin: 0,
          padding: 0,
        }}
      >
        <Header
          style={{
            backgroundColor: "white",
            height: "78px",
            marginTop: 2,
            margin: 0,
            padding: 0,
          }}
        >
          <Navbar />
        </Header>
        <Layout>
          {isDesktop && (
            <Sider style={{ backgroundColor: "white" }} width={258}>
              <Sidebar />
            </Sider>
          )}
          <Content style={{ padding: 12, background: "#F2FBFB" }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Flex>
  );
};

export default LayoutDesign;
