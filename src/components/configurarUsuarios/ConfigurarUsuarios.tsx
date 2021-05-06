import { Stack, Text } from "@chakra-ui/react";
import { ListaUsuarios } from "./ListaUsuarios";

export function ConfigurarUsuarios() {
  return (
    <Stack justify="center" align="center">
      <Text fontSize="xl" fontWeight="bold" color="blue.400">
        Configurar usuarios
      </Text>
      <ListaUsuarios />
    </Stack>
  );
}
