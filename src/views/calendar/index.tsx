import {
  ActionIcon,
  Divider,
  Group,
  Paper,
  SegmentedControl,
  Select,
  Stack,
  Text,
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

const CalendarView = () => {
  return (
    <MainLayout>
      <Stack h="100%" style={{ flex: 1 }}>
        {/* Top Bar */}
        <Paper shadow="lg" p="md" withBorder radius="md">
          <Group justify="space-between" wrap="nowrap">
            <SegmentedControl
              withItemsBorders
              size="md"
              data={["Dia", "Semana", "Mes"]}
              color="blue.6"
              defaultValue="Semana"
            />

            <Group gap="xs">
              <ActionIcon variant="subtle">
                <IconChevronLeft size={18} />
              </ActionIcon>

              <Text fw={500}>Semana actual</Text>

              <ActionIcon variant="subtle">
                <IconChevronRight size={18} />
              </ActionIcon>
            </Group>

            <Group wrap="nowrap">
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

              <CustomButton rightSection={<IconPlus size={16} />}>
                Agregar clase
              </CustomButton>
            </Group>
          </Group>
        </Paper>

        {/* Main Content */}
        <Group wrap="nowrap" align="stretch" style={{ flex: 1 }}>
          {/* Sidebar */}
          <Paper w={300} h="100%" shadow="lg" p="md" withBorder radius="md">
            <Stack h="100%" justify="space-between">
              <div>
                <Title order={4} fw={500}>
                  Templates de clases
                </Title>

                <Divider my="xs" />

                <Paper
                  p="sm"
                  c="white"
                  style={{
                    backgroundColor: "var(--mantine-color-green-4)",
                  }}
                >
                  Yoga
                </Paper>
              </div>

              <CustomButton rightSection={<IconPlus size={16} />}>
                Crear template
              </CustomButton>
            </Stack>
          </Paper>

          {/* Calendar */}
          <Paper
            style={{ flex: 1 }}
            h="100%"
            shadow="lg"
            p="md"
            withBorder
            radius="md"
          >
            <FullCalendar
              plugins={[timeGridPlugin, interactionPlugin]}
              initialView="timeGridWeek"
              headerToolbar={false}
              editable={true}
              selectable={true}
              allDaySlot={false}
              locale={esLocale}
              slotMinTime="06:00:00"
              slotMaxTime="23:00:00"
              height="100%"
              events={[
                {
                  title: "Yoga",
                  daysOfWeek: [1, 4], // Monday & Thursday
                  startTime: "09:00",
                  endTime: "10:00",
                },
              ]}
            />
          </Paper>
        </Group>
      </Stack>
    </MainLayout>
  );
};

export default CalendarView;
