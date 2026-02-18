import {
  Divider,
  Group,
  Input,
  Paper,
  PasswordInput,
  Stack,
  Title,
} from "@mantine/core";

import AuthLayout from "../../layouts/auth/AuthLayout";
import { useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";
import naksuLogo from "../../assets/naksu-logo.png";
import { IconKeyFilled, IconUser } from "@tabler/icons-react";
import CustomButton from "../../components/reusable/Button";
import { GoogleButton } from "../../components/reusable/GoogleButton";
import bgImage from "../../assets/muay-thai-bg.jpg";

const AuthView = () => {
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <div className={styles.wrapper}>
        <Paper className={styles.form}>
          <div className={styles.logoContainer}>
            <img src={naksuLogo} alt="Naksu Logo" style={{ height: 240 }} />
          </div>

          <Title order={3} className={styles.title}>
            Iniciar sesión
          </Title>

          <Group grow mb="md">
            <GoogleButton
              radius="md"
              onClick={() => console.log("Google login")}
            >
              Google
            </GoogleButton>
          </Group>

          <Divider
            label="O continuar con usuario"
            labelPosition="center"
            my="lg"
          />

          <Stack gap="md">
            <Input placeholder="Usuario" leftSection={<IconUser size={18} />} />
            <PasswordInput
              placeholder="Contraseña"
              leftSection={<IconKeyFilled size={18} />}
            />
            <CustomButton
              size="large"
              style={{ width: "100%" }}
              onClick={() => navigate("/")}
            >
              Iniciar sesión
            </CustomButton>
          </Stack>
        </Paper>

        <div className={styles.imageSection} style={{ backgroundImage: `url(${bgImage})` }}/>
      </div>
    </AuthLayout>
  );
};

export default AuthView;
