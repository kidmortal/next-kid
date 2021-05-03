import { ButtonGroup, Icon, IconButton, useToast } from "@chakra-ui/react";
import { AiOutlineEdit } from "react-icons/ai";
import { RiWhatsappLine } from "react-icons/ri";
import { MongoUser } from "../../models/mongoUser";
import { ConfigurarUsuarioModal } from "./ConfigurarUsuarioModal";

interface ButtonsUsuarioProps {
  user: MongoUser;
  selectedUser: MongoUser;
  setSelectedUser: (user: MongoUser) => void;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export function ButtonsUsuario({
  user,
  selectedUser,
  setSelectedUser,
  isOpen,
  onClose,
  onOpen,
}: ButtonsUsuarioProps) {
  function handleEditUser() {
    setSelectedUser(user);
    onOpen();
  }
  function handleSendMessage() {
    alert("fiz n bixo");
  }

  return (
    <ButtonGroup>
      <ConfigurarUsuarioModal
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        isOpen={isOpen}
        onClose={onClose}
      />
      <IconButton
        variant="solid"
        bg="green.400"
        _hover={{ bg: "green.300" }}
        aria-label="Edit User"
        icon={
          <Icon
            as={AiOutlineEdit}
            fontSize="x-large"
            onClick={handleEditUser}
          />
        }
      />
      <IconButton
        variant="solid"
        bg="blue.600"
        _hover={{ bg: "blue.500" }}
        aria-label="Send Message"
        icon={
          <Icon
            color="green.200"
            fontSize="x-large"
            as={RiWhatsappLine}
            onClick={handleSendMessage}
          />
        }
      />
    </ButtonGroup>
  );
}
