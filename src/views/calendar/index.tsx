import {
  ActionIcon,
  Divider,
  Group,
  Modal,
  Paper,
  Select,
  Stack,
  Title,
} from "@mantine/core";
import MainLayout from "../../layouts/main/MainLayout";
import CustomButton from "../../components/reusable/Button";
import {
  IconChevronLeft,
  IconChevronRight,
  IconPlus,
} from "@tabler/icons-react";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import { useDisclosure } from "@mantine/hooks";
import CrearClaseForm from "./CrearClaseForm";
import { useState } from "react";

export type CalendarEvent = {
  title: string;
  daysOfWeek: number[];
  startTime: string;
  endTime: string;
  startRecur: string;
  endRecur?: string;
};

const CalendarView = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  return (
    <MainLayout>
      <Stack
        gap="md"
        style={{
          height: "100%",
        }}
      >
        {/* Top Controls */}
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
                data={[
                  "Muay Thai",
                  "Competidores",
                  "Boxeo",
                  "Yoga",
                  "Kick Boxing",
                ]}
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

        {/* Main Content */}
        <Group align="stretch" wrap="nowrap">
          {/* Sidebar */}
          <Paper w={300} shadow="lg" p="md" withBorder radius="md">
            <Stack justify="space-between" style={{ flex: 1 }}>
              <div>
                <Title order={4}>Templates de clases</Title>
                <Divider my="sm" />

                <Paper
                  p="sm"
                  c="white"
                  radius="md"
                  style={{
                    backgroundColor: "var(--mantine-color-green-4)",
                  }}
                >
                  Yoga
                </Paper>
              </div>

              <CustomButton
                rightSection={
                  <IconPlus size={16} style={{ marginBottom: 4 }} />
                }
              >
                Crear template
              </CustomButton>
            </Stack>
          </Paper>

          {/* Calendar Section */}
          <Paper
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              height: "calc(90vh - 50px)",
            }}
            shadow="lg"
            p="md"
            withBorder
            radius="md"
          >
            <Group justify="space-between" mb="md">
              <Title order={3}>Calendario semanal</Title>

              <Group>
                <ActionIcon variant="light">
                  <IconChevronLeft size={18} />
                </ActionIcon>
                <ActionIcon variant="light">
                  <IconChevronRight size={18} />
                </ActionIcon>
              </Group>
            </Group>

            <FullCalendar
              plugins={[timeGridPlugin, interactionPlugin]}
              locale={esLocale}
              initialView="timeGridWeek"
              headerToolbar={false}
              allDaySlot={false}
              slotMinTime="07:00:00"
              slotMaxTime="22:00:00"
              height="100%"
              editable={true}
              selectable={true}
              eventDrop={(info) => {
                console.log("New start:", info.event.start);
              }}
              eventResize={(info) => {
                console.log("New end:", info.event.end);
              }}
              events={events}
            />
          </Paper>
        </Group>
      </Stack>

      <Modal opened={opened} onClose={close} title="Agregar clase" centered>
        <CrearClaseForm
          onSubmit={(event) => {
            setEvents((prev) => [...prev, event]);
            close();
          }}
        />
      </Modal>
    </MainLayout>
  );
};

export default CalendarView;
