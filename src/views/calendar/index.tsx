import { Modal, Stack } from "@mantine/core";
import MainLayout from "../../layouts/main/MainLayout";
import { useDisclosure } from "@mantine/hooks";
import CrearClaseForm from "./CrearClaseForm";
import HeaderControls from "./Header";
import Calendar from "./Calendar";
import type { CalendarEvent } from "../../types/calendar";
import { useCalendarStore } from "../../store/calendarStore";

const CalendarView = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const addEvent = useCalendarStore((s) => s.addEvent);

  const handleSubmit = (event: CalendarEvent) => {
    addEvent(event);
  };

  return (
    <MainLayout>
      <Stack gap="md" style={{ height: "100%" }}>
        <HeaderControls open={open} />
        <Calendar />
      </Stack>

      <Modal opened={opened} onClose={close} title="Agregar clase" centered>
        <CrearClaseForm
          onSubmit={(event) => {
            handleSubmit(event);
            close();
          }}
        />
      </Modal>
    </MainLayout>
  );
};

export default CalendarView;
