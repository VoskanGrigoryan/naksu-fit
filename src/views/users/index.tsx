import { Stack, Box } from "@mantine/core";
import { useEffect, useState } from "react";
import MainLayout from "../../layouts/main/MainLayout";
import UsersTable from "./UsersTable";

import { useUsersStore } from "../../store/usersStore";
import { mockUsers } from "../../mocks/userTableData";
import TableOptions from "./TableOptions";

const Users = () => {
  const { users, setUsers } = useUsersStore();

  const [initialLoading, setInitialLoading] = useState(true);
  const [reloading, setReloading] = useState(false);

  // Load mock data once
  useEffect(() => {
    if (users.length === 0) {
      setUsers(mockUsers);
    }

    const t = setTimeout(() => setInitialLoading(false), 800);
    return () => clearTimeout(t);
  }, [users.length, setUsers]);

  const handleReload = () => {
    setReloading(true);

    setTimeout(() => {
      setUsers([...users]);
      setReloading(false);
    }, 800);
  };

  return (
    <MainLayout>
      <Stack style={{ flex: 1 }} gap="sm">
        <TableOptions
          initialLoading={initialLoading}
          handleReload={handleReload}
        />
        <Box style={{ flex: 1, position: "relative" }}>
          <UsersTable loading={initialLoading} reloading={reloading} />
        </Box>
      </Stack>
    </MainLayout>
  );
};

export default Users;
