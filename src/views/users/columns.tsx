import { ActionIcon, Badge, Group, TextInput } from "@mantine/core";
import {
  IconClipboard,
  IconClipboardCheck,
  IconSearch,
  IconX,
  IconEye,
  IconTrash,
} from "@tabler/icons-react";
import { mockUsers } from "../../mocks/userTableData";
import type { DataTableSortStatus } from "mantine-datatable";
import type { Dispatch, SetStateAction } from "react";
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

type User = (typeof mockUsers)[number];

interface ColumnsParams {
  nameQuery: string;
  setNameQuery: Dispatch<SetStateAction<string>>;
  emailQuery: string;
  setEmailQuery: Dispatch<SetStateAction<string>>;
  copiedValue: string | null;
  setCopiedValue: Dispatch<SetStateAction<string | null>>;
  navigate: (path: string) => void;
  sortStatus: DataTableSortStatus<User>;
  setSortStatus: Dispatch<SetStateAction<DataTableSortStatus<User>>>;
}

export function getUserColumns(params: ColumnsParams) {
  const {
    nameQuery,
    setNameQuery,
    emailQuery,
    setEmailQuery,
    copiedValue,
    setCopiedValue,
    navigate,
  } = params;

  return [
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
      render: (record: User) => (
        <Group justify="space-between">
          <span>{record.name}</span>
          <ActionIcon
            size="sm"
            variant="transparent"
            color={copiedValue === record.name ? "green" : undefined}
            onClick={() => {
              navigator.clipboard.writeText(record.name);
              setCopiedValue(record.name);
              setTimeout(() => setCopiedValue(null), 1500);
            }}
          >
            {copiedValue === record.name ? (
              <IconClipboardCheck size={20} />
            ) : (
              <IconClipboard size={20} />
            )}
          </ActionIcon>
        </Group>
      ),
    },
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
      render: (record: User) => (
        <Group justify="space-between">
          <span>{record.email}</span>
          <ActionIcon
            size="sm"
            variant="transparent"
            color={copiedValue === record.email ? "green" : undefined}
            onClick={() => {
              navigator.clipboard.writeText(record.email);
              setCopiedValue(record.email);
              setTimeout(() => setCopiedValue(null), 1500);
            }}
          >
            {copiedValue === record.email ? (
              <IconClipboardCheck size={20} />
            ) : (
              <IconClipboard size={20} />
            )}
          </ActionIcon>
        </Group>
      ),
    },
    { accessor: "phone", title: "Celular" },
    {
      accessor: "birthday",
      title: "Nacimiento",
      sortable: true,
      render: (record: User) =>
        record.birthday ? record.birthday.toLocaleDateString("es-AR") : "-",
      sortAccessor: (record: User) => record.birthday?.getTime() ?? 0,
    },
    {
      accessor: "paymentStatus",
      title: "Pago",
      sortable: true,
      width: "110px",
      textAlignment: "center" as const,
      render: (record: User) => (
        <Badge
          variant="light"
          radius="sm"
          fullWidth
          size="sm"
          color={paymentBadgeColor[record.paymentStatus as PaymentStatus]}
          style={{ paddingTop: 4 }}
        >
          {paymentLabel[record.paymentStatus as PaymentStatus]}
        </Badge>
      ),
    },
    {
      accessor: "active",
      title: "Estado",
      sortable: true,
      width: "90px",
      textAlignment: "center" as const,
      render: (record: User) => (record.active ? "Activo" : "Inactivo"),
    },
    {
      accessor: "actions",
      title: "Acciones",
      width: 90,
      textAlignment: "center" as const,
      render: (record: User) => (
        <Group gap={6} wrap="nowrap" justify="center">
          <IconEye
            size={20}
            stroke={1.5}
            color="var(--mantine-color-blue-6)"
            className={styles.icon}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/user/${record.id}`);
            }}
          />
          <IconTrash
            size={20}
            stroke={1.5}
            color="var(--mantine-color-red-5)"
            className={styles.icon}
          />
        </Group>
      ),
    },
  ];
}
