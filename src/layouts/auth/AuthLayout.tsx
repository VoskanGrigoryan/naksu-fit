import { AppShell } from "@mantine/core";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppShell>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default AuthLayout;
