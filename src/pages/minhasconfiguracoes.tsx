import { MinhasConfiguracoes } from "../components/minhasConfiguracoes/MinhasConfiguracoes";
import { NotAllowed } from "../components/misc/NotAllowed";
import { useAppContext } from "../context/AppContext";

export default function Notificacoes() {
  const { mongoUser } = useAppContext();
  return mongoUser?.apps?.NOTIFICACOES ? (
    <MinhasConfiguracoes />
  ) : (
    <NotAllowed />
  );
}
