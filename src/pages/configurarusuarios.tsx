import { Text } from "@chakra-ui/layout";
import { ConfigurarUsuarios } from "../components/configurarUsuarios/ConfigurarUsuarios";
import { NotAllowed } from "../components/misc/NotAllowed";
import { useAppContext } from "../context/AppContext";

export default function configurarusuarios() {
  const { mongoUser } = useAppContext();
  return mongoUser?.apps?.FUNCOES_ADMINISTRATIVAS ? (
    <ConfigurarUsuarios />
  ) : (
    <NotAllowed />
  );
}
