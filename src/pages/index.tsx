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
import { AppContextProvider, useAppContext } from "../context/AppContext";
import { GoogleLoginButton } from "../components/GoogleLoginButton";
import { SideMenu } from "../components/SideMenu";
import { BaixarContaAReceberForm } from "../components/BaixarContaAReceberForm";

export default function Home() {
  const { user, setUser } = useAppContext();
  function formatCurrency(value) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }

  function auth() {
    if (user) {
      return user.email === "deiascully@gmail.com" ? (
        <BaixarContaAReceberForm />
      ) : (
        <Text>Voce n pode 😂😂</Text>
      );
    } else {
      <Text>Faz login 👀🤔</Text>;
    }
  }

  return (
    <AppContextProvider>
      <Stack align="center" spacing={2}>
        <HStack spacing={10}>
          <SideMenu />
          <Profile />
          <GoogleLoginButton />
        </HStack>
        {auth()}
      </Stack>
    </AppContextProvider>
  );
}
