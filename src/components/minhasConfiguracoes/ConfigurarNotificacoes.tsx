import { IconButton } from "@chakra-ui/button";
import { Checkbox } from "@chakra-ui/checkbox";
import Icon from "@chakra-ui/icon";
import { BellIcon } from "@chakra-ui/icons";
import { HStack, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { BiBell, BiBellOff } from "react-icons/bi";
import { MongoUser } from "../../models/mongoUser";
import { ConfigurarNotificacoesHeader } from "./ConfigurarNotificacoesHeader";

interface ConfigurarNotificacoesProps {
  mongoUser: MongoUser;
  fetchUsers: () => void;
}

export function ConfigurarNotificacoes({
  mongoUser,
  fetchUsers,
}: ConfigurarNotificacoesProps) {
  const toast = useToast();

  async function toastNotify(success) {
    if (success === 1) {
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
        description: JSON.stringify(success),
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
      call: "updateUserById",
      id: mongoUser._id,
      props: { $set: { "notificar.RELATORIO_DIARIO": active } },
    });
    toastNotify(response.data);
    if (response.data === 1) {
      let newMongoUser: MongoUser = {
        ...mongoUser,
      };
      newMongoUser.notificar.RELATORIO_DIARIO = active;
      fetchUsers();
    }
  }
  async function handleSemData() {
    let active = !mongoUser?.notificar.DATA_INCORRETA;
    let response = await axios.post("/api/mongodb/usuarios", {
      call: "updateUserById",
      id: mongoUser._id,
      props: { $set: { "notificar.DATA_INCORRETA": active } },
    });
    toastNotify(response.data);
    if (response.data === 1) {
      let newMongoUser: MongoUser = {
        ...mongoUser,
      };
      newMongoUser.notificar.DATA_INCORRETA = active;
      fetchUsers();
    }
  }
  async function handleSemCodicao() {
    let active = !mongoUser?.notificar.SEM_CONDICAO;
    let response = await axios.post("/api/mongodb/usuarios", {
      call: "updateUserById",
      id: mongoUser._id,
      props: { $set: { "notificar.SEM_CONDICAO": active } },
    });
    toastNotify(response.data);
    if (response.data === 1) {
      let newMongoUser: MongoUser = {
        ...mongoUser,
      };
      newMongoUser.notificar.SEM_CONDICAO = active;
      fetchUsers();
    }
  }

  async function handleComPendencia() {
    let active = !mongoUser?.notificar.CLIENTE_COM_PENDENCIA;
    let response = await axios.post("/api/mongodb/usuarios", {
      call: "updateUserById",
      id: mongoUser._id,
      props: { $set: { "notificar.CLIENTE_COM_PENDENCIA": active } },
    });
    toastNotify(response.data);
    if (response.data === 1) {
      let newMongoUser: MongoUser = {
        ...mongoUser,
      };
      newMongoUser.notificar.CLIENTE_COM_PENDENCIA = active;
      fetchUsers();
    }
  }
  async function handleErroSuspeito() {
    let active = !mongoUser?.notificar.ERRO_SUSPEITO;
    let response = await axios.post("/api/mongodb/usuarios", {
      call: "updateUserById",
      id: mongoUser._id,
      props: { $set: { "notificar.ERRO_SUSPEITO": active } },
    });
    toastNotify(response.data);
    if (response.data === 1) {
      let newMongoUser: MongoUser = {
        ...mongoUser,
      };
      newMongoUser.notificar.ERRO_SUSPEITO = active;
      fetchUsers();
    }
  }

  return (
    <Stack>
      <ConfigurarNotificacoesHeader />
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
