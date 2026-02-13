import { forwardRef, useImperativeHandle, useEffect, useState } from "react";
import {
  useForm,
  useFieldArray,
  Controller,
  type UseFormReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Group,
  NumberInput,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import {
  userPlanSchema,
  type UserPlanFormValues,
} from "../../schemas/userPlanSchema";
import { IconCirclePlusFilled, IconTrash } from "@tabler/icons-react";

type Props = {
  isEditing: boolean;
  disabledInputStyles: any;
  defaultValues: UserPlanFormValues;
  onSubmit: (values: UserPlanFormValues) => void;
};

export const allClassesAvailable = [
  { value: "muay_thai", label: "Muay Thai" },
  { value: "sipalki_do", label: "Sipalki Do" },
  { value: "competidores", label: "Competidores" },
  { value: "kick_boxing", label: "Kick Boxing" },
  { value: "boxeo", label: "Boxeo" },
  { value: "boxeo_comp_thai", label: "Boxeo Comp. Thai" },
  { value: "yoga", label: "Yoga" },
];

const UserPlanForm = forwardRef<UseFormReturn<UserPlanFormValues>, Props>(
  ({ isEditing, disabledInputStyles, defaultValues, onSubmit }, ref) => {
    const form = useForm<UserPlanFormValues>({
      resolver: zodResolver(userPlanSchema),
      defaultValues,
    });

    const { fields, append, remove } = useFieldArray({
      control: form.control,
      name: "classes",
    });

    const [selectedClass, setSelectedClass] = useState<string | null>(null);

    useImperativeHandle(ref, () => form);

    useEffect(() => {
      form.reset(defaultValues);
    }, [defaultValues]);

    const selectedClassTypes =
      form.watch("classes")?.map((c) => c.classType) ?? [];

    const availableOptions = allClassesAvailable.filter(
      (option) => !selectedClassTypes.includes(option.value as any),
    );

    return (
      <Paper
        shadow={isEditing ? "xl" : "sm"}
        withBorder
        p="lg"
        style={{ transition: "box-shadow 150ms ease" }}
      >
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Group align="flex-start" justify="space-between">
            <SimpleGrid
              cols={fields.length > 4 ? 2 : 1}
              spacing="sm"
              style={{ minWidth: 300 }}
            >
              {fields.map((field, index) => (
                <Group
                  key={field.id}
                  style={{
                    backgroundColor: "var(--mantine-color-gray-1)",
                    padding: "4px",
                    borderRadius: 4,
                  }}
                >
                  <Text
                    size="md"
                    style={{
                      minWidth: 250,
                      paddingTop: 4,
                      paddingLeft: 8,
                    }}
                  >
                    {
                      allClassesAvailable.find(
                        (c) =>
                          c.value === form.watch(`classes.${index}.classType`),
                      )?.label
                    }
                  </Text>

                  <Controller
                    control={form.control}
                    name={`classes.${index}.totalClasses`}
                    render={({ field }) => (
                      <NumberInput
                        disabled={!isEditing}
                        style={{ width: "70px" }}
                        styles={disabledInputStyles}
                        allowNegative={false}
                        size="xs"
                        value={field.value}
                        onChange={(value) => field.onChange(value ?? 0)}
                      />
                    )}
                  />

                  <UnstyledButton
                    disabled={!isEditing}
                    onClick={() => remove(index)}
                  >
                    <IconTrash
                      size={20}
                      stroke={1.5}
                      style={{
                        marginTop: 8,
                        marginRight: 8,
                        color: "var(--mantine-color-gray-6)",
                      }}
                    />
                  </UnstyledButton>
                </Group>
              ))}
            </SimpleGrid>

            <Stack>
              <Group>
                <Select
                  size="md"
                  placeholder="Seleccionar clase"
                  data={availableOptions}
                  value={selectedClass}
                  onChange={setSelectedClass}
                  disabled={!isEditing}
                />

                <UnstyledButton
                  disabled={!isEditing || !selectedClass}
                  onClick={() => {
                    if (!selectedClass) return;

                    append({
                      classType: selectedClass as any,
                      totalClasses: 1,
                      amountPaid: 0,
                      pricePerClass: 0,
                    });

                    setSelectedClass(null);
                  }}
                >
                  <IconCirclePlusFilled
                    size={40}
                    style={{ paddingTop: 4 }}
                    color={
                      !isEditing
                        ? "var(--mantine-color-gray-4)"
                        : "var(--mantine-color-green-6)"
                    }
                  />
                </UnstyledButton>
              </Group>
            </Stack>
          </Group>
        </form>
      </Paper>
    );
  },
);

export default UserPlanForm;
