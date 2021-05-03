import { Stack } from "@chakra-ui/react";
import { ConfigurarUsuarios } from "../components/configurarUsuarios/ConfigurarUsuarios";
import { Header } from "../components/header/Header";

export default function configurarusuarios() {
  return (
    <Stack align="center" spacing={2}>
      <Stack width={[350, 500, 700]}>
        <Header />
        <ConfigurarUsuarios />
      </Stack>
    </Stack>
  );
}
