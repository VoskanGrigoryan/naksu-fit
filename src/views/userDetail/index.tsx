import { useState } from "react";
import { useParams } from "react-router-dom";
import { Paper, SimpleGrid } from "@mantine/core";

import MainLayout from "../../layouts/main/MainLayout";
import { mockUsers } from "../../mocks/userTableData";

import UserInfoForm from "./UserInfoForm";
import SectionActions, { type Section } from "../../components/ActionButtons";
import CustomButton from "../../components/reusable/Button";
import { IconArrowLeft } from "@tabler/icons-react";

/* -------------------- types -------------------- */

type EditingSection = Section | null;

/* -------------------- component -------------------- */

const UserDetail = () => {
  const { id } = useParams();

  const users = mockUsers.map((u) => ({
    ...u,
    birthday: u.birthday ? new Date(u.birthday) : null,
    lastActive: u.lastActive ? new Date(u.lastActive) : null,
  }));

  const user = users.find((u) => u.id === id);
  if (!user) return <div>User not found</div>;

  const [editingSection, setEditingSection] = useState<EditingSection>(null);

  const isEditingUserInfo = editingSection === "userInfo";

  const disabledInputStyles = {
    input: {
      opacity: 0.9,
      WebkitTextFillColor: "var(--mantine-color-gray-5)",
    },
  };

  const handleUserInfoSave = () => {
    // TODO: implement save logic
    console.log("Saving user info...");
  };

  const handleUserPlanSave = () => {
    // TODO: implement save logic
    console.log("Saving user plan...");
  };

  

  return (
    <MainLayout>
      <CustomButton
        onClick={() => window.history.back()}
        w="fit-content"
        variant="light"
        rightSection={
          <IconArrowLeft size={24} stroke={1.5} style={{ paddingBottom: 4 }} />
        }
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
            isEditingUserInfo={isEditingUserInfo}
            disabledInputStyles={disabledInputStyles}
            user={user}
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
