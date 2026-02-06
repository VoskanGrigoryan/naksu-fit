import { Button, Card, Input, Space, Typography } from "antd";

import AuthLayout from "../../layouts/auth/AuthLayout";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import styles from "./Auth.module.css";

const { Title } = Typography;

const AuthView = () => {
  return (
    <AuthLayout>
      <Title level={2}>Naksu Fit</Title>
      <Card className={styles["auth-card"]}>
        <Space orientation="vertical" size="middle" style={{ display: "flex" }}>
          <Input placeholder="Usuario" size="large" prefix={<UserOutlined />} />
          <Input.Password
            placeholder="Contraseña"
            size="large"
            prefix={<LockOutlined />}
          />
          <div>
            <Button type="primary" size="large" style={{ width: "100%" }}>
              Iniciar sesión
            </Button>
          </div>
        </Space>
      </Card>
    </AuthLayout>
  );
};

export default AuthView;
