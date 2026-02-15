import { Group, Paper, Select } from "@mantine/core";
import CustomButton from "../../components/reusable/Button";
import { IconPlus } from "@tabler/icons-react";

const HeaderControls = ({ open }: { open: (arg: any) => void }) => {
  return (
    <Paper shadow="lg" p="sm" withBorder radius="md">
      <Group justify="space-between" wrap="nowrap">
        <Group>
          <Select
            placeholder="Instructor"
            data={["Juanchi", "Enzo", "Yanina"]}
            w={160}
          />

          <Select
            placeholder="Actividad"
            data={["Muay Thai", "Competidores", "Boxeo", "Yoga", "Kick Boxing"]}
            w={160}
          />
        </Group>

        <CustomButton
          onClick={open}
          rightSection={<IconPlus size={16} style={{ marginBottom: 4 }} />}
        >
          Agregar clase
        </CustomButton>
      </Group>
    </Paper>
  );
};

export default HeaderControls;
