import { Group, Stack, Box } from "@mantine/core";
import { useEffect, useState } from "react";
import MainLayout from "../../layouts/main/MainLayout";
import UsersTable from "./UsersTable";
import CustomButton from "../../components/reusable/Button";
import {
  IconDownload,
  IconPlus,
  IconReload,
  IconUpload,
} from "@tabler/icons-react";

const Users = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [reloading, setReloading] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setInitialLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const handleReload = () => {
    setReloading(true);
    setTimeout(() => setReloading(false), 800);
  };

  return (
    <MainLayout>
      <Stack style={{ flex: 1 }} gap="sm">
        <Group
          style={{
            marginBottom: 8,
          }}
        >
          <CustomButton
            loading={initialLoading}
            rightSection={
              <IconPlus size={20} stroke={1.5} style={{ paddingBottom: 4 }} />
            }
          >
            Nuevo usuario
          </CustomButton>

          <CustomButton
            loading={initialLoading}
            variant="outline"
            rightSection={
              <IconDownload
                size={20}
                stroke={1.5}
                style={{ paddingBottom: 4 }}
              />
            }
          >
            Importar usuarios
          </CustomButton>

          <CustomButton
            loading={initialLoading}
            variant="outline"
            rightSection={
              <IconUpload size={20} stroke={1.5} style={{ paddingBottom: 4 }} />
            }
          >
            Exportar usuarios
          </CustomButton>

          <CustomButton
            withProgress
            progressDuration={500}
            loading={initialLoading}
            variant="outline"
            color="green"
            rightSection={
              <IconReload size={20} stroke={1.5} style={{ paddingBottom: 4 }} />
            }
            onClick={handleReload}
          >
            Actualizar tabla
          </CustomButton>
        </Group>

        <Box style={{ flex: 1, position: "relative" }}>
          <UsersTable loading={initialLoading} reloading={reloading}/>
        </Box>
      </Stack>
    </MainLayout>
  );
};

export default Users;
