import Icon from "@chakra-ui/icon";
import { HStack, Stack, Text } from "@chakra-ui/layout";
import { AiOutlineAliwangwang, AiOutlineMobile } from "react-icons/ai";
import { useAppContext } from "../../context/AppContext";

export function ConfigurarNotificacoesHeader() {
  const { mongoUser } = useAppContext();

  return (
    <Stack justify="center" align="center">
      <Text>Notificacoes</Text>
      <HStack>
        <Icon as={AiOutlineMobile} fontSize="x-large" color="green.400" />
        <Text>
          {`Celular: ${
            mongoUser?.celular
              ? ` ${mongoUser.celular} ✔`
              : "Sem numero Configurado ❌"
          }`}
        </Text>
      </HStack>
      <HStack>
        <Icon as={AiOutlineAliwangwang} fontSize="x-large" color="green.400" />
        <Text>
          {`Key: ${
            mongoUser?.callmebotKey
              ? `${mongoUser.callmebotKey} ✔`
              : "Sem chave Configurada ❌"
          }`}
        </Text>
      </HStack>
    </Stack>
  );
}
