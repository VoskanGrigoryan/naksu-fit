import { Button, Card, Input, Space } from "antd";

import AuthLayout from "../../layouts/auth/AuthLayout";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import styles from "./Auth.module.css";
import naksuLogo from "../../assets/naksu.svg";

const AuthView = () => {
  return (
    <AuthLayout>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <img src={naksuLogo} alt="Naksu Logo" style={{ height: 130}} />
      </div>
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
