import { HStack, Text, Avatar } from "@chakra-ui/react";
import { useSession } from "next-auth/client";
import { useAppContext } from "../../context/AppContext";

export function Profile() {
  const [session, loading] = useSession();
  return (
    <HStack>
      <Avatar
        name={session ? session.user?.name : "User"}
        src={
          session
            ? session?.user?.image
            : "https://cdn.discordapp.com/emojis/698680784911073285.png?v=1"
        }
      />
      <Text>{session ? session.user?.name : "Sem Usuario"}</Text>
    </HStack>
  );
}
