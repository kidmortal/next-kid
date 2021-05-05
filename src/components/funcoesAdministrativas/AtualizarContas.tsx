import {
  Box,
  Button,
  HStack,
  Icon,
  Progress,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { BiRefresh } from "react-icons/bi";
import {
  ContaPagarCadastro,
  ListaContaAPagarRetorno,
} from "../../models/omieContaAPagar";
import {
  ContaReceberCadastro,
  ListaContaAReceberRetorno,
} from "../../models/omieContaAReceber";

export type Conta = {
  tipo: string;
  data: string;
  empresa: string;
  nota: string;
  valor: number;
};

export function AtualizarContas() {
  const [contaAReceber, setContaAReceber] = useState<Conta[]>([]);
  const [contaAPagar, setContaAPagar] = useState<Conta[]>([]);
  const [totalRegistrosReceber, setTotalRegistrosReceber] = useState(1);
  const [totalRegistrosPagar, setTotalRegistrosPagar] = useState(1);
  const progressReceber = Math.round(
    (contaAReceber.length / totalRegistrosReceber) * 100
  );
  const progressPagar = Math.round(
    (contaAPagar.length / totalRegistrosPagar) * 100
  );
  const [visibility, setVisibility] = useState<VisibilityState>("hidden");

  async function formatArrayReceber(array: ContaReceberCadastro[]) {
    const formatArray: Conta[] = [];
    array.forEach((e) => {
      formatArray.push({
        tipo: "RECEBER",
        data: e.data_previsao || e.data_vencimento,
        empresa: "PYRAMID",
        nota: e.numero_documento_fiscal,
        valor: e.valor_documento,
      });
    });
    return formatArray;
  }

  async function formatArrayPagar(array: ContaPagarCadastro[]) {
    const formatArray: Conta[] = [];
    array.forEach((e) => {
      formatArray.push({
        tipo: "PAGAR",
        data: e.data_previsao || e.data_vencimento,
        empresa: "PYRAMID",
        nota: e.numero_documento_fiscal,
        valor: e.valor_documento,
      });
    });
    return formatArray;
  }

  async function updateDatabaseReceber() {
    axios
      .post("/api/mongodb/contas/inserir", {
        dados: contaAReceber,
      })
      .then((response) => {
        console.log(response);
      });
  }
  async function updateDatabasePagar() {
    axios
      .post("/api/mongodb/contas/inserir", {
        dados: contaAPagar,
      })
      .then((response) => {
        console.log(response);
      });
  }

  async function fetchReceber(pagina: number) {
    let response = await axios.post("api/omie/contas/listar/receber", {
      pagina,
    });
    console.log(response.data);
    return response.data;
  }
  async function fetchPagar(pagina: number) {
    let response = await axios.post("api/omie/contas/listar/pagar", {
      pagina,
    });
    console.log(response.data);
    return response.data;
  }

  async function updateReceber() {
    let newState: Conta[] = [];
    let retorno: ListaContaAReceberRetorno = await fetchReceber(1);
    setTotalRegistrosReceber(retorno.total_de_registros);
    let array = await formatArrayReceber(retorno.conta_receber_cadastro);
    newState = [...array];
    if (retorno.total_de_paginas > 1) {
      for (let index = 1; index < retorno.total_de_paginas; index++) {
        setContaAReceber([...newState]);
        let retorno: ListaContaAReceberRetorno = await fetchReceber(index + 1);
        let array = await formatArrayReceber(retorno.conta_receber_cadastro);
        newState = [...newState, ...array];
        if (index + 1 >= retorno.total_de_paginas) {
          setContaAReceber([...newState]);
          updateDatabaseReceber();
        }
      }
    }
  }

  async function updatePagar() {
    let newState: Conta[] = [];
    let retorno: ListaContaAPagarRetorno = await fetchPagar(1);
    setTotalRegistrosPagar(retorno.total_de_registros);
    let array = await formatArrayPagar(retorno.conta_pagar_cadastro);
    newState = [...array];
    if (retorno.total_de_paginas > 1) {
      for (let index = 1; index < retorno.total_de_paginas; index++) {
        setContaAPagar([...newState]);
        let retorno: ListaContaAPagarRetorno = await fetchPagar(index + 1);
        let array = await formatArrayPagar(retorno.conta_pagar_cadastro);
        newState = [...newState, ...array];
        if (index + 1 >= retorno.total_de_paginas) {
          setContaAPagar([...newState]);
          updateDatabasePagar();
        }
      }
    }
  }

  async function handleUpdateData() {
    setVisibility("visible");
    updateReceber();
    updatePagar();
  }

  return (
    <HStack justify="space-between">
      <Button
        variant="outline"
        _hover={{ bg: "blue.600" }}
        _focus={{ border: "none" }}
        leftIcon={<Icon as={BiRefresh} />}
        onClick={handleUpdateData}
      >
        Atualizar dados
      </Button>
      <Stack justify="center" align="center">
        <Stack>
          <Text visibility={visibility}>
            Importando {contaAReceber.length} / {totalRegistrosReceber} Contas a
            Receber
          </Text>
          <Progress
            visibility={visibility}
            minW={[100, 200, 300]}
            value={progressReceber}
          />
        </Stack>
        <Stack>
          <Text visibility={visibility}>
            Importando {contaAPagar.length} / {totalRegistrosPagar} Contas a
            Pagar
          </Text>
          <Progress
            visibility={visibility}
            minW={[100, 200, 300]}
            value={progressPagar}
          />
        </Stack>
      </Stack>
    </HStack>
  );
}
