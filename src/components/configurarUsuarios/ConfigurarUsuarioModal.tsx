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
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { MongoUser } from "../../models/mongoUser";

interface ConfigurarUsuarioProps {
  selectedUser: MongoUser;
  setSelectedUser: (user: MongoUser) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function ConfigurarUsuarioModal({
  selectedUser,
  setSelectedUser,
  isOpen,
  onClose,
}: ConfigurarUsuarioProps) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="gray.600">
          <ModalHeader>User Edition</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Nome</FormLabel>
              <Input placeholder="Nome" value={selectedUser?.nome} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Email"
                value={selectedUser?.email}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Celular</FormLabel>
              <Input
                placeholder="+5511992331232"
                value={selectedUser?.celular}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Callmebot Key</FormLabel>
              <Input placeholder="key" value={selectedUser?.callmebotKey} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
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
