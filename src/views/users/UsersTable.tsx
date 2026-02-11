import { Box } from "@mantine/core";
import { DataTable, type DataTableSortStatus } from "mantine-datatable";
import sortBy from "lodash/sortBy";
import { useMemo, useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { useUsersStore } from "../../store/usersStore";

import { getUserColumns } from "./columns";

export default function UsersTable({
  loading,
  reloading,
}: {
  loading: boolean;
  reloading: boolean;
}) {
  const navigate = useNavigate();
  const { users } = useUsersStore();

  type User = typeof users[number];

  const [nameQuery, setNameQuery] = useState("");
  const [emailQuery, setEmailQuery] = useState("");
  const [debouncedNameQuery] = useDebouncedValue(nameQuery, 200);
  const [debouncedEmailQuery] = useDebouncedValue(emailQuery, 200);

  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<User>>({
    columnAccessor: "name",
    direction: "asc",
  });

  const filteredRecords = useMemo(() => {
    return users.filter((u) => {
      if (
        debouncedNameQuery &&
        !u.name.toLowerCase().includes(debouncedNameQuery.trim().toLowerCase())
      )
        return false;

      if (
        debouncedEmailQuery &&
        !u.email
          .toLowerCase()
          .includes(debouncedEmailQuery.trim().toLowerCase())
      )
        return false;

      return true;
    });
  }, [users, debouncedNameQuery, debouncedEmailQuery]);

  const records = useMemo(() => {
    if (!sortStatus.columnAccessor) return filteredRecords;
    const data = sortBy(
      filteredRecords,
      sortStatus.columnAccessor as keyof User
    ) as User[];
    return sortStatus.direction === "desc" ? data.reverse() : data;
  }, [filteredRecords, sortStatus]);

  const columns = getUserColumns({
    nameQuery,
    setNameQuery,
    emailQuery,
    setEmailQuery,
    copiedValue,
    setCopiedValue,
    navigate,
    sortStatus,
    setSortStatus,
  });

  return (
    <Box style={{ flex: 1, minHeight: 0 }}>
      <DataTable
        fetching={loading || reloading}
        withTableBorder
        withColumnBorders
        highlightOnHover
        loaderType="oval"
        loaderSize="lg"
        loaderColor="blue"
        loaderBackgroundBlur={4}
        records={records}
        columns={columns}
        sortStatus={sortStatus}
        onSortStatusChange={setSortStatus}
        noRecordsText="No se han encontrado usuarios"
        height="calc(100vh - 120px)"
        styles={{
          table: { backgroundColor: "var(--mantine-color-dark-7)" },
          header: { backgroundColor: "var(--mantine-color-dark-6)" },
        }}
      />
    </Box>
  );
}
