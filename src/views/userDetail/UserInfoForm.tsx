import { forwardRef, useImperativeHandle } from "react";
import { Controller, useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Group, Paper, Stack, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar, IconMail, IconPhone, IconUser } from "@tabler/icons-react";
import { userInfoSchema, type UserInfoFormValues } from "../../schemas/userInfoSchema";

type Props = {
  isEditing: boolean;
  disabledInputStyles: any;
  defaultValues: UserInfoFormValues;
  onSubmit: (values: UserInfoFormValues) => void;
};

const UserInfoForm = forwardRef<UseFormReturn<UserInfoFormValues>, Props>(
  ({ isEditing, disabledInputStyles, defaultValues, onSubmit }, ref) => {
    const form = useForm<UserInfoFormValues>({
      resolver: zodResolver(userInfoSchema),
      defaultValues,
    });

    useImperativeHandle(ref, () => form);

    return (
      <Paper shadow="lg" withBorder p="lg">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Stack>
            <Group>
              <Controller
                name="name"
                control={form.control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    disabled={!isEditing}
                    styles={disabledInputStyles}
                    style={{ minWidth: 250 }}
                    leftSection={<IconUser size={18} stroke={1.5} />}
                    size="sm"
                    label="Nombre"
                  />
                )}
              />

              <Controller
                name="email"
                control={form.control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    disabled={!isEditing}
                    styles={disabledInputStyles}
                    style={{ minWidth: 250 }}
                    leftSection={<IconMail size={18} stroke={1.5} />}
                    size="sm"
                    label="Email"
                  />
                )}
              />

              <Controller
                name="phone"
                control={form.control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    disabled={!isEditing}
                    styles={disabledInputStyles}
                    style={{ minWidth: 250 }}
                    leftSection={<IconPhone size={18} stroke={1.5} />}
                    size="sm"
                    label="Teléfono"
                  />
                )}
              />

              <Controller
                name="birthday"
                control={form.control}
                render={({ field }) => (
                  <DatePickerInput
                    {...field}
                    size="sm"
                    disabled={!isEditing}
                    styles={disabledInputStyles}
                    style={{ minWidth: 250 }}
                    valueFormat="DD/MM/YYYY"
                    leftSection={<IconCalendar size={18} stroke={1.5} />}
                    leftSectionPointerEvents="none"
                    label="Fecha de nacimiento"
                  />
                )}
              />
            </Group>
          </Stack>
        </form>
      </Paper>
    );
  }
);

export default UserInfoForm;
