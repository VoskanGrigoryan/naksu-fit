import {
  AppShell,
  Button,
  Stack,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import React, { useState } from "react";
import {
  IconClipboardList,
  IconHome2,
  IconLogout,
  IconUser,
} from "@tabler/icons-react";
import styles from "./MainLayout.module.css";
import { useNavigate } from "react-router-dom";

interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={styles.link}
        data-active={active || undefined}
        aria-label={label}
      >
        <Icon size={28} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const [active, setActive] = useState(0);

  const mockdata = [
    { icon: IconHome2, label: "Panel principal" },
    { icon: IconUser, label: "Usuarios" },
    { icon: IconClipboardList, label: "Planes" },
  ];

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  return (
    <AppShell
      navbar={{
        width: { base: 70 },
        breakpoint: "xs",
      }}
    >
      <AppShell.Navbar p={0} className={styles.navbar}>
        <div className={styles.navbarMain}>
          <Stack justify="center" gap={0}>
            {links}
          </Stack>
        </div>

        <Stack justify="center" gap={0} style={{ paddingBottom: 10 }}>
          <Tooltip
            label={"Cerrar sesión"}
            position="right"
            transitionProps={{ duration: 0 }}
          >
            <Button onClick={() => navigate("/auth")} fullWidth>
              <IconLogout />
            </Button>
          </Tooltip>
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default MainLayout;
