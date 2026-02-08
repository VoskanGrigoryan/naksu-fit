import { Button, type ButtonProps } from "@mantine/core";
import type { MouseEvent } from "react";

type CustomButtonProps = Omit<ButtonProps, "onClick"> & {
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void | Promise<void>;
};

const CustomButton = ({
  variant = "filled",
  color = "blue",
  leftSection,
  rightSection,
  onClick,
  ...props
}: CustomButtonProps) => {
  return (
    <Button
      variant={variant}
      color={color}
      leftSection={leftSection}
      rightSection={rightSection}
      onClick={onClick}
      {...props}
      style={{ paddingTop: 4 }}
    />
  );
};

export default CustomButton;
