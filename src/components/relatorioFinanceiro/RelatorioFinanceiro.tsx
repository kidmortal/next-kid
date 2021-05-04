import { Stack, Text } from "@chakra-ui/react";
import { RelatorioFinanceiroContextProvider } from "../../context/RelatorioFinanceiroContext";
import { ButtonGroup } from "./ButtonGroup";
import { GraficoBoletos } from "./GraficoBoletos";

export function RelatorioFinanceiro() {
  return (
    <Stack justify="center" align="center">
      <RelatorioFinanceiroContextProvider>
        <ButtonGroup />
        <GraficoBoletos />
      </RelatorioFinanceiroContextProvider>
    </Stack>
  );
}
