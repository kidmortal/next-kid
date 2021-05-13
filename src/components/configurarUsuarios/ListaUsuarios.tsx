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
import { Usuario } from "./Usuario";

export function ListaUsuarios() {
  const [users, setUsers] = useState<MongoUser[]>([]);

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
          <Usuario user={u} fetchUsers={fetchUsers} />
        ))}
      </SimpleGrid>
    </Stack>
  );
}
