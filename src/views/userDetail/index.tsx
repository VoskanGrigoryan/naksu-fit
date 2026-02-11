import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Paper, SimpleGrid } from "@mantine/core";

import MainLayout from "../../layouts/main/MainLayout";
import { mockUsers } from "../../mocks/userTableData";

import UserInfoForm from "./UserInfoForm";
import SectionActions, { type Section } from "../../components/ActionButtons";
import CustomButton from "../../components/reusable/Button";
import { IconArrowLeft } from "@tabler/icons-react";
import type { UseFormReturn } from "react-hook-form";
import type { UserInfoFormValues } from "../../schemas/userInfoSchema";
import { useUsersStore } from "../../store/usersStore";

type EditingSection = Section | null;

const UserDetail = () => {
  const { users, updateUser, setUsers } = useUsersStore();
  const { id } = useParams();

  const userInfoFormRef = useRef<UseFormReturn<UserInfoFormValues>>(null);

  const [editingSection, setEditingSection] = useState<EditingSection>(null);
  const isEditingUserInfo = editingSection === "userInfo";

  const disabledInputStyles = {
    input: {
      opacity: 0.9,
      WebkitTextFillColor: "var(--mantine-color-gray-5)",
    },
  };

  useEffect(() => {
    if (users.length === 0) setUsers(mockUsers);
  }, []);

  const user = users.find((u) => u.id === id);
  if (!user) return <div>User not found</div>;

  // Wrapper function with no arguments for SectionActions
  const handleUserInfoSave = () => {
    userInfoFormRef.current?.handleSubmit((values) => {
      updateUser(id!, values);
    })();
  };

  const handleUserPlanSave = () => {
    console.log("Saving user plan...");
  };

  return (
    <MainLayout>
      <CustomButton
        onClick={() => window.history.back()}
        w="fit-content"
        variant="light"
        rightSection={<IconArrowLeft size={24} stroke={1.5} style={{ paddingBottom: 4 }} />}
      >
        Grilla de usuarios
      </CustomButton>

      <SimpleGrid
        cols={{ base: 1 }}
        style={{ width: "calc(100% - 48px)", margin: "0", marginTop: 20 }}
      >
        {/* User basic info */}
        <div>
          <SectionActions
            title="Datos personales"
            section="userInfo"
            editingSection={editingSection}
            setEditingSection={setEditingSection}
            onSave={handleUserInfoSave}
          />

          <UserInfoForm
            ref={userInfoFormRef}
            isEditing={isEditingUserInfo}
            disabledInputStyles={disabledInputStyles}
            defaultValues={user}
            onSubmit={(values) => updateUser(id!, values)}
          />
        </div>

        {/* User plan info */}
        <div style={{ marginTop: 24 }}>
          <SectionActions
            title="Plan actual"
            section="userPlan"
            editingSection={editingSection}
            setEditingSection={setEditingSection}
            onSave={handleUserPlanSave}
          />

          <Paper shadow="lg" withBorder p="lg">
            asas
          </Paper>
        </div>
      </SimpleGrid>
    </MainLayout>
  );
};

export default UserDetail;
