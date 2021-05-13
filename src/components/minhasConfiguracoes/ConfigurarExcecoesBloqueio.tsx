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

interface ConfigurarExcecoesBloqueioProps {
  mongoUser: MongoUser;
  fetchUsers: () => void;
}

export function ConfigurarExcecoesBloqueio({
  mongoUser,
  fetchUsers,
}: ConfigurarExcecoesBloqueioProps) {
  const [loading, setLoading] = useState(false);
  const [pedido, setPedido] = useState("");

  const toast = useToast();

  async function successMessage(response) {
    if (response.data) {
      toast({
        title: "Cadastrado Exceção",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      setLoading(false);
      setPedido("");
    } else {
      toast({
        title: "Erro ao adicionar",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      setLoading(false);
    }
  }

  async function handleAddPedido() {
    setLoading(true);
    let response = await axios.post("/api/mongodb/usuarios", {
      call: "updateUserById",
      id: mongoUser._id,
      props: {
        $push: { pedidos_pre_autorizados: pedido },
      },
    });
    if (response.data) fetchUsers();
    successMessage(response);
  }
  async function handleRemovePedido(pedido: string) {
    let response = await axios.post("/api/mongodb/usuarios", {
      call: "updateUserById",
      id: mongoUser._id,
      props: {
        $pull: { pedidos_pre_autorizados: pedido },
      },
    });

    if (response.data) fetchUsers();
    successMessage(response);
  }

  return (
    <Stack>
      <HStack>
        <Input
          value={pedido}
          onChange={(e) => setPedido(e.target.value)}
          placeholder="Numero do pedido"
        />
        <IconButton
          variant="unstyled"
          color="green.400"
          _hover={{ color: "green.200" }}
          aria-label="Add Cliente"
          icon={<AddIcon />}
          onClick={() => handleAddPedido()}
          isLoading={loading}
        />
      </HStack>
      <List spacing={3}>
        {mongoUser?.pedidos_pre_autorizados?.map((pedido) => (
          <ListItem key={pedido}>
            <HStack>
              <Text>Pedido numero</Text>
              <Text fontSize="large" color="green.300">
                {pedido}
              </Text>
              <IconButton
                variant="unstyled"
                color="red.400"
                _hover={{ color: "red.200" }}
                aria-label="Remove Cliente"
                icon={<DeleteIcon />}
                onClick={() => handleRemovePedido(pedido)}
              />
            </HStack>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
