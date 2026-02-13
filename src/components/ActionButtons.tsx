import { Group, Title } from "@mantine/core";
import CustomButton from "./reusable/Button";
import { IconCancel, IconCheck, IconEdit } from "@tabler/icons-react";

/* -------------------- types -------------------- */

export type Section = "userInfo" | "userPlan" | "additionalInfo";

type SectionActionsProps = {
  title: string;
  section: Section;
  editingSection: Section | null;
  setEditingSection: (section: Section | null) => void;
  onSave?: () => void; 
};

const SectionActions = ({
  title,
  section,
  editingSection,
  setEditingSection,
  onSave,
}: SectionActionsProps) => {
  const isEditing = editingSection === section;
  const isOtherEditing = editingSection !== null && editingSection !== section;

  const handlePrimaryAction = () => {
    if (isEditing) {
      onSave?.(); // triggers form submit
      setEditingSection(null);
    } else {
      setEditingSection(section);
    }
  };

  return (
    <Group justify="space-between">
      <Title order={2} fw={500}>{title}</Title>

      <Group style={{ marginBottom: 12 }}>
        <CustomButton
          rightSection={
            !isEditing ? (
              <IconEdit size={20} stroke={1.5} style={{ paddingBottom: 4 }} />
            ) : (
              <IconCheck size={20} stroke={1.5} style={{ paddingBottom: 4 }} />
            )
          }
          disabled={isOtherEditing}
          color={!isEditing ? "blue" : "green"}
          onClick={handlePrimaryAction}
        >
          {!isEditing ? "Editar" : "Guardar"}
        </CustomButton>

        {isEditing && (
          <CustomButton
            color="var(--mantine-color-red-6)"
            rightSection={<IconCancel size={20} stroke={1.5} style={{ paddingBottom: 4 }} />}
            variant="filled"
            onClick={() => setEditingSection(null)}
          >
            Cancelar
          </CustomButton>
        )}
      </Group>
    </Group>
  );
};

export default SectionActions;
