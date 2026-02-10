import { Group, Stack, Box, LoadingOverlay } from "@mantine/core";
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
      <Stack align="flex-start" mb="md">
        <Group>
          <CustomButton
            rightSection={
              <IconPlus size={20} stroke={1.5} style={{ paddingBottom: 4 }} />
            }
          >
            Nuevo usuario
          </CustomButton>
          <CustomButton
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
            variant="outline"
            style={{ paddingTop: 4 }}
            rightSection={
              <IconUpload size={20} stroke={1.5} style={{ paddingBottom: 4 }} />
            }
          >
            Exportar usuarios
          </CustomButton>
          <CustomButton
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

        <Box pos="relative">
          <LoadingOverlay visible={reloading} />
          <UsersTable loading={initialLoading} />
        </Box>
      </Stack>
    </MainLayout>
  );
};

export default Users;
