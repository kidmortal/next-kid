import {
  Box,
  Button,
  HStack,
  Icon,
  IconButton,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { BiRefresh } from "react-icons/bi";
import { useAppContext } from "../../context/AppContext";
import { MongoEmpresa } from "../../models/mongoEmpresa";

export function ConfiguracoesEmpresa() {
  const { mongoUser, mongoEmpresa, setMongoEmpresa } = useAppContext();
  const toast = useToast();

  async function toastNotify(success) {
    if (success === 1) {
      toast({
        title: "Configuração atualizada",
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

  async function handleToggleBloqueioAutomatico() {
    let active = !mongoEmpresa?.BLOQUEIO_AUTOMATICO;
    let response = await axios.post("/api/mongodb/empresas", {
      call: "setEmpresa",
      id: mongoEmpresa._id,
      props: { BLOQUEIO_AUTOMATICO: active },
    });
    toastNotify(response.data);
    if (response.data === 1) {
      let newMongoEmpresa = {
        ...mongoEmpresa,
      };
      newMongoEmpresa.BLOQUEIO_AUTOMATICO = active;
      setMongoEmpresa(newMongoEmpresa);
    }
  }

  return (
    <Stack justify="space-between" align="center">
      <Text fontStyle="italic" color="blue.300" fontSize="x-large">
        Configuraçoes da empresa - {mongoEmpresa?.nome || "Nenhuma empresa"}
      </Text>
      <HStack>
        <IconButton
          variant="unstyled"
          _hover={{ bg: "blue.600" }}
          _focus={{ border: "none" }}
          aria-label=""
          onClick={handleToggleBloqueioAutomatico}
          icon={
            mongoEmpresa?.BLOQUEIO_AUTOMATICO ? (
              <Icon
                as={AiOutlineAppstoreAdd}
                fontSize="x-large"
                color="green.400"
              />
            ) : (
              <Icon
                as={AiOutlineAppstoreAdd}
                fontSize="x-large"
                color="red.400"
              />
            )
          }
        />
        <Text>Bloqueio Automatico de pedidos com pendencia financeira</Text>
      </HStack>
    </Stack>
  );
}
