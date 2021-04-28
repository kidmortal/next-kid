import { HStack, Text, Avatar } from "@chakra-ui/react";
import { useAppContext } from "../context/AppContext";

export function Profile() {
  const { user } = useAppContext();
  return (
    <HStack>
      <Avatar
        name={user ? user.givenName : "User"}
        src={
          user
            ? user.imageUrl
            : "https://cdn.discordapp.com/emojis/698680784911073285.png?v=1"
        }
      />
      <Text>{user ? user.givenName : "Sem Usuario"}</Text>
    </HStack>
  );
}
