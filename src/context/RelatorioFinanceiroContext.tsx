import { useState, ReactNode, useContext, useEffect } from "react";
import { createContext } from "react";
import { ContaReceberCadastro } from "../models/omieContaAReceber";

type RelatorioFinanceiroContextType = {
  contaAReceber: ContaReceberCadastro[];
  setContaAReceber: (contas: ContaReceberCadastro[]) => void;
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
  const [contaAReceber, setContaAReceber] = useState<ContaReceberCadastro[]>(
    []
  );
  const value = {
    contaAReceber,
    setContaAReceber,
  };

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
