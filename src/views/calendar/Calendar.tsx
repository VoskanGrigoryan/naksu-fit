import {
  ActionIcon,
  Divider,
  Group,
  Paper,
  Stack,
  Title,
  Modal,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import CustomButton from "../../components/reusable/Button";
import {
  IconChevronLeft,
  IconChevronRight,
  IconEdit,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import { useCalendarStore } from "../../store/calendarStore";
import { useRef, useState } from "react";
import type { CalendarApi, EventApi } from "@fullcalendar/core";

const Calendar = () => {
  const calendarRef = useRef<FullCalendar | null>(null);
  const events = useCalendarStore((s) => s.events);
  const removeEvent = useCalendarStore((s) => s.removeEvent);

  const [selectedEvent, setSelectedEvent] = useState<EventApi | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  const getApi = (): CalendarApi | undefined => calendarRef.current?.getApi();

  console.log(events);
  return (
    <>
      <Group align="stretch" wrap="nowrap">
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
              rightSection={<IconPlus size={16} style={{ marginBottom: 4 }} />}
            >
              Crear template
            </CustomButton>
          </Stack>
        </Paper>

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
              <ActionIcon variant="light" onClick={() => getApi()?.prev()}>
                <IconChevronLeft size={18} />
              </ActionIcon>

              <CustomButton
                size="compact-md"
                variant="light"
                fw={500}
                onClick={() => getApi()?.today()}
              >
                Semana actual
              </CustomButton>

              <ActionIcon variant="light" onClick={() => getApi()?.next()}>
                <IconChevronRight size={18} />
              </ActionIcon>
            </Group>
          </Group>

          <FullCalendar
            ref={calendarRef}
            plugins={[timeGridPlugin, interactionPlugin]}
            locale={esLocale}
            initialView="timeGridWeek"
            headerToolbar={false}
            allDaySlot={false}
            slotMinTime="07:00:00"
            slotMaxTime="23:00:00"
            height="100%"
            editable
            selectable
            events={events}
            eventClick={(info) => {
              setSelectedEvent(info.event);
              open();
            }}
          />
        </Paper>
      </Group>

      <Modal
        size="sm"
        opened={opened}
        onClose={() => {
          setSelectedEvent(null);
          close();
        }}
        title={
          selectedEvent && (
            <Title order={3} fw={500}>
              {[selectedEvent.title, selectedEvent.extendedProps?.instructor]
                .filter(Boolean)
                .join(" - ")}
            </Title>
          )
        }
        centered
      >
        <Group justify="center" grow>
          <CustomButton
            rightSection={
              <IconEdit
                size={20}
                stroke={1.5}
                style={{ marginBottom: "4px" }}
              />
            }
          >
            Modificar
          </CustomButton>
          <CustomButton
            rightSection={
              <IconTrash
                size={20}
                stroke={1.5}
                style={{ marginBottom: "4px" }}
              />
            }
            color="red.5"
            onClick={() => {
              if (selectedEvent) {
                removeEvent(selectedEvent.id);
              }
              close();
            }}
          >
            Eliminar
          </CustomButton>
        </Group>
      </Modal>
    </>
  );
};

export default Calendar;
