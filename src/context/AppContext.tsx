import { useState, ReactNode, useContext, useEffect } from "react";
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
  addBaixa: (baixa: BaixaProps) => void;
  removeBaixa: (baixa: BaixaProps) => void;
  setBaixas: (baixa: BaixaProps[]) => void;
};

const appContextDefaultValues: appContextType = {
  user: null,
  setUser: () => {},
  baixas: null,
  addBaixa: () => {},
  removeBaixa: () => {},
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
    addBaixa,
    removeBaixa,
    setBaixas,
  };

  useEffect(() => {
    let baixas = JSON.parse(
      localStorage.getItem("@next-kid:baixas")
    ) as BaixaProps[];
    if (baixas) setBaixas(baixas);
  }, []);

  useEffect(() => {
    localStorage.setItem("@next-kid:baixas", JSON.stringify(baixas));
  }, [baixas]);

  function addBaixa(baixa: BaixaProps) {
    let newBaixas = [...baixas];
    newBaixas.push(baixa);
    setBaixas(newBaixas);
    console.log(baixas);
  }

  function removeBaixa(baixa: BaixaProps) {
    setBaixas([
      ...baixas.filter((e) => {
        return e.codigo_baixa !== baixa.codigo_baixa;
      }),
    ]);
  }

  return (
    <>
      <AppContext.Provider value={value}>{children}</AppContext.Provider>
    </>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
