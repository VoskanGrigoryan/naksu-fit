import { Layout } from "antd";
import styles from "./AuthLayout.module.css";
import { GlobalOutlined, MoonOutlined, SunOutlined } from "@ant-design/icons";

const { Content, Footer} = Layout;

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout className={styles["auth-layout"]}>
      <Content className={styles["auth-content"]}>{children}</Content>

      <Footer className={styles["auth-footer"]}><GlobalOutlined /><SunOutlined /><MoonOutlined /></Footer>
    </Layout>
  );
};

export default AuthLayout;
