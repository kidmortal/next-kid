import { BaixarContas } from "../components/baixarContas/BaixarContas";
import { NotAllowed } from "../components/misc/NotAllowed";
import { useAppContext } from "../context/AppContext";

export default function baixarcontas() {
  const { mongoUser } = useAppContext();
  return mongoUser?.apps?.BAIXAR_CONTAS ? <BaixarContas /> : <NotAllowed />;
}
