import { Stack, Text } from "@chakra-ui/react";
import { Requisicoes } from "./Requisicoes";
import { ConfiguracoesEmpresa } from "./ConfiguracoesEmpresa";

export function FuncoesAdministrativas() {
  return (
    <Stack justify="center" align="center">
      <ConfiguracoesEmpresa />
      <Requisicoes />
    </Stack>
  );
}
