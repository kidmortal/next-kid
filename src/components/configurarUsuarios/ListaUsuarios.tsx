import { Box, SimpleGrid, Stack, Text, useDisclosure } from "@chakra-ui/react";
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

export function ListaUsuarios() {
  const [users, setUsers] = useState<MongoUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<MongoUser>();

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
      <SimpleGrid columns={[1, 1, 2]}>
        {users.map((u) => (
          <Stack padding={10}>
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
            />
          </Stack>
        ))}
      </SimpleGrid>
    </Stack>
  );
}
