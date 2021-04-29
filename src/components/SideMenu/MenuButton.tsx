import { Button, ButtonProps } from "@chakra-ui/button";
import { ReactNode } from "react";

interface MenuButtonProps extends ButtonProps {
  children: ReactNode;
}

export function MenuButton({ children, ...rest }: MenuButtonProps) {
  return (
    <Button
      justifyContent="left"
      bg="gray.500"
      _hover={{ bg: "gray.400" }}
      variant="outline"
      width="100%"
      {...rest}
    >
      {children}
    </Button>
  );
}
