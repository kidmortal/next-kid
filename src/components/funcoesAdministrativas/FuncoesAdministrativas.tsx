import { Stack, Text } from "@chakra-ui/react";
import { AtualizarContas } from "./AtualizarContas";
import { ConfiguracoesEmpresa } from "./ConfiguracoesEmpresa";

export function FuncoesAdministrativas() {
  return (
    <Stack justify="center" align="center">
      <ConfiguracoesEmpresa />
      <AtualizarContas />
    </Stack>
  );
}
