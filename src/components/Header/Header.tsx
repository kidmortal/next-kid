import { HStack } from "@chakra-ui/layout";
import { Profile } from "./Profile";
import { SideMenu } from "../sideMenu/SideMenu";
import { GoogleLoginButton } from "./GoogleLoginButton";

export function Header() {
  return (
    <HStack justify="space-between" spacing={10}>
      <SideMenu />
      <Profile />
      <GoogleLoginButton />
    </HStack>
  );
}
