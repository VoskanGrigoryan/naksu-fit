import { Group, NumberInput, Paper, Stack, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";

const UserPlanForm = ({
  isEditingUserPlan,
  disabledInputStyles,
  user,
}: {
  isEditingUserPlan: boolean;
  disabledInputStyles: any;
  user: any;
}) => {
  return (
    <Paper shadow="lg" withBorder p="lg">
      <Stack>
        <Group>{user.email}</Group>
      </Stack>
    </Paper>
  );
};

export default UserPlanForm;
