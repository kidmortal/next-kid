import { List, ListIcon, ListItem, Stack } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { MongoUser } from "../../models/mongoUser";

export function ListaUsuarios() {
  const [users, setUsers] = useState<MongoUser[]>([]);

  useEffect(() => {
    axios
      .post("/api/mongodb/usuarios", {
        call: "getAllUsers",
      })
      .then((response) => {
        setUsers(response.data);
      });
  }, []);

  return (
    <Stack>
      <List spacing={3}>
        {users?.map((user) => (
          <ListItem>
            {user.nome} - {user.email || "Sem email"}
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
