import { Group, Select } from "@mantine/core";
import CustomButton from "../../components/reusable/Button";
import { IconFilter, IconFilterOff, IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import type { CalendarEvent } from "../../types/calendar";

const HeaderControls = ({
  open,
  filters,
  onFilter,
  events,
}: {
  open: () => void;
  filters: { instructor: string; activity: string };
  onFilter: (filters: { instructor: string; activity: string }) => void;
  events: CalendarEvent[];
}) => {
  const [instructor, setInstructor] = useState(filters.instructor);
  const [activity, setActivity] = useState(filters.activity);

  const isDefault = instructor === "Todos" && activity === "Todas";

  const instructorOptions: string[] = [
    "Todos",
    ...Array.from(
      new Set(
        events
          .map((e) => e.extendedProps?.instructor)
          .filter((i): i is string => Boolean(i)),
      ),
    ),
  ];

  const activityOptions: string[] = [
    "Todas",
    ...Array.from(
      new Set(
        events.map((e) => e.title).filter((t): t is string => Boolean(t)),
      ),
    ),
  ];

  return (
    <Group justify="space-between" wrap="nowrap">
      <Group>
        <Select
          placeholder="Instructor"
          data={instructorOptions}
          w={200}
          value={instructor}
          onChange={(v) => setInstructor(v!)}
        />

        <Select
          placeholder="Actividad"
          data={activityOptions}
          w={200}
          value={activity}
          onChange={(v) => setActivity(v!)}
        />

        <CustomButton
          disabled={isDefault}
          rightSection={<IconFilter size={16} style={{ marginBottom: 4 }} />}
          onClick={() => onFilter({ instructor, activity })}
        >
          Filtrar
        </CustomButton>

        {!isDefault && (
          <CustomButton
            rightSection={
              <IconFilterOff size={16} style={{ marginBottom: 4 }} />
            }
            variant="outline"
            onClick={() => {
              setInstructor("Todos");
              setActivity("Todas");
              onFilter({ instructor: "Todos", activity: "Todas" });
            }}
          >
            Limpiar filtro
          </CustomButton>
        )}
      </Group>

      <CustomButton
        onClick={open}
        rightSection={<IconPlus size={16} style={{ marginBottom: 4 }} />}
      >
        Agregar clase
      </CustomButton>
    </Group>
  );
};

export default HeaderControls;
