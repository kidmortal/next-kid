import { Stack, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/client";

export default function Home() {
  const [session, loading] = useSession();
  return (
    <Stack justify="center" align="center">
      {session ? (
        <Text fontSize="large" color="yellow.300">
          Acesse os aplicativos no menu da esquerda
        </Text>
      ) : (
        <Text fontSize="large" color="yellow.300">
          Faça login para desbloquear os aplicativos
        </Text>
      )}
    </Stack>
  );
}
