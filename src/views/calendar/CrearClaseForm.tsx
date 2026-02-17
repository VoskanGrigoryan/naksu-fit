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
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { CalendarEvent } from "../../types/calendar";
import { eventSchema } from "../../schemas/eventSchema";
import { basicColors, daysOfWeek } from "../../utils/constants/calendar";
import {
  mapEventToFormValues,
  mapFormToEvent,
} from "../../utils/mappers/calendarEvent.mapper";

type FormValues = z.output<typeof eventSchema>;

type Props = {
  onSubmit: (event: CalendarEvent) => void;
  initialValues?: CalendarEvent;
};

const defaultFormValues: FormValues = {
  activity: "",
  instructor: "",
  startTime: "",
  endTime: "",
  daysOfWeek: [],
  startDate: new Date(),
  endDate: null,
  color: DEFAULT_THEME.colors.blue[6],
};

const CrearClaseForm = ({ onSubmit, initialValues }: Props) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(eventSchema) as any,
    defaultValues: initialValues
      ? mapEventToFormValues(initialValues)
      : defaultFormValues,
  });

  useEffect(() => {
    if (initialValues) {
      reset(mapEventToFormValues(initialValues));
    }
  }, [initialValues, reset]);

  const submit: SubmitHandler<FormValues> = (values) => {
    if(initialValues)
    onSubmit(mapFormToEvent(values, initialValues.id));
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
              {...field}
              error={errors.activity?.message}
            />
          )}
        />

        <Controller
          name="instructor"
          control={control}
          render={({ field }) => (
            <TextInput
              label="Instructor"
              {...field}
              error={errors.instructor?.message}
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
                onChange={(v) => field.onChange(v ?? "")}
                format="24h"
                withSeconds={false}
                error={errors.startTime?.message}
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
                onChange={(v) => field.onChange(v ?? "")}
                format="24h"
                withSeconds={false}
                error={errors.endTime?.message}
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
              data={daysOfWeek}
              value={field.value}
              onChange={(v) => field.onChange(v ?? [])}
              error={errors.daysOfWeek?.message}
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
                onChange={(v) => field.onChange(v)}
                error={errors.startDate?.message}
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
                onChange={(v) => field.onChange(v)}
                error={errors.endDate?.message}
              />
            )}
          />
        </Group>

        <Controller
          name="color"
          control={control}
          render={({ field }) => (
            <ColorInput
              label="Color de la clase"
              disallowInput
              withPicker={false}
              value={field.value}
              onChange={field.onChange}
              swatches={basicColors.map(
                (color) => DEFAULT_THEME.colors[color][5],
              )}
              error={errors.color?.message}
            />
          )}
        />

        <Button type="submit">
          {initialValues ? "Guardar cambios" : "Crear clase"}
        </Button>
      </Stack>
    </form>
  );
};

export default CrearClaseForm;
