import {
  Box,
  Button,
  ButtonGroup,
  Icon,
  IconButton,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineMobile,
  AiOutlineAliwangwang,
  AiOutlineEdit,
} from "react-icons/ai";
import { MongoUser } from "../../models/mongoUser";
import { ButtonsUsuario } from "./ButtonsUsuario";
import { CampoLista } from "./CampoLista";
import { ConfigurarUsuarioModal } from "./ConfigurarUsuarioModal";

export function ListaUsuarios() {
  const [users, setUsers] = useState<MongoUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<MongoUser>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  function fetchUsers() {
    axios
      .post("/api/mongodb/usuarios", {
        call: "getAllUsers",
      })
      .then((response) => {
        setUsers(response.data);
      });
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Stack>
      <SimpleGrid columns={[1, 2, 3]} spacing="80px">
        {users.map((u) => (
          <Stack>
            <Box>
              <CampoLista
                icon={AiOutlineUser}
                name={"Usuario"}
                value={u.nome}
              />
              <CampoLista icon={AiOutlineMail} name={"Email"} value={u.email} />
              <CampoLista
                icon={AiOutlineMobile}
                name={"Celular"}
                value={u.celular}
              />
              <CampoLista
                icon={AiOutlineAliwangwang}
                name={"Chave"}
                value={u.callmebotKey}
              />
            </Box>
            <ButtonsUsuario
              fetchUsers={fetchUsers}
              user={u}
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
              isOpen={isOpen}
              onClose={onClose}
              onOpen={onOpen}
            />
          </Stack>
        ))}
      </SimpleGrid>
    </Stack>
  );
}
