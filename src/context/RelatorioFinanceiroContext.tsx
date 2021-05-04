import { useState, ReactNode, useContext, useEffect } from "react";
import { createContext } from "react";
import { ContaReceberCadastro } from "../models/omieContaAReceber";

export type ContaAReceber = {
  data: string;
  empresa: string;
  nota: string;
  valor: number;
};

type RelatorioFinanceiroContextType = {
  contaAReceber: ContaAReceber[];
  setContaAReceber: (contas: ContaAReceber[]) => void;
};

const RelatorioFinanceiroContextDefaultValues: RelatorioFinanceiroContextType = {
  contaAReceber: [],
  setContaAReceber: () => {},
};

interface Props {
  children: ReactNode;
}

const RelatorioFinanceiroContext = createContext<RelatorioFinanceiroContextType>(
  RelatorioFinanceiroContextDefaultValues
);

export function RelatorioFinanceiroContextProvider({ children }: Props) {
  const [contaAReceber, setContaAReceber] = useState<ContaAReceber[]>([]);
  const value = {
    contaAReceber,
    setContaAReceber,
  };

  useEffect(() => {
    if (contaAReceber.length > 1) {
      localStorage.setItem(
        "@next-kid:contaareceber",
        JSON.stringify(contaAReceber)
      );
    }
  }, [contaAReceber]);

  useEffect(() => {
    let data = localStorage.getItem("@next-kid:contaareceber");
    if (data) {
      let contas = JSON.parse(data) as ContaAReceber[];
      setContaAReceber(contas);
    }
  }, []);

  return (
    <>
      <RelatorioFinanceiroContext.Provider value={value}>
        {children}
      </RelatorioFinanceiroContext.Provider>
    </>
  );
}

export function useRelatorioFinanceiroContext() {
  return useContext(RelatorioFinanceiroContext);
}
