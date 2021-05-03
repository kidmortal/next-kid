import {
  Box,
  Button,
  Icon,
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
import { ConfigurarUsuarioModal } from "./ConfigurarUsuarioModal";

export function ListaUsuarios() {
  const [users, setUsers] = useState<MongoUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<MongoUser>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    axios
      .post("/api/mongodb/usuarios", {
        call: "getAllUsers",
      })
      .then((response) => {
        setUsers(response.data);
      });
  }, []);

  function handleEditUser(user: MongoUser) {
    setSelectedUser(user);
    onOpen();
  }

  return (
    <Stack>
      <ConfigurarUsuarioModal
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        isOpen={isOpen}
        onClose={onClose}
      />
      <SimpleGrid columns={[1, 2, 3]} spacing="80px">
        {users.map((u) => (
          <Box>
            <Stack>
              <Box minW="250">
                <Text>
                  <Icon as={AiOutlineUser} />
                  Usuario: {u.nome || "Sem nome"}
                </Text>
                <Text>
                  <Icon as={AiOutlineMail} />
                  Email: {u.email || "Sem Email"}
                </Text>
                <Text>
                  <Icon as={AiOutlineMobile} />
                  Celular: {u.celular || "Sem Celular"}
                </Text>
                <Text>
                  <Icon as={AiOutlineAliwangwang} />
                  Callmebot Key: {u.callmebotKey || "Sem chave"}
                </Text>
              </Box>
              <Button
                _hover={{ bg: "gray.500" }}
                variant="outline"
                size="sm"
                leftIcon={<Icon as={AiOutlineEdit} />}
                onClick={() => {
                  handleEditUser(u);
                }}
              >
                Editar
              </Button>
            </Stack>
          </Box>
        ))}
      </SimpleGrid>
    </Stack>
  );
}
