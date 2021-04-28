import { useState, ReactNode, useContext } from "react";
import { createContext } from "react";

export type GoogleUser = {
  googleId: string;
  imageUrl: string;
  email: string;
  name: string;
  givenName: string;
  familyName: string;
};

export type baixaResponse = {
  codigo_lancamento: number;
  codigo_lancamento_integracao: string;
  codigo_baixa: number;
  codigo_baixa_integracao: string;
  liquidado: string;
  valor_baixado: number;
  codigo_status: string;
  descricao_status: string;
  faultstring: string;
};

export type BaixaProps = {
  nota_fiscal: string;
  data_baixa: string;
  codigo_lancamento: number;
  codigo_baixa: number;
  liquidado: string;
  valor_baixado: number;
};

type appContextType = {
  user: GoogleUser;
  setUser: (user: GoogleUser) => void;
  baixas: BaixaProps[];
  setBaixas: (baixas: BaixaProps[]) => void;
};

const appContextDefaultValues: appContextType = {
  user: null,
  setUser: () => {},
  baixas: null,
  setBaixas: () => {},
};

interface Props {
  children: ReactNode;
}

const AppContext = createContext<appContextType>(appContextDefaultValues);

export function AppContextProvider({ children }: Props) {
  const [user, setUser] = useState<GoogleUser>();
  const [baixas, setBaixas] = useState<BaixaProps[]>([]);
  const value = {
    user,
    setUser,
    baixas,
    setBaixas,
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
