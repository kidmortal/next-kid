import { HStack, Text, Avatar } from "@chakra-ui/react";
import { useAppContext } from "../../context/AppContext";

export function Profile() {
  const { googleUser } = useAppContext();
  return (
    <HStack>
      <Avatar
        name={googleUser ? googleUser.givenName : "User"}
        src={
          googleUser
            ? googleUser.imageUrl
            : "https://cdn.discordapp.com/emojis/698680784911073285.png?v=1"
        }
      />
      <Text>{googleUser ? googleUser.givenName : "Sem Usuario"}</Text>
    </HStack>
  );
}
