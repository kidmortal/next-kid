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
  function formatCurrency(value) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <Stack align="center" spacing={2}>
      <HStack spacing={10}>
        <SideMenu />
        <Profile />
        <GoogleLoginButton />
      </HStack>
      {user?.email === "deiascully@gmail.com" ? (
        <BaixarContaAReceberForm />
      ) : (
        <Tag>Voce nao pode 😂😂😂</Tag>
      )}
    </Stack>
  );
}
