import { ChangeEvent, useEffect, useState } from "react";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLogout,
} from "react-google-login";
import { FaSignInAlt } from "react-icons/fa";
import { GoSignOut } from "react-icons/go";
import { useAppContext } from "../context/AppContext";

export function GoogleLoginButton() {
  const { user, setUser } = useAppContext();

  function googleLoginSuccess(response: GoogleLoginResponse) {
    console.log(response);
    if (response.profileObj) {
      setUser(response.profileObj);
    }
  }

  function googleLogoutSuccess() {
    setUser(null);
  }

  function googleLoginError(response: GoogleLoginResponse) {
    console.log(response);
  }

  if (user)
    return (
      <GoogleLogout
        style={{ backgroundColor: "#4A5568", color: "#4A5568" }}
        clientId="199765150861-i5tb6qamqsns207m42jd9iqrugra021n.apps.googleusercontent.com"
        onLogoutSuccess={googleLogoutSuccess}
      >
        <GoSignOut />
      </GoogleLogout>
    );

  if (!user)
    return (
      <GoogleLogin
        style={{ backgroundColor: "#4A5568", color: "#4A5568" }}
        clientId="199765150861-i5tb6qamqsns207m42jd9iqrugra021n.apps.googleusercontent.com"
        onSuccess={googleLoginSuccess}
        onFailure={googleLoginError}
        isSignedIn={true}
        cookiePolicy={"single_host_origin"}
      >
        <FaSignInAlt />
      </GoogleLogin>
    );
}
