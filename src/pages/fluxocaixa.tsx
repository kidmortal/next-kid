import { Text } from "@chakra-ui/react";
import { FluxoCaixa } from "../components/fluxoCaixa/FluxoCaixa";
import { useAppContext } from "../context/AppContext";

export default function fluxocaixa() {
  const { mongoUser } = useAppContext();
  return mongoUser?.apps?.USUARIOS ? (
    <FluxoCaixa />
  ) : (
    <Text>Sem Permissao</Text>
  );
}
