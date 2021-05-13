import {
  Box,
  Button,
  Checkbox,
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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { AiOutlineClockCircle } from "react-icons/ai";
import { MongoUser } from "../../models/mongoUser";
import { ConfigurarNotificacoes } from "./ConfigurarNotificacoes";

interface ConfigurarNotificacoesProps {
  mongoUser: MongoUser;
  fetchUsers: () => void;
}

export function ConfigurarNotificacoesModal({
  mongoUser,
  fetchUsers,
}: ConfigurarNotificacoesProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        variant="solid"
        bg="yellow.500"
        _hover={{ bg: "yellow.400" }}
        _focus={{ border: "none" }}
        aria-label="Manage Notifs"
        onClick={onOpen}
        icon={<Icon fontSize="x-large" as={AiOutlineClockCircle} />}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="gray.600">
          <ModalHeader>Editar notificacoes</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <ConfigurarNotificacoes
              mongoUser={mongoUser}
              fetchUsers={fetchUsers}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
