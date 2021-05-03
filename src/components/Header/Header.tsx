import { HStack } from "@chakra-ui/layout";
import { SideMenu } from "../sideMenu/SideMenu";
import { GoogleLoginButton } from "./GoogleLoginButton";
import { Profile } from "./Profile";

export function Header() {
  return (
    <HStack justify="space-between" spacing={10}>
      <SideMenu />
      <Profile />
      <GoogleLoginButton />
    </HStack>
  );
}
