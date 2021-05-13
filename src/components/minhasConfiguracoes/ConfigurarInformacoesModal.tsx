import {
  Button,
  FormControl,
  FormLabel,
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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MongoUser } from "../../models/mongoUser";
import { ConfigurarInformacoes } from "./ConfigurarInformacoes";

interface ConfigurarInformacoesProps {
  mongoUser: MongoUser;
  fetchUsers: () => void;
}

export function ConfigurarInformacoesModal({
  mongoUser,
  fetchUsers,
}: ConfigurarInformacoesProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        variant="solid"
        bg="green.400"
        _hover={{ bg: "green.300" }}
        _focus={{ border: "none" }}
        aria-label="Edit User"
        onClick={onOpen}
        icon={<Icon as={AiOutlineEdit} fontSize="x-large" />}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="gray.600">
          <ModalHeader>Edit User Informations</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <ConfigurarInformacoes
              mongoUser={mongoUser}
              fetchUsers={fetchUsers}
              onClose={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
