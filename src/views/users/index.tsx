import { Group, Stack } from "@mantine/core";
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
  return (
    <MainLayout>
      <Stack align="flex-start" mb="md">
        {/* Acciones */}
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
          >
            Actualizar tabla
          </CustomButton>
        </Group>

        {/* Tabla de usuarios */}
        <UsersTable />
      </Stack>
    </MainLayout>
  );
};

export default Users;
