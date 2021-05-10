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
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { MongoUser } from "../../models/mongoUser";

interface ConfigurarAppsProps {
  selectedUser: MongoUser;
  setSelectedUser: (user: MongoUser) => void;
  isOpen: boolean;
  onClose: () => void;
  fetchUsers: () => void;
}

export function ConfigurarAppsModal({
  selectedUser,
  setSelectedUser,
  isOpen,
  onClose,
  fetchUsers,
}: ConfigurarAppsProps) {
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

  async function handleBaixarContas() {
    let active = !selectedUser?.apps.BAIXAR_CONTAS;
    let response = await axios.post("/api/mongodb/usuarios", {
      call: "updateUserById",
      id: selectedUser._id,
      props: { "apps.BAIXAR_CONTAS": active },
    });
    toastNotify(response.data);
    if (response.data === 1) {
      let newMongoUser: MongoUser = {
        ...selectedUser,
      };
      newMongoUser.apps.BAIXAR_CONTAS = active;
      setSelectedUser(newMongoUser);
    }
  }
  async function handleUsuarios() {
    let active = !selectedUser?.apps.USUARIOS;
    let response = await axios.post("/api/mongodb/usuarios", {
      call: "updateUserById",
      id: selectedUser._id,
      props: { "apps.USUARIOS": active },
    });
    toastNotify(response.data);
    if (response.data === 1) {
      let newMongoUser: MongoUser = {
        ...selectedUser,
      };
      newMongoUser.apps.USUARIOS = active;
      setSelectedUser(newMongoUser);
    }
  }
  async function handleFuncoesAdministrativas() {
    let active = !selectedUser?.apps.FUNCOES_ADMINISTRATIVAS;
    let response = await axios.post("/api/mongodb/usuarios", {
      call: "updateUserById",
      id: selectedUser._id,
      props: { "apps.FUNCOES_ADMINISTRATIVAS": active },
    });
    toastNotify(response.data);
    if (response.data === 1) {
      let newMongoUser: MongoUser = {
        ...selectedUser,
      };
      newMongoUser.apps.FUNCOES_ADMINISTRATIVAS = active;
      setSelectedUser(newMongoUser);
    }
  }

  async function handleNotificacoes() {
    let active = !selectedUser?.apps.NOTIFICACOES;
    let response = await axios.post("/api/mongodb/usuarios", {
      call: "updateUserById",
      id: selectedUser._id,
      props: { "apps.NOTIFICACOES": active },
    });
    toastNotify(response.data);
    if (response.data === 1) {
      let newMongoUser: MongoUser = {
        ...selectedUser,
      };
      newMongoUser.apps.NOTIFICACOES = active;
      setSelectedUser(newMongoUser);
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="gray.600">
          <ModalHeader>Edit User Apps</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Stack>
              <HStack>
                <IconButton
                  variant="unstyled"
                  _hover={{ bg: "blue.600" }}
                  _focus={{ border: "none" }}
                  aria-label=""
                  icon={
                    selectedUser?.apps?.BAIXAR_CONTAS ? (
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
                  onClick={(e) => {
                    handleBaixarContas();
                  }}
                />
                <Text>Baixar Contas</Text>
              </HStack>
              <HStack>
                <IconButton
                  variant="unstyled"
                  _hover={{ bg: "blue.600" }}
                  _focus={{ border: "none" }}
                  aria-label=""
                  icon={
                    selectedUser?.apps?.USUARIOS ? (
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
                  onClick={(e) => {
                    handleUsuarios();
                  }}
                />
                <Text>Configurar Usuarios</Text>
              </HStack>
              <HStack>
                <IconButton
                  variant="unstyled"
                  _hover={{ bg: "blue.600" }}
                  _focus={{ border: "none" }}
                  aria-label=""
                  icon={
                    selectedUser?.apps?.NOTIFICACOES ? (
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
                  onClick={(e) => {
                    handleNotificacoes();
                  }}
                />

                <Text>Notificaçoes </Text>
              </HStack>
              <HStack>
                <IconButton
                  variant="unstyled"
                  _hover={{ bg: "blue.600" }}
                  _focus={{ border: "none" }}
                  aria-label=""
                  icon={
                    selectedUser?.apps?.FUNCOES_ADMINISTRATIVAS ? (
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
                  onClick={(e) => {
                    handleFuncoesAdministrativas();
                  }}
                />

                <Text>Funçoes Administrativas</Text>
              </HStack>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
