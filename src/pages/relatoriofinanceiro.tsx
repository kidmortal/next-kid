import { Text } from "@chakra-ui/react";
import { RelatorioFinanceiro } from "../components/relatorioFinanceiro/RelatorioFinanceiro";
import { useAppContext } from "../context/AppContext";

export default function relatoriofinanceiro() {
  const { mongoUser } = useAppContext();
  return mongoUser?.apps?.RELATORIO_FINANCEIRO ? (
    <RelatorioFinanceiro />
  ) : (
    <Text>Sem Permissao</Text>
  );
}
