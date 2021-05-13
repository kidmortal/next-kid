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
import { ConfigurarInformacoesModal } from "../minhasConfiguracoes/ConfigurarInformacoesModal";
import { ConfigurarNotificacoesModal } from "../minhasConfiguracoes/ConfigurarNotificacoesModal";
import { ConfigurarAppsModal } from "./ConfigurarAppsModal";
import { SendWhatsAppMessage } from "../misc/SendWhatsAppMessage";
import { ConfigurarSeparadoModal } from "../minhasConfiguracoes/ConfigurarSeparadoModal";

interface ButtonsUsuarioProps {
  user: MongoUser;
  fetchUsers: () => void;
}

export function ButtonsUsuario({ user, fetchUsers }: ButtonsUsuarioProps) {
  return (
    <ButtonGroup>
      <ConfigurarInformacoesModal mongoUser={user} fetchUsers={fetchUsers} />
      <ConfigurarAppsModal mongoUser={user} fetchUsers={fetchUsers} />
      <ConfigurarNotificacoesModal mongoUser={user} fetchUsers={fetchUsers} />
      <ConfigurarSeparadoModal mongoUser={user} fetchUsers={fetchUsers} />
      <SendWhatsAppMessage user={user} />
    </ButtonGroup>
  );
}
