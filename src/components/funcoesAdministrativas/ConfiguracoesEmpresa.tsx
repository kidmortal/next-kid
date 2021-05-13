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

export function ConfiguracoesEmpresa() {
  const { mongoUser } = useAppContext();
  const [empresa, setEmpresa] = useState({});
  const [disabled, setDisabled] = useState(false);
  const toast = useToast();

  async function handleUpdateData() {}

  return (
    <Stack justify="space-between" align="center">
      <Text fontStyle="italic" color="blue.300" fontSize="x-large">
        Configuraçoes da empresa
      </Text>
      <HStack>
        <IconButton
          variant="unstyled"
          _hover={{ bg: "blue.600" }}
          _focus={{ border: "none" }}
          aria-label=""
          icon={
            empresa ? (
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
