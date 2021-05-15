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
import { signin, signIn, signOut, useSession } from "next-auth/client";
import { Stack } from "@chakra-ui/layout";

export function GoogleLoginButton() {
  const {
    googleUser,
    setGoogleUser,
    mongoUser,
    setMongoUser,
    setMongoEmpresa,
  } = useAppContext();
  const [session, loading] = useSession();

  useEffect(() => {
    console.log(session?.user?.name);
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
    let mongoEmpresa = await getMongoEmpresa(mongoUser.empresa);
    setMongoUser(mongoUser);
    setMongoEmpresa(mongoEmpresa);
  }

  async function googleLoginSuccess(response: GoogleLoginResponse) {
    let googleUser = response.profileObj;

    if (googleUser) {
      console.log(response.accessToken);
      let mongoUser = await getMongoUser(googleUser.email);
      let mongoEmpresa = await getMongoEmpresa(mongoUser.empresa);
      setMongoUser(mongoUser);
      setMongoEmpresa(mongoEmpresa);
    }
  }

  function googleLogoutSuccess() {
    setGoogleUser(null);
    setMongoUser(null);
    setMongoEmpresa(null);
  }

  function googleLoginError(response: GoogleLoginResponse) {
    console.log(response);
  }

  if (session)
    return (
      <Stack>
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
        {/*     <GoogleLogout
          buttonText=""
          style={{ backgroundColor: "#4A5568", color: "#4A5568" }}
          clientId="199765150861-i5tb6qamqsns207m42jd9iqrugra021n.apps.googleusercontent.com"
          onLogoutSuccess={googleLogoutSuccess}
          render={(renderProps) => (
            <Button
              leftIcon={<Icon as={FcGoogle} />}
              bg="gray.600"
              _hover={{ bg: "gray.500" }}
              _focus={{ border: "none", bg: "gray.500" }}
              variant="outline"
              onClick={renderProps.onClick}
            >
              Sign Out
            </Button>
          )}
          ></GoogleLogout> */}
      </Stack>
    );

  if (!session)
    return (
      <Stack>
        <Button
          leftIcon={<Icon as={FcGoogle} />}
          bg="gray.600"
          _hover={{ bg: "gray.500" }}
          _focus={{ border: "none" }}
          variant="outline"
          isLoading={loading}
          onClick={() => {
            signIn();
          }}
        >
          Sign In
        </Button>
        {/*   <GoogleLogin
          buttonText=""
          clientId="199765150861-i5tb6qamqsns207m42jd9iqrugra021n.apps.googleusercontent.com"
          onSuccess={googleLoginSuccess}
          onFailure={googleLoginError}
          isSignedIn={true}
          cookiePolicy={"single_host_origin"}
          render={(renderProps) => (
            <Button
              leftIcon={<Icon as={FcGoogle} />}
              bg="gray.600"
              _hover={{ bg: "gray.500" }}
              _focus={{ border: "none" }}
              variant="outline"
              onClick={renderProps.onClick}
            >
              Sign In
            </Button>
          )}
          ></GoogleLogin> */}
      </Stack>
    );
}
