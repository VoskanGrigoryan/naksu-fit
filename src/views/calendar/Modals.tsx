import { Modal, Stack, Title } from "@mantine/core";
import CrearClaseForm from "./CrearClaseForm";
import CustomButton from "../../components/reusable/Button";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import type { EventApi } from "@fullcalendar/core";
import type { CalendarEvent } from "../../types/calendar";

type EditModalProps = {
  opened: boolean;
  onClose: () => void;
  event?: CalendarEvent;
  onSubmit: (updated: Partial<CalendarEvent>) => void;
};

export const EditModal = ({
  opened,
  onClose,
  event,
  onSubmit,
}: EditModalProps) => {
  if (!event) return null;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Modificar clase"
      centered
      withinPortal
    >
      <CrearClaseForm
        initialValues={event}
        onSubmit={(updated) => {
          onSubmit(updated);
          onClose();
        }}
      />
    </Modal>
  );
};

type ConfirmActionModalProps = {
  opened: boolean;
  onClose: () => void;
  event: EventApi | null;
  onEdit: () => void;
  onDelete: (id: string) => void;
};

export const ConfirmActionModal = ({
  opened,
  onClose,
  event,
  onEdit,
  onDelete,
}: ConfirmActionModalProps) => {
  const formattedTitle = event
    ? [event.title, event.extendedProps?.instructor]
        .filter(Boolean)
        .join(" - ")
    : "";

  return (
    <Modal
      size="sm"
      opened={opened}
      onClose={onClose}
      title={
        event ? (
          <Title order={3} fw={500}>
            {formattedTitle}
          </Title>
        ) : null
      }
      centered
    >
      <Stack justify="center">
        <CustomButton
          variant="outline"
          onClick={onEdit}
          rightSection={<IconEdit size={20} stroke={1.5} />}
        >
          Modificar
        </CustomButton>

        <CustomButton
          variant="outline"
          color="red.5"
          onClick={() => {
            if (event) {
              onDelete(event.id);
            }
            onClose();
          }}
          rightSection={<IconTrash size={20} stroke={1.5} />}
        >
          Eliminar
        </CustomButton>
      </Stack>
    </Modal>
  );
};
