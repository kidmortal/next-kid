import {
  Box,
  Button,
  HStack,
  Icon,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { BiRefresh } from "react-icons/bi";
import { useAppContext } from "../../context/AppContext";

export function AtualizarContas() {
  const { mongoUser } = useAppContext();
  const [disabled, setDisabled] = useState(false);
  const toast = useToast();

  async function handleUpdateData() {
    setDisabled(true);
    let response = await axios.post(`api/api/funcoes/syncpedidos`, {
      email: mongoUser.email,
    });
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

  return (
    <HStack justify="space-between">
      <Stack justify="center" align="center">
        <Text fontStyle="italic" color="blue.300" fontSize="x-large">
          Boletos
        </Text>
        <Button
          variant="outline"
          _hover={{ bg: "blue.600" }}
          _focus={{ border: "none" }}
          leftIcon={<Icon as={BiRefresh} fontSize="large" />}
          onClick={handleUpdateData}
          disabled={disabled}
        >
          Atualizar
        </Button>
      </Stack>
    </HStack>
  );
}
