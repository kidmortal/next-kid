import { Text } from "@chakra-ui/react";
import { RelatorioVendas } from "../components/relatorioVendas/RelatorioVendas";
import { useAppContext } from "../context/AppContext";

export default function relatoriovendas() {
  const { mongoUser } = useAppContext();
  return mongoUser?.apps?.RELATORIO_FINANCEIRO ? (
    <RelatorioVendas />
  ) : (
    <Text>Sem Permissao</Text>
  );
}
