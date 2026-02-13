import { ActionIcon, Badge, Group, TextInput, Tooltip } from "@mantine/core";
import {
  IconClipboardCheck,
  IconSearch,
  IconX,
  IconEye,
  IconTrash,
  IconCopy,
} from "@tabler/icons-react";
import type { DataTableSortStatus } from "mantine-datatable";
import type { Dispatch, SetStateAction } from "react";
import type { User } from "../../store/usersStore";
import { getPaymentStatus } from "../../utils/helpers/getPaymentStatus";

export type PaymentStatus = "paid" | "pending" | "overdue";

const paymentBadgeColor: Record<PaymentStatus, string> = {
  paid: "green.5",
  pending: "yellow.5",
  overdue: "red.5",
};

const paymentLabel: Record<PaymentStatus, string> = {
  paid: "Abonado",
  pending: "Pendiente",
  overdue: "Vencido",
};

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

const classMeta: Record<string, { initials: string; label: string }> = {
  muay_thai: { initials: "MT", label: "Muay Thai" },
  sipalki_do: { initials: "SD", label: "Sipalki Do" },
  competidores: { initials: "CO", label: "Competidores" },
  kick_boxing: { initials: "KB", label: "Kick Boxing" },
  boxeo: { initials: "BX", label: "Boxeo" },
  boxeo_comp_thai: { initials: "BCT", label: "Boxeo Comp. Thai" },
  yoga: { initials: "YG", label: "Yoga" },
};

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
      width: "20%",
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
            color={copiedValue === record.name ? "green" : "gray.6"}
            onClick={() => {
              navigator.clipboard.writeText(record.name);
              setCopiedValue(record.name);
              setTimeout(() => setCopiedValue(null), 1500);
            }}
          >
            {copiedValue === record.name ? (
              <IconClipboardCheck size={20} />
            ) : (
              <IconCopy size={20} />
            )}
          </ActionIcon>
        </Group>
      ),
    },
    {
      accessor: "email",
      title: "Correo",
      sortable: true,
      width: "30%",
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
            color={copiedValue === record.email ? "green" : "gray.6"}
            onClick={() => {
              navigator.clipboard.writeText(record.email);
              setCopiedValue(record.email);
              setTimeout(() => setCopiedValue(null), 1500);
            }}
          >
            {copiedValue === record.email ? (
              <IconClipboardCheck size={20} />
            ) : (
              <IconCopy size={20} />
            )}
          </ActionIcon>
        </Group>
      ),
    },
    {
      accessor: "phone",
      title: "Celular",
      width: "10%",
      render: (record: User) => record.phone ?? "-",
    },
    {
      accessor: "birthday",
      title: "Nacimiento",
      sortable: true,
      width: "10%",
      render: (record: User) =>
        record.birthday?.toLocaleDateString("es-AR") ?? "-",
      sortAccessor: (record: User) => record.birthday?.getTime() ?? 0,
    },
    {
      accessor: "paymentStatus",
      title: "Pago",
      sortable: true,
      width: "10%",
      textAlignment: "center",
      render: (record: User) => {
        const status = getPaymentStatus(record);

        return (
          <Badge
            variant="filled"
            radius="sm"
            fullWidth
            size="sm"
            color={paymentBadgeColor[status]}
            style={{ paddingTop: 4 }}
          >
            {paymentLabel[status]}
          </Badge>
        );
      },
    },
    {
      accessor: "classes",
      title: "Clases",
      width: "14%",
      textAlignment: "center",
      render: (record: User) => {
        if (!record.classes?.length) return "-";

        return (
          <Group gap={4} justify="start" align="start">
            {record.classes.map((c, index) => {
              const meta = classMeta[c.classType];

              return (
                <Tooltip key={index} label={meta?.label ?? c.classType}>
                  <Badge
                    size="xs"
                    radius="sm"
                    variant="light"
                    style={{ paddingTop: 4 }}
                  >
                    {meta?.initials ?? "?"}
                  </Badge>
                </Tooltip>
              );
            })}
          </Group>
        );
      },
    },
    {
      accessor: "actions",
      title: "Acciones",
      width: "6%",
      textAlignment: "center",
      render: (record: User) => (
        <Group
          gap={8}
          wrap="nowrap"
          justify="center"
          style={{
            opacity: 0.9,
            transition: "opacity 150ms ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "0.9";
          }}
        >
          <IconEye
            size={20}
            stroke={1.5}
            style={{ cursor: "pointer" }}
            color="var(--mantine-color-gray-6)"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/user/${record.id}`);
            }}
          />
          <IconTrash
            size={20}
            stroke={1.5}
            style={{ cursor: "pointer" }}
            color="var(--mantine-color-gray-6)"
          />
        </Group>
      ),
    },
  ];
}
