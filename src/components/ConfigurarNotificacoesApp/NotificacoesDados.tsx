import { Stack, Text } from "@chakra-ui/layout";
import { useAppContext } from "../../context/AppContext";

export function NotificacoesDados() {
  const { mongoUser } = useAppContext();

  return (
    <Stack justify="center" align="center">
      <Text>Notificacoes</Text>
      <Text>
        {`Celular: ${
          mongoUser?.celular
            ? ` ${mongoUser.celular} ✔`
            : "Sem numero Configurado ❌"
        }`}
      </Text>
      <Text>
        {`Key: ${
          mongoUser?.callmebotKey
            ? `${mongoUser.callmebotKey} ✔`
            : "Sem chave Configurada ❌"
        }`}
      </Text>
    </Stack>
  );
}
