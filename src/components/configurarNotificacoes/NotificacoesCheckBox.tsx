import { IconButton } from "@chakra-ui/button";
import { Checkbox } from "@chakra-ui/checkbox";
import Icon from "@chakra-ui/icon";
import { BellIcon } from "@chakra-ui/icons";
import { HStack, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { BiBell, BiBellOff } from "react-icons/bi";
import { MongoUser } from "../../models/mongoUser";

interface NotificacoesCheckBoxProps {
  mongoUser: MongoUser;
  setMongoUser: (user: MongoUser) => void;
}

export function NotificacoesCheckBox({
  mongoUser,
  setMongoUser,
}: NotificacoesCheckBoxProps) {
  const toast = useToast();

  async function toastNotify(success: boolean) {
    if (success) {
      toast({
        title: "Notificação Atualizada",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } else {
      toast({
        title: "Erro Ao Atualizar",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  }

  async function handleRelatorioDiario() {
    let active = !mongoUser?.notificar.RELATORIO_DIARIO;
    let response = await axios.post("/api/mongodb/usuarios", {
      call: "relatorioDiarioNotification",
      email: mongoUser?.email,
      active,
    });
    toastNotify(response.data);
    if (response.data) {
      let newMongoUser: MongoUser = {
        ...mongoUser,
      };
      newMongoUser.notificar.RELATORIO_DIARIO = active;
      setMongoUser(newMongoUser);
    }
  }
  async function handleSemData() {
    let active = !mongoUser?.notificar.DATA_INCORRETA;
    let response = await axios.post("/api/mongodb/usuarios", {
      call: "pedidoSemDataNotification",
      email: mongoUser?.email,
      active,
    });
    toastNotify(response.data);
    if (response.data) {
      let newMongoUser: MongoUser = {
        ...mongoUser,
      };
      newMongoUser.notificar.DATA_INCORRETA = active;
      setMongoUser(newMongoUser);
    }
  }
  async function handleSemCodicao() {
    let active = !mongoUser?.notificar.SEM_CONDICAO;
    let response = await axios.post("/api/mongodb/usuarios", {
      call: "pedidoSemCondicaoNotification",
      email: mongoUser?.email,
      active,
    });
    toastNotify(response.data);
    if (response.data) {
      let newMongoUser: MongoUser = {
        ...mongoUser,
      };
      newMongoUser.notificar.SEM_CONDICAO = active;
      setMongoUser(newMongoUser);
    }
  }

  async function handleComPendencia() {
    let active = !mongoUser?.notificar.CLIENTE_COM_PENDENCIA;
    let response = await axios.post("/api/mongodb/usuarios", {
      call: "pedidoSemCondicaoNotification",
      email: mongoUser?.email,
      active,
    });
    toastNotify(response.data);
    if (response.data) {
      let newMongoUser: MongoUser = {
        ...mongoUser,
      };
      newMongoUser.notificar.CLIENTE_COM_PENDENCIA = active;
      setMongoUser(newMongoUser);
    }
  }
  async function handleErroSuspeito() {
    let active = !mongoUser?.notificar.ERRO_SUSPEITO;
    let response = await axios.post("/api/mongodb/usuarios", {
      call: "pedidoSemCondicaoNotification",
      email: mongoUser?.email,
      active,
    });
    toastNotify(response.data);
    if (response.data) {
      let newMongoUser: MongoUser = {
        ...mongoUser,
      };
      newMongoUser.notificar.ERRO_SUSPEITO = active;
      setMongoUser(newMongoUser);
    }
  }

  return (
    <Stack>
      <HStack>
        <IconButton
          variant="unstyled"
          _hover={{ bg: "blue.600" }}
          _focus={{ border: "none" }}
          aria-label=""
          icon={
            mongoUser?.notificar?.RELATORIO_DIARIO ? (
              <Icon as={BiBell} fontSize="x-large" color="green.400" />
            ) : (
              <Icon as={BiBellOff} fontSize="x-large" color="red.400" />
            )
          }
          onClick={(e) => handleRelatorioDiario()}
        />
        <Text>Relatorio Diario</Text>
      </HStack>
      <HStack>
        <IconButton
          variant="unstyled"
          _hover={{ bg: "blue.600" }}
          _focus={{ border: "none" }}
          aria-label=""
          icon={
            mongoUser?.notificar?.DATA_INCORRETA ? (
              <Icon as={BiBell} fontSize="x-large" color="green.400" />
            ) : (
              <Icon as={BiBellOff} fontSize="x-large" color="red.400" />
            )
          }
          onClick={(e) => handleSemData()}
        />
        <Text>Pedido Concluido sem Data de Saida</Text>
      </HStack>
      <HStack>
        <IconButton
          variant="unstyled"
          _hover={{ bg: "blue.600" }}
          _focus={{ border: "none" }}
          aria-label=""
          icon={
            mongoUser?.notificar?.SEM_CONDICAO ? (
              <Icon as={BiBell} fontSize="x-large" color="green.400" />
            ) : (
              <Icon as={BiBellOff} fontSize="x-large" color="red.400" />
            )
          }
          onClick={(e) => handleSemCodicao()}
        />

        <Text>Pedido Concluido sem Condição de pagamento</Text>
      </HStack>
      <HStack>
        <IconButton
          variant="unstyled"
          _hover={{ bg: "blue.600" }}
          _focus={{ border: "none" }}
          aria-label=""
          icon={
            mongoUser?.notificar?.CLIENTE_COM_PENDENCIA ? (
              <Icon as={BiBell} fontSize="x-large" color="green.400" />
            ) : (
              <Icon as={BiBellOff} fontSize="x-large" color="red.400" />
            )
          }
          onClick={(e) => handleComPendencia()}
        />

        <Text>Pedido de Cliente Com pendencia</Text>
      </HStack>

      <HStack>
        <IconButton
          variant="unstyled"
          _hover={{ bg: "blue.600" }}
          _focus={{ border: "none" }}
          aria-label=""
          icon={
            mongoUser?.notificar?.ERRO_SUSPEITO ? (
              <Icon as={BiBell} fontSize="x-large" color="green.400" />
            ) : (
              <Icon as={BiBellOff} fontSize="x-large" color="red.400" />
            )
          }
          onClick={(e) => handleErroSuspeito()}
        />

        <Text>Pedido com Suspeita de Erro</Text>
      </HStack>
    </Stack>
  );
}
