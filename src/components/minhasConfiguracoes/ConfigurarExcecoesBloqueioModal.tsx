import {
  Input,
  IconButton,
  List,
  ListItem,
  Stack,
  HStack,
  useToast,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Icon,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { useAppContext } from "../../context/AppContext";
import { useState } from "react";
import axios from "axios";
import { MongoUser } from "../../models/mongoUser";
import { FiBox } from "react-icons/fi";
import { RiForbidLine } from "react-icons/ri";
import { ConfigurarExcecoesBloqueio } from "./ConfigurarExcecoesBloqueio";

interface ConfigurarExcecoesBloqueioModalProps {
  mongoUser: MongoUser;
  fetchUsers: () => void;
}

export function ConfigurarExcecoesBloqueioModal({
  mongoUser,
  fetchUsers,
}: ConfigurarExcecoesBloqueioModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        variant="solid"
        bg="red.400"
        _hover={{ bg: "red.300" }}
        _focus={{ border: "none" }}
        aria-label="Edit User"
        onClick={onOpen}
        icon={<Icon as={RiForbidLine} fontSize="x-large" />}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="gray.600">
          <ModalHeader>
            Adicionar Pedidos exceções (Não serão bloqueados mesmo com
            pendencia)
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <ConfigurarExcecoesBloqueio
              mongoUser={mongoUser}
              fetchUsers={fetchUsers}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
