import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
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
import { MongoUser } from "../../models/mongoUser";
import { NotificacoesCheckBox } from "../configurarNotificacoes/NotificacoesCheckBox";

interface ConfigurarNotificacoesProps {
  selectedUser: MongoUser;
  setSelectedUser: (user: MongoUser) => void;
  isOpen: boolean;
  onClose: () => void;
  fetchUsers: () => void;
}

export function ConfigurarNotificacoesModal({
  selectedUser,
  setSelectedUser,
  isOpen,
  onClose,
  fetchUsers,
}: ConfigurarNotificacoesProps) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="gray.600">
          <ModalHeader>Edit User Notifications</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <NotificacoesCheckBox
              mongoUser={selectedUser}
              setMongoUser={setSelectedUser}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
