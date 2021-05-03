import { Stack, Text } from "@chakra-ui/react";
import { ConfigurarUsuarioModal } from "./ConfigurarUsuarioModal";
import { ListaUsuarios } from "./ListaUsuarios";

export function ConfigurarUsuarios() {
  return (
    <Stack justify="center" align="center">
      <Text>Configurar usuarios</Text>
      <ListaUsuarios />
    </Stack>
  );
}
