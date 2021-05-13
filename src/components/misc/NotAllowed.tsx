import { Image } from "@chakra-ui/image";
import { Stack, Text } from "@chakra-ui/layout";

export function NotAllowed() {
  return (
    <Stack justifyItems="center" align="center" textAlign="center" spacing={6}>
      <Text fontSize="large" color="yellow.300">
        Opa, parece que voce nao tem permissao para acessar está pagina.
      </Text>
      <Text fontSize="large" color="yellow.300">
        Mas pode ficar avontade e comer um paozinho.
      </Text>
      <Image src="/dogebread.png" />
    </Stack>
  );
}
