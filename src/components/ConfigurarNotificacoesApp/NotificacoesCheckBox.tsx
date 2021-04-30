import { Checkbox } from "@chakra-ui/checkbox";
import { Stack } from "@chakra-ui/layout";
import { useState } from "react";
import { useAppContext } from "../../context/AppContext";

export function NotificacoesCheckBox() {
  const { mongoUser } = useAppContext();
  const [checkedItems, setCheckedItems] = useState([false, false, false]);

  return (
    <Stack pl={6} mt={1} spacing={1}>
      <Checkbox
        isChecked={mongoUser?.notificar?.DATA_INCORRETA}
        onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1]])}
      >
        Pedido Concluido sem Data de Saida
      </Checkbox>
      <Checkbox
        isChecked={mongoUser?.notificar?.SEM_CONDICAO}
        onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked])}
      >
        Pedido Concluido sem Condição de pagamento
      </Checkbox>
      <Checkbox
        isChecked={mongoUser?.notificar?.RELATORIO_DIARIO}
        onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked])}
      >
        Relatorio Diario
      </Checkbox>
    </Stack>
  );
}
