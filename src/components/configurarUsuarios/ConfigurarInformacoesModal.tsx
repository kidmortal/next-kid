import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { MongoUser } from "../../models/mongoUser";

interface ConfigurarInformacoesProps {
  selectedUser: MongoUser;
  setSelectedUser: (user: MongoUser) => void;
  isOpen: boolean;
  onClose: () => void;
  fetchUsers: () => void;
}

export function ConfigurarInformacoesModal({
  selectedUser,
  setSelectedUser,
  isOpen,
  onClose,
  fetchUsers,
}: ConfigurarInformacoesProps) {
  const toast = useToast();

  function handleSave() {
    axios
      .post("/api/mongodb/usuarios", {
        call: "updateUserById",
        id: selectedUser._id,
        ...selectedUser,
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
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="gray.600">
          <ModalHeader>Edit User Informations</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Nome</FormLabel>
              <Input
                placeholder="Nome"
                type="text"
                value={selectedUser?.nome}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, nome: e.target.value })
                }
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Email"
                value={selectedUser?.email}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, email: e.target.value })
                }
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Celular</FormLabel>
              <Input
                type="tel"
                placeholder="+5511992331232"
                value={selectedUser?.celular}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, celular: e.target.value })
                }
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Callmebot Key</FormLabel>
              <Input
                placeholder="key"
                type="number"
                value={selectedUser?.callmebotKey}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    callmebotKey: e.target.value,
                  })
                }
              />
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent="space-between">
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button
              variant="outline"
              bg="gray.600"
              _hover={{ bg: "gray.500" }}
              onClick={onClose}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
