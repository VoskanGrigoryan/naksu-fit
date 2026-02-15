import {
  Button,
  Group,
  MultiSelect,
  Stack,
  ColorInput,
  DEFAULT_THEME,
  TextInput,
} from "@mantine/core";
import { DateInput, TimePicker } from "@mantine/dates";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { CalendarEvent } from "../../types/calendar";
import { eventSchema } from "../../schemas/eventSchema";

type FormValues = z.infer<typeof eventSchema>;

const basicColors = [
  "dark",
  "gray",
  "red",
  "pink",
  "grape",
  "violet",
  "indigo",
  "blue",
  "cyan",
  "teal",
  "green",
  "lime",
  "yellow",
  "orange",
] as const;

const CrearClaseForm = ({
  onSubmit,
}: {
  onSubmit: (event: CalendarEvent) => void;
}) => {
  const { handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      activity: "",
      instructor: "",
      startTime: "",
      endTime: "",
      daysOfWeek: [],
      startDate: new Date(),
      endDate: null,
      color: DEFAULT_THEME.colors.blue[6],
    },
  });

  const submit = (values: FormValues) => {
    const event: CalendarEvent = {
      title: values.activity,
      daysOfWeek: values.daysOfWeek.map(Number),
      startTime: values.startTime + ":00",
      endTime: values.endTime + ":00",
      startRecur: values.startDate.toISOString().split("T")[0],
      endRecur: values.endDate
        ? values.endDate.toISOString().split("T")[0]
        : undefined,
      backgroundColor: values.color,
      borderColor: values.color,
      extendedProps: {
        instructor: values.instructor,
      },
    };

    onSubmit(event);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Stack>
        <Controller
          name="activity"
          control={control}
          render={({ field }) => (
            <TextInput
              label="Actividad"
              placeholder="Ej. Muay Thai, Boxeo, etc"
              value={field.value}
              onChange={(event) => field.onChange(event.currentTarget.value)}
              required
            />
          )}
        />

        <Controller
          name="instructor"
          control={control}
          render={({ field }) => (
            <TextInput
              label="Instructor"
              value={field.value}
              onChange={(event) => field.onChange(event.currentTarget.value)}
              required
            />
          )}
        />

        <Group grow>
          <Controller
            name="startTime"
            control={control}
            render={({ field }) => (
              <TimePicker
                label="Hora inicio"
                value={field.value}
                onChange={(value) => field.onChange(value ?? "")}
                format="24h"
                withSeconds={false}
              />
            )}
          />

          <Controller
            name="endTime"
            control={control}
            render={({ field }) => (
              <TimePicker
                label="Hora fin"
                value={field.value}
                onChange={(value) => field.onChange(value ?? "")}
                format="24h"
                withSeconds={false}
              />
            )}
          />
        </Group>

        <Controller
          name="daysOfWeek"
          control={control}
          render={({ field }) => (
            <MultiSelect
              label="Repetir los días"
              data={[
                { value: "1", label: "Lunes" },
                { value: "2", label: "Martes" },
                { value: "3", label: "Miércoles" },
                { value: "4", label: "Jueves" },
                { value: "5", label: "Viernes" },
                { value: "6", label: "Sábado" },
              ]}
              value={field.value}
              onChange={(value) => field.onChange(value ?? [])}
              required
            />
          )}
        />

        <Group grow>
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <DateInput
                clearable
                label="Desde"
                value={field.value}
                onChange={(value) =>
                  field.onChange(value ? new Date(value) : new Date())
                }
                required
              />
            )}
          />

          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <DateInput
                clearable
                label="Hasta"
                value={field.value}
                onChange={(value) =>
                  field.onChange(value ? new Date(value) : null)
                }
              />
            )}
          />
        </Group>

        <Controller
          name="color"
          control={control}
          render={({ field }) => (
            <ColorInput
              popoverProps={{
                position: "top",
                withArrow: true,
              }}
              label="Color de la clase"
              disallowInput
              withPicker={false}
              value={field.value}
              onChange={(value) => field.onChange(value)}
              swatches={basicColors.map(
                (color) => DEFAULT_THEME.colors[color][5],
              )}
            />
          )}
        />

        <Button type="submit">Crear clase</Button>
      </Stack>
    </form>
  );
};

export default CrearClaseForm;
