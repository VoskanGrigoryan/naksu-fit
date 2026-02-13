import { Group, Paper, Stack } from "@mantine/core";

const UserPlanForm = ({
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
