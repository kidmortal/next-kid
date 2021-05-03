import { Stack } from "@chakra-ui/react";
import { ConfigurarNotificacoes } from "../components/configurarNotificacoes/ConfigurarNotificacoes";
import { Header } from "../components/Header/Header";

export default function Notificacoes() {
  return (
    <Stack align="center" spacing={2}>
      <Stack width={[350, 500, 700]}>
        <Header />
        <ConfigurarNotificacoes />
      </Stack>
    </Stack>
  );
}
