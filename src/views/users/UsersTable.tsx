import { ActionIcon, Badge, Stack, TextInput } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { DataTable, type DataTableSortStatus } from "mantine-datatable";
import { IconPencil, IconSearch, IconX } from "@tabler/icons-react";
import sortBy from "lodash/sortBy";
import { useMemo, useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import { mockUsers } from "../../mocks/userTableData";

type PaymentStatus = "paid" | "pending" | "overdue";

const paymentBadgeColor: Record<PaymentStatus, string> = {
  paid: "green",
  pending: "yellow",
  overdue: "red",
};

const paymentLabel: Record<PaymentStatus, string> = {
  paid: "Pagado",
  pending: "Pendiente",
  overdue: "Vencido",
};

export default function UsersTable() {
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
    { accessor: "birthday", title: "Fecha nacimiento", sortable: true },
    {
      accessor: "active",
      title: "Estado",
      sortable: true,
      render: (record: User) => (record.active ? "Activo" : "Inactivo"),
    },
    {
      accessor: "paymentStatus",
      title: "Pago",
      sortable: true,
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
      title: "",
      textAlignment: "right",
      render: () => <IconPencil size={20} />,
    },
  ];

  return (
    <Stack align="flex-start">
      <DataTable
        withTableBorder
        highlightOnHover
        records={records}
        columns={columns}
        sortStatus={sortStatus}
        onSortStatusChange={setSortStatus}
        height="90vh"
        onRowClick={(row) =>
          showNotification({
            title: `Clic en ${row.record.name}`,
            message: `${row.record.name} — ${row.record.email}`,
            withBorder: true,
          })
        }
        style={{ width: "91vw", borderRadius: "var(--mantine-radius-sm)" }}
      />
    </Stack>
  );
}
