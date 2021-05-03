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

export function ConfigurarUsuarioModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        variant="outline"
        bg="gray.600"
        _hover={{ bg: "gray.500" }}
        onClick={onOpen}
      >
        Open Modal
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="gray.600">
          <ModalHeader>User Edition</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Nome</FormLabel>
              <Input placeholder="Nome" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="Email" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Celular</FormLabel>
              <Input placeholder="+5511992331232" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Callmebot Key</FormLabel>
              <Input placeholder="key" />
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
