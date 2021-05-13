import {
  Box,
  Button,
  HStack,
  Icon,
  Stack,
  Text,
  useToast,
  ButtonProps,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { BiRefresh } from "react-icons/bi";
import { useAppContext } from "../../context/AppContext";

interface RequestButtonProps extends ButtonProps {
  message: string;
}

export function Requisicoes() {
  const { mongoUser } = useAppContext();
  const [disabled, setDisabled] = useState(false);
  const toast = useToast();

  function RequestButton({ message, onClick }: RequestButtonProps) {
    return (
      <Button
        variant="outline"
        _hover={{ bg: "blue.600" }}
        _focus={{ border: "none" }}
        leftIcon={<Icon as={BiRefresh} fontSize="large" />}
        onClick={onClick}
        disabled={disabled}
      >
        {message}
      </Button>
    );
  }

  function successMessage(response) {
    toast({
      duration: 8000,
      isClosable: true,
      position: "top-right",
      status: "success",
      description: JSON.stringify(response.data),
    });
    setTimeout(() => {
      setDisabled(false);
    }, 10000);
  }

  async function handleSyncContas() {
    setDisabled(true);
    let response = await axios.post(`api/api/funcoes/synccontas`, {
      email: mongoUser.email,
    });
    successMessage(response);
  }

  return (
    <HStack justify="space-between">
      <Stack justify="center" align="center" spacing={10}>
        <Text fontStyle="italic" color="blue.300" fontSize="x-large">
          Requisicoes
        </Text>
        <RequestButton
          message={"Atualizar Contas"}
          onClick={handleSyncContas}
        />
        <RequestButton
          message={"Atualizar Pedidos"}
          onClick={handleSyncContas}
        />
        <RequestButton
          message={"Enviar Relatorio Diario"}
          onClick={handleSyncContas}
        />
        <RequestButton
          message={"Enviar Relatorio Vendedores"}
          onClick={handleSyncContas}
        />
      </Stack>
    </HStack>
  );
}
