import { Text } from "@chakra-ui/react";
import { NotAllowed } from "../components/misc/NotAllowed";
import { RelatorioVendas } from "../components/relatorioVendas/RelatorioVendas";
import { useAppContext } from "../context/AppContext";

export default function relatoriovendas() {
  const { mongoUser } = useAppContext();
  return mongoUser?.apps?.NOTIFICACOES ? <RelatorioVendas /> : <NotAllowed />;
}
