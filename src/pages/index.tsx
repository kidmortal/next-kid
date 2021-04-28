import { Tag, Stack, HStack } from "@chakra-ui/react";
import { Profile } from "../components/Profile";
import { GoogleLoginButton } from "../components/GoogleLoginButton";
import { SideMenu } from "../components/SideMenu";
import { BaixarContaAReceberForm } from "../components/BaixarContasApp/BaixarContaAReceberForm";
import { useAppContext } from "../context/AppContext";

export default function Home() {
  const { user, setUser } = useAppContext();
  let allowedEmails = ["kidmortal@gmail.com", "deiascully@gmail.com"];

  function auth() {
    if (allowedEmails.includes(user?.email)) return <BaixarContaAReceberForm />;
    else
      return <Tag justifyContent="center">Voce num tem permissione 😂😂👌</Tag>;
  }

  return (
    <Stack align="center" spacing={2}>
      <Stack width={[200, 500, 700]}>
        <HStack justify="space-between" spacing={10}>
          <SideMenu />
          <Profile />
          <GoogleLoginButton />
        </HStack>
        {auth()}
      </Stack>
    </Stack>
  );
}
