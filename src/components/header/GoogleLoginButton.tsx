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

export function GoogleLoginButton() {
  const { googleUser, setGoogleUser, setMongoUser } = useAppContext();

  async function getMongoUser(email: string) {
    let call = "getUserByEmail";
    let { data } = await axios.post(`/api/mongodb/usuarios`, {
      call,
      email,
    });
    return data;
  }

  async function googleLoginSuccess(response: GoogleLoginResponse) {
    let googleUser = response.profileObj;

    if (googleUser) {
      let mongoUser = await getMongoUser(googleUser.email);
      setGoogleUser(googleUser);
      setMongoUser(mongoUser);

      console.log(googleUser);
      console.log(mongoUser);
    }
  }

  function googleLogoutSuccess() {
    setGoogleUser(null);
    setMongoUser(null);
  }

  function googleLoginError(response: GoogleLoginResponse) {
    console.log(response);
  }

  if (googleUser)
    return (
      <GoogleLogout
        buttonText=""
        style={{ backgroundColor: "#4A5568", color: "#4A5568" }}
        clientId="199765150861-i5tb6qamqsns207m42jd9iqrugra021n.apps.googleusercontent.com"
        onLogoutSuccess={googleLogoutSuccess}
        render={(renderProps) => (
          <Button
            leftIcon={<Icon as={FcGoogle} />}
            bg="gray.600"
            _hover={{ bg: "gray.500" }}
            _focus={{ border: "none" }}
            variant="outline"
            onClick={renderProps.onClick}
          >
            Sign Out
          </Button>
        )}
      ></GoogleLogout>
    );

  if (!googleUser)
    return (
      <GoogleLogin
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
      ></GoogleLogin>
    );
}
