import { ButtonGroup, Icon, IconButton, useToast } from "@chakra-ui/react";
import axios from "axios";
import { AiOutlineEdit } from "react-icons/ai";
import { RiWhatsappLine } from "react-icons/ri";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { MongoUser } from "../../models/mongoUser";
import { ConfigurarUsuarioModal } from "./ConfigurarUsuarioModal";

interface ButtonsUsuarioProps {
  user: MongoUser;
  selectedUser: MongoUser;
  setSelectedUser: (user: MongoUser) => void;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  fetchUsers: () => void;
}

export function ButtonsUsuario({
  user,
  selectedUser,
  setSelectedUser,
  isOpen,
  onClose,
  onOpen,
  fetchUsers,
}: ButtonsUsuarioProps) {
  const toast = useToast();
  function handleEditUser() {
    setSelectedUser(user);
    onOpen();
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
      <ConfigurarUsuarioModal
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        isOpen={isOpen}
        onClose={onClose}
        fetchUsers={fetchUsers}
      />
      <IconButton
        variant="solid"
        bg="green.400"
        _hover={{ bg: "green.300" }}
        _focus={{ border: "none" }}
        aria-label="Edit User"
        onClick={handleEditUser}
        icon={<Icon as={AiOutlineEdit} fontSize="x-large" />}
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
      <IconButton
        variant="solid"
        bg="pink.600"
        _hover={{ bg: "pink.500" }}
        _focus={{ border: "none" }}
        aria-label="Apps"
        onClick={handleSendMessage}
        icon={
          <Icon
            color="green.200"
            fontSize="x-large"
            as={AiOutlineAppstoreAdd}
          />
        }
      />
    </ButtonGroup>
  );
}
