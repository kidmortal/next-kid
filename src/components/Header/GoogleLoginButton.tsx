import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLogout,
} from "react-google-login";
import { useAppContext } from "../../context/AppContext";

export function GoogleLoginButton() {
  const { googleUser, setGoogleUser, setMongoUser } = useAppContext();

  async function getMongoUser(email: string) {
    let { data } = await axios.get(`/api/mongodb/usuarios?email=${email}`);
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
      ></GoogleLogout>
    );

  if (!googleUser)
    return (
      <GoogleLogin
        buttonText=""
        style={{ backgroundColor: "#4A5568", color: "#4A5568" }}
        clientId="199765150861-i5tb6qamqsns207m42jd9iqrugra021n.apps.googleusercontent.com"
        onSuccess={googleLoginSuccess}
        onFailure={googleLoginError}
        isSignedIn={true}
        cookiePolicy={"single_host_origin"}
      ></GoogleLogin>
    );
}
