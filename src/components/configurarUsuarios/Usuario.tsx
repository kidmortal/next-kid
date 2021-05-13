import { Box, Stack } from "@chakra-ui/layout";
import {
  AiOutlineAliwangwang,
  AiOutlineMail,
  AiOutlineMobile,
  AiOutlineUser,
} from "react-icons/ai";
import { MongoUser } from "../../models/mongoUser";
import { ButtonsUsuario } from "./ButtonsUsuario";
import { CampoLista } from "./CampoLista";

interface UsuarioProps {
  user: MongoUser;
  fetchUsers: () => void;
}

export function Usuario({ user, fetchUsers }: UsuarioProps) {
  return (
    <Stack padding={10}>
      <Box>
        <CampoLista icon={AiOutlineUser} name={"Usuario"} value={user.nome} />
        <CampoLista icon={AiOutlineMail} name={"Email"} value={user.email} />
        <CampoLista
          icon={AiOutlineMobile}
          name={"Celular"}
          value={user.celular}
        />
        <CampoLista
          icon={AiOutlineAliwangwang}
          name={"Chave"}
          value={user.callmebotKey}
        />
      </Box>
      <ButtonsUsuario fetchUsers={fetchUsers} user={user} />
    </Stack>
  );
}
