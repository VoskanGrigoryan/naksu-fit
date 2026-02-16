import { Modal, Stack } from "@mantine/core";
import MainLayout from "../../layouts/main/MainLayout";
import { useDisclosure } from "@mantine/hooks";
import CrearClaseForm from "./CrearClaseForm";
import HeaderControls from "./Header";
import type { CalendarEvent } from "../../types/calendar";
import { useCalendarStore } from "../../store/calendarStore";
import { useState } from "react";
import Calendar from "./Calendar";
const CalendarView = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const addEvent = useCalendarStore((s) => s.addEvent);
  const events = useCalendarStore((s) => s.events);

  const [filters, setFilters] = useState({
    instructor: "Todos",
    activity: "Todas",
  });

  const handleSubmit = (event: CalendarEvent) => {
    addEvent(event);
  };

  const handleFilter = (newFilters: {
    instructor: string;
    activity: string;
  }) => {
    setFilters(newFilters);
  };

  const filteredEvents = events.filter((e) => {
    const matchesInstructor =
      filters.instructor === "Todos" ||
      e.extendedProps?.instructor === filters.instructor;
    const matchesActivity =
      filters.activity === "Todas" || e.title === filters.activity;
    return matchesInstructor && matchesActivity;
  });

  return (
    <MainLayout>
      <Stack gap="md" style={{ height: "100%" }}>
        <HeaderControls
          open={open}
          onFilter={handleFilter}
          filters={filters}
          events={events}
        />
        <Calendar events={filteredEvents} />
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
