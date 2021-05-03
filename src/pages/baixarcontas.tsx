import { Tag, Stack, HStack } from "@chakra-ui/react";
import { BaixarContas } from "../components/baixarContas/BaixarContas";
import { Header } from "../components/Header/Header";

export default function baixarcontas() {
  return (
    <Stack align="center" spacing={2}>
      <Stack width={[350, 500, 700]}>
        <Header />
        <BaixarContas />
      </Stack>
    </Stack>
  );
}
