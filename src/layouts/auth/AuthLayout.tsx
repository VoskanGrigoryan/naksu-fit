import { AppShell } from "@mantine/core";
import { IconSettings } from "@tabler/icons-react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppShell>
      <AppShell.Main>{children}</AppShell.Main>
      <AppShell.Footer
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          height: 32,
        }}
      >
        <IconSettings style={{ marginRight: 20 }} size={20} />
      </AppShell.Footer>
    </AppShell>
  );
};

export default AuthLayout;
