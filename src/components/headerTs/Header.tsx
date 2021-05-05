import { HStack } from "@chakra-ui/layout";
import { Profile } from "./Profile";
import { GoogleLoginButton } from "./GoogleLoginButton";
import { SideMenu } from "../sideMenu/SideMenu";

export function Header() {
  return (
    <HStack justify="space-between" spacing={10}>
      <SideMenu />
      <Profile />
      <GoogleLoginButton />
    </HStack>
  );
}
