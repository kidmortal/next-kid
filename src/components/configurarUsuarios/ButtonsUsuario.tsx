import {
  ButtonGroup,
  Icon,
  IconButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { AiOutlineEdit } from "react-icons/ai";
import { RiWhatsappLine } from "react-icons/ri";
import { AiOutlineAppstoreAdd, AiOutlineClockCircle } from "react-icons/ai";
import { MongoUser } from "../../models/mongoUser";
import { ConfigurarInformacoesModal } from "./ConfigurarInformacoesModal";
import { ConfigurarNotificacoesModal } from "./ConfigurarNotificacoesModal";
import { ConfigurarAppsModal } from "./ConfigurarAppsModal";

interface ButtonsUsuarioProps {
  user: MongoUser;
  selectedUser: MongoUser;
  setSelectedUser: (user: MongoUser) => void;
  fetchUsers: () => void;
}

export function ButtonsUsuario({
  user,
  selectedUser,
  setSelectedUser,
  fetchUsers,
}: ButtonsUsuarioProps) {
  const {
    isOpen: isOpenInfo,
    onOpen: onOpenInfo,
    onClose: onCloseInfo,
  } = useDisclosure();
  const {
    isOpen: isOpenApps,
    onOpen: onOpenApps,
    onClose: onCloseApps,
  } = useDisclosure();
  const {
    isOpen: isOpenNotif,
    onOpen: onOpenNotif,
    onClose: onCloseNotif,
  } = useDisclosure();
  const toast = useToast();
  function handleEditUserInfo() {
    setSelectedUser(user);
    onOpenInfo();
  }
  function handleEditUserNotif() {
    setSelectedUser(user);
    onOpenNotif();
  }
  function handleEditUserApps() {
    setSelectedUser(user);
    onOpenApps();
  }
  async function handleSendMessage() {
    let message = `Mensagem no zap zap 😂👌`;
    let messageEncoded = encodeURI(message);
    fetch(
      `https://api.callmebot.com/whatsapp.php?phone=${user.celular}&text=${messageEncoded}&apikey=${user.callmebotKey}`,
      { mode: "no-cors" }
    ).then((response) => {
      toast({
        title: "Mensagem enviada",
        description: `Enviado zap para ${user.nome}`,
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    });
  }

  return (
    <ButtonGroup>
      <ConfigurarInformacoesModal
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        isOpen={isOpenInfo}
        onClose={onCloseInfo}
        fetchUsers={fetchUsers}
      />
      <ConfigurarNotificacoesModal
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        isOpen={isOpenNotif}
        onClose={onCloseNotif}
        fetchUsers={fetchUsers}
      />
      <ConfigurarAppsModal
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        isOpen={isOpenApps}
        onClose={onCloseApps}
        fetchUsers={fetchUsers}
      />
      <IconButton
        variant="solid"
        bg="green.400"
        _hover={{ bg: "green.300" }}
        _focus={{ border: "none" }}
        aria-label="Edit User"
        onClick={handleEditUserInfo}
        icon={<Icon as={AiOutlineEdit} fontSize="x-large" />}
      />
      <IconButton
        variant="solid"
        bg="pink.600"
        _hover={{ bg: "pink.500" }}
        _focus={{ border: "none" }}
        aria-label="Apps"
        onClick={handleEditUserApps}
        icon={
          <Icon
            color="green.200"
            fontSize="x-large"
            as={AiOutlineAppstoreAdd}
          />
        }
      />
      <IconButton
        variant="solid"
        bg="yellow.600"
        _hover={{ bg: "yellow.500" }}
        _focus={{ border: "none" }}
        aria-label="Manage Notifs"
        onClick={handleEditUserNotif}
        icon={
          <Icon
            color="green.200"
            fontSize="x-large"
            as={AiOutlineClockCircle}
          />
        }
      />
      <IconButton
        variant="solid"
        bg="blue.600"
        _hover={{ bg: "blue.500" }}
        _focus={{ border: "none" }}
        aria-label="Send Message"
        onClick={handleSendMessage}
        icon={<Icon color="green.200" fontSize="x-large" as={RiWhatsappLine} />}
      />
    </ButtonGroup>
  );
}
