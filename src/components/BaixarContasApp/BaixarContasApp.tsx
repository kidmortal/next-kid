import { Tag } from "@chakra-ui/tag";
import { useAppContext } from "../../context/AppContext";
import { BaixarContaAReceberForm } from "./BaixarContaAReceberForm";

export function BaixarContasApp() {
  const { mongoUser } = useAppContext();
  return mongoUser?.apps.BAIXAR_CONTAS ? (
    <BaixarContaAReceberForm />
  ) : (
    <Tag justifyContent="center">Voce num tem permissione 😂😂👌</Tag>
  );
}
