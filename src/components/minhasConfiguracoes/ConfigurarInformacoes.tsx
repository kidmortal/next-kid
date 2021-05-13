import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MongoUser } from "../../models/mongoUser";

interface ConfigurarInformacoesProps {
  mongoUser: MongoUser;
  fetchUsers: () => void;
  onClose: () => void;
}

export function ConfigurarInformacoes({
  mongoUser,
  fetchUsers,
  onClose,
}: ConfigurarInformacoesProps) {
  const toast = useToast();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [callmebotkey, setCallmebotkey] = useState("");

  useEffect(() => {
    const { nome, email, celular, callmebotKey } = mongoUser;
    setNome(nome);
    setEmail(email);
    setCelular(celular);
    setCallmebotkey(callmebotKey);
  }, [mongoUser]);

  function handleSave() {
    axios
      .post("/api/mongodb/usuarios", {
        call: "updateUserById",
        id: mongoUser._id,
        props: {
          $set: {
            nome: nome,
            email: email,
            celular: celular,
            callmebotKey: callmebotkey,
          },
        },
      })
      .then((response) => {
        if (response) {
          toast({
            title: "Successo",
            description: "Usuario foi alterado",
            status: "success",
            isClosable: true,
            duration: 4000,
            position: "top-right",
          });
          fetchUsers();
          onClose();
        }
      });
  }

  return (
    <Stack>
      <FormControl>
        <FormLabel>Nome</FormLabel>
        <Input
          placeholder="Nome"
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Celular</FormLabel>
        <Input
          type="tel"
          placeholder="+5511992331232"
          value={celular}
          onChange={(e) => setCelular(e.target.value)}
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Callmebot Key</FormLabel>
        <Input
          placeholder="key"
          type="number"
          value={callmebotkey}
          onChange={(e) => setCallmebotkey(e.target.value)}
        />
      </FormControl>
      <HStack justify="space-around">
        <Button
          variant="outline"
          bg="gray.600"
          _hover={{ bg: "gray.500" }}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button colorScheme="blue" mr={3} onClick={handleSave}>
          Save
        </Button>
      </HStack>
    </Stack>
  );
}
