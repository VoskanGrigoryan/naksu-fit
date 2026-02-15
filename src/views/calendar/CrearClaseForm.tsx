import { Button, Group, MultiSelect, Select, Stack } from "@mantine/core";
import { DateInput, TimePicker } from "@mantine/dates";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { CalendarEvent } from ".";

const schema = z.object({
  activity: z.string().min(1),
  instructor: z.string().min(1),
  startTime: z.string().min(1),
  endTime: z.string().min(1),
  daysOfWeek: z.array(z.string()).min(1),
  startDate: z.date(),
  endDate: z.date().nullable().optional(),
});

type FormValues = z.infer<typeof schema>;

const CrearClaseForm = ({
  onSubmit,
}: {
  onSubmit: (event: CalendarEvent) => void;
}) => {
  const { handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      activity: "",
      instructor: "",
      startTime: "",
      endTime: "",
      daysOfWeek: [],
      startDate: new Date(),
      endDate: null,
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
            <Select
              label="Actividad"
              data={["Muay Thai", "Boxeo", "Yoga"]}
              value={field.value}
              onChange={(value) => field.onChange(value ?? "")}
              required
            />
          )}
        />

        <Controller
          name="instructor"
          control={control}
          render={({ field }) => (
            <Select
              label="Instructor"
              data={["Juanchi", "Enzo", "Yanina"]}
              value={field.value}
              onChange={(value) => field.onChange(value ?? "")}
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
                label="Hasta"
                value={field.value}
                onChange={(value) =>
                  field.onChange(value ? new Date(value) : null)
                }
              />
            )}
          />
        </Group>

        <Button type="submit">Crear clase</Button>
      </Stack>
    </form>
  );
};

export default CrearClaseForm;
