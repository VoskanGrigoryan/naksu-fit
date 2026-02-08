import { ActionIcon, Badge, Group, Stack, TextInput } from "@mantine/core";
import { DataTable, type DataTableSortStatus } from "mantine-datatable";
import { IconEye, IconSearch, IconTrash, IconX } from "@tabler/icons-react";
import sortBy from "lodash/sortBy";
import { useMemo, useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import { mockUsers } from "../../mocks/userTableData";
import { useNavigate } from "react-router-dom";
import styles from "./Users.module.css";

type PaymentStatus = "paid" | "pending" | "overdue";

const paymentBadgeColor: Record<PaymentStatus, string> = {
  paid: "green",
  pending: "yellow",
  overdue: "red",
};

const paymentLabel: Record<PaymentStatus, string> = {
  paid: "Abonado",
  pending: "Pendiente",
  overdue: "Vencido",
};

export default function UsersTable() {
  const navigate = useNavigate();

  type User = (typeof mockUsers)[number];

  const [nameQuery, setNameQuery] = useState("");
  const [emailQuery, setEmailQuery] = useState("");
  const [debouncedNameQuery] = useDebouncedValue(nameQuery, 200);
  const [debouncedEmailQuery] = useDebouncedValue(emailQuery, 200);

  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<User>>({
    columnAccessor: "name",
    direction: "asc",
  });

  const filteredRecords = useMemo(() => {
    return mockUsers.filter((u) => {
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
  }, [debouncedNameQuery, debouncedEmailQuery]);

  const records = useMemo(() => {
    if (!sortStatus.columnAccessor) return filteredRecords;
    const data = sortBy(
      filteredRecords,
      sortStatus.columnAccessor as keyof User,
    ) as User[];
    return sortStatus.direction === "desc" ? data.reverse() : data;
  }, [filteredRecords, sortStatus]);

  const columns = [
    {
      accessor: "name",
      title: "Nombre",
      sortable: true,
      filter: (
        <TextInput
          placeholder="Buscar nombre…"
          leftSection={<IconSearch size={16} />}
          rightSection={
            <ActionIcon
              size="sm"
              variant="transparent"
              onClick={() => setNameQuery("")}
            >
              <IconX size={14} />
            </ActionIcon>
          }
          value={nameQuery}
          onChange={(e) => setNameQuery(e.currentTarget.value)}
        />
      ),
      filtering: nameQuery !== "",
    },
    { accessor: "phone", title: "Celular" },
    {
      accessor: "email",
      title: "Correo",
      sortable: true,
      filter: (
        <TextInput
          placeholder="Buscar correo…"
          leftSection={<IconSearch size={16} />}
          rightSection={
            <ActionIcon
              size="sm"
              variant="transparent"
              onClick={() => setEmailQuery("")}
            >
              <IconX size={14} />
            </ActionIcon>
          }
          value={emailQuery}
          onChange={(e) => setEmailQuery(e.currentTarget.value)}
        />
      ),
      filtering: emailQuery !== "",
    },
    { accessor: "birthday", title: "Nacimiento", sortable: true },
    {
      accessor: "active",
      title: "Estado",
      sortable: true,
      width: "80px", // enough for "Activo"/"Inactivo"
      textAlignment: "center" as const,
      cellsStyle: () => ({
        textAlign: "center" as const,
        paddingLeft: 8,
        paddingRight: 8,
      }),
      render: (record: User) => (record.active ? "Activo" : "Inactivo"),
    },
    {
      accessor: "paymentStatus",
      title: "Pago",
      sortable: true,
      width: "110px", // enough for the badge
      textAlignment: "center" as const,
      cellsStyle: () => ({
        textAlign: "center" as const,
        paddingLeft: 8,
        paddingRight: 8,
      }),
      render: (record: User) => (
        <Badge
          style={{ paddingTop: 4 }}
          variant="light"
          radius="sm"
          size="sm"
          color={paymentBadgeColor[record.paymentStatus as PaymentStatus]}
        >
          {paymentLabel[record.paymentStatus as PaymentStatus]}
        </Badge>
      ),
    },
    {
      accessor: "actions",
      title: "Acciones",
      width: 90, // px, not %
      textAlignment: "center" as const,
      cellsStyle: () => ({
        textAlign: "center" as const,
        paddingLeft: 8,
        paddingRight: 8,
      }),
      render: (record: User) => (
        <Group gap={6} wrap="nowrap" justify="center">
          <IconEye
            size={20}
            color="var(--mantine-color-blue-6)"
            className={styles.icon}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/user/${record.id}`);
            }}
          />
          <IconTrash
            size={20}
            color="var(--mantine-color-red-6)"
            className={styles.icon}
          />
        </Group>
      ),
    },
  ];

  return (
    <Stack align="flex-start">
      <DataTable
        withTableBorder
        withColumnBorders
        highlightOnHover
        records={records}
        columns={columns}
        sortStatus={sortStatus}
        onSortStatusChange={setSortStatus}
        height="90vh"
        style={{
          width: "92vw",
          borderRadius: "var(--mantine-radius-sm)",
          tableLayout: "fixed",
        }}
      />
    </Stack>
  );
}
