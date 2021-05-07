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
  const toast = useToast();

  async function toastNotify(success: boolean) {
    if (success) {
      toast({
        title: "Cadastrado Notificacao",
        status: "success",
        description: "Sem data",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } else {
      toast({
        title: "Erro",
        status: "error",
        description: "Sem data",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  }

  async function handleRelatorioDiario() {
    let active = !selectedUser?.notificar.RELATORIO_DIARIO;
    let response = await axios.post("/api/mongodb/usuarios", {
      call: "relatorioDiarioNotification",
      email: selectedUser?.email,
      active,
    });
    toastNotify(response.data);
    if (response.data) {
      let newMongoUser: MongoUser = {
        ...selectedUser,
      };
      newMongoUser.notificar.RELATORIO_DIARIO = active;
      setSelectedUser(newMongoUser);
    }
  }
  async function handleSemData() {
    let active = !selectedUser?.notificar.DATA_INCORRETA;
    let response = await axios.post("/api/mongodb/usuarios", {
      call: "pedidoSemDataNotification",
      email: selectedUser?.email,
      active,
    });
    toastNotify(response.data);
    if (response.data) {
      let newMongoUser: MongoUser = {
        ...selectedUser,
      };
      newMongoUser.notificar.DATA_INCORRETA = active;
      setSelectedUser(newMongoUser);
    }
  }
  async function handleSemCodicao() {
    let active = !selectedUser?.notificar.SEM_CONDICAO;
    let response = await axios.post("/api/mongodb/usuarios", {
      call: "pedidoSemCondicaoNotification",
      email: selectedUser?.email,
      active,
    });
    toastNotify(response.data);
    if (response.data) {
      let newMongoUser: MongoUser = {
        ...selectedUser,
      };
      newMongoUser.notificar.SEM_CONDICAO = active;
      setSelectedUser(newMongoUser);
    }
  }

  async function handleComPendencia() {
    let active = !selectedUser?.notificar.CLIENTE_COM_PENDENCIA;
    let response = await axios.post("/api/mongodb/usuarios", {
      call: "pedidoSemCondicaoNotification",
      email: selectedUser?.email,
      active,
    });
    toastNotify(response.data);
    if (response.data) {
      let newMongoUser: MongoUser = {
        ...selectedUser,
      };
      newMongoUser.notificar.CLIENTE_COM_PENDENCIA = active;
      setSelectedUser(newMongoUser);
    }
  }
  async function handleErroSuspeito() {
    let active = !selectedUser?.notificar.ERRO_SUSPEITO;
    let response = await axios.post("/api/mongodb/usuarios", {
      call: "pedidoSemCondicaoNotification",
      email: selectedUser?.email,
      active,
    });
    toastNotify(response.data);
    if (response.data) {
      let newMongoUser: MongoUser = {
        ...selectedUser,
      };
      newMongoUser.notificar.ERRO_SUSPEITO = active;
      setSelectedUser(newMongoUser);
    }
  }

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
