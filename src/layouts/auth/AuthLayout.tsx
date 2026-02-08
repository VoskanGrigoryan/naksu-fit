import { AppShell } from "@mantine/core";

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
          paddingRight: 20,
        }}
      ></AppShell.Footer>
    </AppShell>
  );
};

export default AuthLayout;
