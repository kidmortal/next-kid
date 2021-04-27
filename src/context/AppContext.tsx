import { useState, ReactNode, useContext } from "react";
import { createContext } from "react";

type GoogleUser = {
  googleId: string;
  imageUrl: string;
  email: string;
  name: string;
  givenName: string;
  familyName: string;
};

type appContextType = {
  user: GoogleUser;
  setUser: (user: GoogleUser) => void;
};

const appContextDefaultValues: appContextType = {
  user: null,
  setUser: () => {},
};

interface Props {
  children: ReactNode;
}

const AppContext = createContext<appContextType>(appContextDefaultValues);

export function AppContextProvider({ children }: Props) {
  const [user, setUser] = useState<GoogleUser>();
  const value = {
    user,
    setUser,
  };
  return (
    <>
      <AppContext.Provider value={value}>{children}</AppContext.Provider>
    </>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
