import { Group, NumberInput, Paper, Stack, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar, IconMail, IconPhone, IconUser } from "@tabler/icons-react";

const UserInfoForm = ({
  isEditingUserInfo,
  disabledInputStyles,
  user,
}: {
  isEditingUserInfo: boolean;
  disabledInputStyles: any;
  user: any;
}) => {
  return (
    <Paper shadow="lg" withBorder p="lg">
      <Stack>
        <Group>
          <TextInput
            disabled={!isEditingUserInfo}
            styles={disabledInputStyles}
            style={{ minWidth: 250 }}
            leftSection={<IconUser size={18} stroke={1.5} />}
            size="sm"
            label="Nombre"
            value={user.name}
          />

          <TextInput
            disabled={!isEditingUserInfo}
            styles={disabledInputStyles}
            style={{ minWidth: 250 }}
            leftSection={<IconMail size={18} stroke={1.5} />}
            size="sm"
            label="Email"
            value={user.email}
          />

          <NumberInput
            disabled={!isEditingUserInfo}
            styles={disabledInputStyles}
            style={{ minWidth: 250 }}
            leftSection={<IconPhone size={18} stroke={1.5} />}
            size="sm"
            label="Teléfono"
            value={user.phone}
          />

          <DatePickerInput
            size="sm"
            disabled={!isEditingUserInfo}
            styles={disabledInputStyles}
            style={{ minWidth: 250 }}
            valueFormat="DD/MM/YYYY"
            leftSection={<IconCalendar size={18} stroke={1.5} />}
            leftSectionPointerEvents="none"
            label="Fecha de nacimiento"
            value={user.birthday}
          />
        </Group>
      </Stack>
    </Paper>
  );
};

export default UserInfoForm;
