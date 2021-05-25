import { HStack, Text, Avatar } from "@chakra-ui/react";
import { useSession } from "next-auth/client";
import { useAppContext } from "../../context/AppContext";

export function Profile() {
  const [session, loading] = useSession();
  return (
    <HStack>
      <Avatar
        id="userAvatar"
        name={session ? session.user?.name : "User"}
        src={
          session
            ? session?.user?.image
            : "https://cdn.discordapp.com/emojis/763060140567691324.png?v=1"
        }
      />
      <Text>{session ? session.user?.name : "Sem Usuario"}</Text>
    </HStack>
  );
}
