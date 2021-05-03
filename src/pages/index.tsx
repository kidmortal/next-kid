import { Tag, Stack, HStack } from "@chakra-ui/react";
import { Header } from "../components/Header/Header";

export default function Home() {
  return (
    <Stack align="center" spacing={2}>
      <Stack width={[350, 500, 700]}>
        <Header />
      </Stack>
    </Stack>
  );
}
