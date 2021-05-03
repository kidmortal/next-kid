import {
  Input,
  IconButton,
  List,
  ListItem,
  Stack,
  HStack,
  useToast,
  Text,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { useAppContext } from "../../context/AppContext";
import { useState } from "react";
import axios from "axios";
import { MongoUser } from "../../models/mongoUser";

export function NotificacoesClientes() {
  const { mongoUser, setMongoUser } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [cliente, setCliente] = useState("");

  const toast = useToast();

  async function handleAddCliente() {
    setLoading(true);
    let response = await axios.post("/api/mongodb/usuarios", {
      call: "addNewNotificationClient",
      name: cliente,
      email: mongoUser?.email,
    });
    if (response.data) {
      let newMongoUser = { ...mongoUser };
      newMongoUser.notificar?.SEPARADO?.push(cliente);
      setMongoUser(newMongoUser);
      toast({
        title: "Cadastrado Notificacao",
        status: "success",
        description: cliente,
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      setLoading(false);
      setCliente("");
    } else {
      toast({
        title: "Erro",
        status: "error",
        description: cliente,
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      setLoading(false);
    }
  }
  async function handleRemoveCliente(cliente: string) {
    let response = await axios.post("/api/mongodb/usuarios", {
      call: "removeNotificationClient",
      name: cliente,
      email: mongoUser?.email,
    });

    if (response.data) {
      let newMongoUser = { ...mongoUser };
      let index = newMongoUser.notificar?.SEPARADO?.findIndex(
        (c) => c === cliente
      );
      if (index >= 0) newMongoUser.notificar?.SEPARADO?.splice(index, 1);
      setMongoUser(newMongoUser);
      toast({
        title: "Removido Notificacao",
        status: "info",
        description: cliente,
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } else {
      toast({
        title: "Erro",
        status: "error",
        description: cliente,
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
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
          isLoading={loading}
        />
      </HStack>
      <List spacing={3}>
        {mongoUser?.notificar.SEPARADO.map((cliente) => (
          <ListItem key={cliente}>
            <Text fontSize="small" as="span">
              {cliente}
            </Text>
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
