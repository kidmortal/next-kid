import { Button, ButtonProps } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLogout,
} from "react-google-login";
import { FcGoogle } from "react-icons/fc";
import { useAppContext } from "../../context/AppContext";
import { MongoEmpresa } from "../../models/mongoEmpresa";
import { MongoUser } from "../../models/mongoUser";
import {
  getProviders,
  signin,
  signIn,
  signOut,
  useSession,
} from "next-auth/client";
import { Stack } from "@chakra-ui/layout";
import { toast, useToast } from "@chakra-ui/toast";

export function GoogleLoginButton() {
  const {
    googleUser,
    setGoogleUser,
    mongoUser,
    setMongoUser,
    setMongoEmpresa,
  } = useAppContext();
  const [session, loading] = useSession();
  const toast = useToast();

  useEffect(() => {
    if (session && !mongoUser) {
      SignInSuccess();
    }
  }, [session]);

  async function getMongoUser(email: string) {
    let call = "getOneUser";
    let { data } = await axios.post<MongoUser>(`/api/mongodb/usuarios`, {
      call,
      props: { email },
    });

    return data;
  }

  async function getMongoEmpresa(nome: string) {
    let { data } = await axios.post<MongoEmpresa>(`/api/mongodb/empresas`, {
      call: "getEmpresa",
      props: { nome },
    });
    return data;
  }

  async function SignInSuccess() {
    let mongoUser = await getMongoUser(session?.user?.email);
    if (!mongoUser) return signOut();
    let mongoEmpresa = await getMongoEmpresa(mongoUser.empresa);
    setMongoUser(mongoUser);
    setMongoEmpresa(mongoEmpresa);
  }

  if (session)
    return (
      <Button
        leftIcon={<Icon as={FcGoogle} />}
        bg="gray.600"
        _hover={{ bg: "gray.500" }}
        _focus={{ border: "none", bg: "gray.500" }}
        variant="outline"
        isLoading={loading}
        onClick={() => {
          signOut();
        }}
      >
        Sign Out
      </Button>
    );

  if (!session)
    return (
      <Button
        leftIcon={<Icon as={FcGoogle} />}
        bg="gray.600"
        _hover={{ bg: "gray.500" }}
        _focus={{ border: "none" }}
        variant="outline"
        isLoading={loading}
        onClick={() => {
          signIn("google");
        }}
      >
        Sign In
      </Button>
    );
}
