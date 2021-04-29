import {
  Input,
  IconButton,
  List,
  ListItem,
  Stack,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { useAppContext } from "../../context/AppContext";
import { useState } from "react";

export function NotificacoesClientes() {
  const { mongoUser } = useAppContext();
  const [cliente, setCliente] = useState("");

  const toast = useToast();

  function handleAddCliente() {
    toast({
      title: "Calma la amigao",
      description: "Eu to com preguiça",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  }
  function handleRemoveCliente(cliente: string) {
    toast({
      title: "Calma la amigao",
      description: "Eu to com preguiça",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  }

  return (
    <Stack>
      <HStack>
        <Input
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
          placeholder="Nome do cliente"
        />
        <IconButton
          variant="unstyled"
          color="green.400"
          _hover={{ color: "green.200" }}
          aria-label="Add Cliente"
          icon={<AddIcon />}
          onClick={() => handleAddCliente()}
        />
      </HStack>
      <List spacing={3}>
        {mongoUser?.notificar.SEPARADO.map((cliente) => (
          <ListItem>
            {cliente}
            <IconButton
              variant="unstyled"
              color="red.400"
              _hover={{ color: "red.200" }}
              aria-label="Remove Cliente"
              icon={<DeleteIcon />}
              onClick={() => handleRemoveCliente(cliente)}
            />
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
