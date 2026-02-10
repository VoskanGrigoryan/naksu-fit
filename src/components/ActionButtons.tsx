import { Group, Title } from "@mantine/core";
import CustomButton from "./reusable/Button";

/* -------------------- types -------------------- */

export type Section = "userInfo" | "userPlan";

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
      onSave?.();
      setEditingSection(null);
    } else {
      setEditingSection(section);
    }
  };

  return (
    <Group justify="space-between">
      <Title order={2}>{title}</Title>

      <Group style={{ marginBottom: 12 }}>
        <CustomButton
          disabled={isOtherEditing}
          color={!isEditing ? "blue" : "green"}
          onClick={handlePrimaryAction}
        >
          {!isEditing ? "Editar" : "Guardar"}
        </CustomButton>

        {isEditing && (
          <CustomButton
            variant="outline"
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
