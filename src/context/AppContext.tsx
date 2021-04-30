import { useState, ReactNode, useContext, useEffect } from "react";
import { createContext } from "react";
import { GoogleUser } from "../models/googleUser";
import { MongoUser } from "../models/mongoUser";

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
  loading?: boolean;
};

type appContextType = {
  googleUser: GoogleUser;
  setGoogleUser: (user: GoogleUser) => void;
  mongoUser: MongoUser;
  setMongoUser: (user: MongoUser) => void;
  baixas: BaixaProps[];
  addBaixa: (baixa: BaixaProps) => void;
  removeBaixa: (baixa: BaixaProps) => void;
  setBaixas: (baixa: BaixaProps[]) => void;
};

const appContextDefaultValues: appContextType = {
  googleUser: null,
  setGoogleUser: () => {},
  mongoUser: null,
  setMongoUser: () => {},
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
  const [googleUser, setGoogleUser] = useState<GoogleUser>();
  const [mongoUser, setMongoUser] = useState<MongoUser>();
  const [baixas, setBaixas] = useState<BaixaProps[]>([]);
  const value = {
    googleUser,
    setGoogleUser,
    mongoUser,
    setMongoUser,
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
