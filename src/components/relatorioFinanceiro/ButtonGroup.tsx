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
  useRelatorioFinanceiroContext,
  ContaAReceber,
} from "../../context/RelatorioFinanceiroContext";
import {
  ContaReceberCadastro,
  ListaContaAReceberRetorno,
} from "../../models/omieContaAReceber";

export function ButtonGroup() {
  const { contaAReceber, setContaAReceber } = useRelatorioFinanceiroContext();
  const [totalRegistros, setTotalRegistros] = useState(1);
  const progress = Math.round((contaAReceber.length / totalRegistros) * 100);
  const [visibility, setVisibility] = useState<VisibilityState>("hidden");

  async function formatArray(array: ContaReceberCadastro[]) {
    const formatArray: ContaAReceber[] = [];
    array.forEach((e) => {
      formatArray.push({
        data: e.data_previsao,
        empresa: "PYRAMID",
        nota: e.numero_documento_fiscal,
        valor: e.valor_documento,
      });
    });
    return formatArray;
  }

  async function fetchData(pagina: number) {
    let response = await axios.post("api/omie/contas/listar", {
      tipo: "receber",
      pagina,
    });
    return response.data;
  }

  async function handleUpdateData() {
    let newState: ContaAReceber[] = [];
    setVisibility("visible");
    let retorno: ListaContaAReceberRetorno = await fetchData(1);
    console.log(retorno.conta_receber_cadastro);
    setTotalRegistros(retorno.total_de_registros);
    let array = await formatArray(retorno.conta_receber_cadastro);
    newState = [...array];
    if (retorno.total_de_paginas > 1) {
      for (let index = 1; index < retorno.total_de_paginas; index++) {
        setContaAReceber([...newState]);
        let retorno: ListaContaAReceberRetorno = await fetchData(index + 1);
        let array = await formatArray(retorno.conta_receber_cadastro);
        newState = [...newState, ...array];
        if (index + 1 >= retorno.total_de_paginas) {
          setContaAReceber([...newState]);
        }
      }
    }
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
        <Text visibility={visibility}>
          Importando {contaAReceber.length} / {totalRegistros} Contas
        </Text>
        <Progress
          visibility={visibility}
          minW={[100, 200, 300]}
          value={progress}
        />
      </Stack>
    </HStack>
  );
}
