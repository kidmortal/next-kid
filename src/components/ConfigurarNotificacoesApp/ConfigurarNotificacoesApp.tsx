import { Stack, Text } from "@chakra-ui/layout";
import { Tag } from "@chakra-ui/tag";
import { useAppContext } from "../../context/AppContext";
import { NotificacoesCheckBox } from "./NotificacoesCheckBox";
import { NotificacoesClientes } from "./NotificacoesClientes";
import { NotificacoesDados } from "./NotificacoesDados";

export function ConfigurarNotificacoesApp() {
  const { mongoUser } = useAppContext();

  return mongoUser?.apps.NOTIFICACOES ? (
    <Stack justify="center" align="center" spacing={4}>
      <NotificacoesDados />
      <NotificacoesCheckBox />
      <Text>Alteração de Status - SEPARADO</Text>
      <NotificacoesClientes />
    </Stack>
  ) : (
    <Tag justifyContent="center">Voce num tem permissione 😂😂👌</Tag>
  );
}
