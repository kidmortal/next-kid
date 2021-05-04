import { Text } from "@chakra-ui/react";
import { FuncoesAdministrativas } from "../components/funcoesAdministrativas/FuncoesAdministrativas";
import { useAppContext } from "../context/AppContext";

export default function funcoesadministrativas() {
  const { mongoUser } = useAppContext();
  return mongoUser?.apps?.FUNCOES_ADMINISTRATIVAS ? (
    <FuncoesAdministrativas />
  ) : (
    <Text>Sem Permissao</Text>
  );
}
