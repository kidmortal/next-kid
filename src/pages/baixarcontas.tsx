import { Tag, Stack, HStack } from "@chakra-ui/react";
import { BaixarContasApp } from "../components/BaixarContasApp/BaixarContasApp";
import { Header } from "../components/Header/Header";

export default function BaixarContas() {
  return (
    <Stack align="center" spacing={2}>
      <Stack width={[350, 500, 700]}>
        <Header />
        <BaixarContasApp />
      </Stack>
    </Stack>
  );
}
