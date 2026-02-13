import {
  IconDownload,
  IconPlus,
  IconReload,
  IconUpload,
} from "@tabler/icons-react";
import CustomButton from "../../components/reusable/Button";
import { Group } from "@mantine/core";

const MenuOptions = ({
  initialLoading,
  handleReload,
}: {
  initialLoading: boolean;
  handleReload: () => void;
}) => {
  return (
    <Group style={{ marginBottom: 8 }}>
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
          <IconDownload size={20} stroke={1.5} style={{ paddingBottom: 4 }} />
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
  );
};

export default MenuOptions;
