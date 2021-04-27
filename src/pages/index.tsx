import { ChangeEvent, useEffect, useState } from "react";
import { MdCheckCircle, MdError } from "react-icons/md";
import {
  Button,
  Input,
  Container,
  List,
  ListItem,
  ListIcon,
  Tag,
  Stack,
  VStack,
  Box,
  HStack,
  Checkbox,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Profile } from "../components/Profile";
import { GoogleLoginButton } from "../components/GoogleLoginButton";
import { SideMenu } from "../components/SideMenu";
import { BaixarContaAReceberForm } from "../components/BaixarContaAReceberForm";
import { useAppContext } from "../context/AppContext";

export default function Home() {
  const { user, setUser } = useAppContext();
  let allowedEmails = ["kidmortal@gmail.com", "deiascully@gmail.com"];
  function formatCurrency(value) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }

  useEffect(() => {
    console.log(user);
  }, [user]);

  function auth() {
    if (allowedEmails.includes(user?.email)) return <BaixarContaAReceberForm />;
    else
      return <Tag justifyContent="center">Voce num tem permissione 😂😂👌</Tag>;
  }

  return (
    <Stack align="center" spacing={2}>
      <Stack width={[200, 300, 400, 600]}>
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
