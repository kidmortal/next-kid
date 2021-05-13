import {
  Input,
  IconButton,
  List,
  ListItem,
  Stack,
  HStack,
  useToast,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Icon,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { useAppContext } from "../../context/AppContext";
import { useState } from "react";
import axios from "axios";
import { MongoUser } from "../../models/mongoUser";
import { FiBox } from "react-icons/fi";
import { ConfigurarSeparado } from "./ConfigurarSeparado";

interface ConfigurarSeparadoModalProps {
  mongoUser: MongoUser;
  fetchUsers: () => void;
}

export function ConfigurarSeparadoModal({
  mongoUser,
  fetchUsers,
}: ConfigurarSeparadoModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
      fetchUsers();
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
      fetchUsers();
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
    <>
      <IconButton
        variant="solid"
        bg="green.400"
        _hover={{ bg: "green.300" }}
        _focus={{ border: "none" }}
        aria-label="Edit User"
        onClick={onOpen}
        icon={<Icon as={FiBox} fontSize="x-large" />}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="gray.600">
          <ModalHeader>
            Escolher pedidos para notificar quando separado
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <ConfigurarSeparado mongoUser={mongoUser} fetchUsers={fetchUsers} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
