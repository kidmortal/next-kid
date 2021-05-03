import { Stack } from "@chakra-ui/react";
import { ChequeDevolvido } from "../components/chequeDevolvido/ChequeDevolvido";
import { Header } from "../components/header/Header";

export default function chequedevolvido() {
  return (
    <Stack align="center" spacing={2}>
      <Stack width={[350, 500, 700]}>
        <Header />
        <ChequeDevolvido />
      </Stack>
    </Stack>
  );
}
