import {
  HStack,
  Button,
  Input,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { format } from "date-fns";
import { useState } from "react";
import {
  BaixaProps,
  baixaResponse,
  useAppContext,
} from "../../context/AppContext";
import { BaixasRealizadasTable } from "./BaixasRealizadasTable";

function formatDate(date: string) {
  let split = date.split("-");
  return `${split[2]}/${split[1]}/${split[0]}`;
}

type contaProps = {
  dataBaixa: string;
  Cc: string;
  observacao: string;
  nota: string;
  desconto: number;
  juros: number;
  valor: number;
};

export function BaixarContaAReceberForm() {
  const { baixas, addBaixa, setBaixas } = useAppContext();
  const [dataBaixa, setDataBaixa] = useState(format(new Date(), "yyyy-MM-dd"));
  const dataBaixaFormat = formatDate(dataBaixa);
  const [batch, setBatch] = useState("");
  const [observacao, setObservacao] = useState("");
  const [loadingOne, setLoadingOne] = useState(false);
  const [loadingBatch, setLoadingBatch] = useState(false);
  const Cc = "50776177";
  const [nota, setNota] = useState("");
  const [desconto, setDesconto] = useState("");
  const [juros, setJuros] = useState("");
  const [valor, setValor] = useState("");

  const toast = useToast();

  function formatBaixa(nota: string, response: baixaResponse) {
    let newBaixa: BaixaProps = {
      codigo_baixa: response.codigo_baixa,
      codigo_lancamento: response.codigo_lancamento,
      data_baixa: dataBaixaFormat,
      liquidado: response.liquidado,
      nota_fiscal: nota,
      valor_baixado: response.valor_baixado,
    };
    return newBaixa;
  }

  function verificarCamposObrigatorios() {
    if (!dataBaixa) {
      toast({
        position: "top-right",
        title: "Data",
        description: "Campo obrigatorio",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return true;
    }
    if (!nota && !batch) {
      toast({
        position: "top-right",
        title: "Nota",
        description: "Campo obrigatorio",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return true;
    }
    return false;
  }

  async function handleSumbitBaixarTodos() {
    if (verificarCamposObrigatorios()) return;
    let nfArray = batch.split("\n");
    let newState = [...baixas];
    setLoadingBatch(true);

    let finishedProcessing = 0;

    for (let index = 0; index < nfArray.length; index++) {
      const nota = nfArray[index];
      baixarConta({
        dataBaixa: formatDate(dataBaixa),
        Cc,
        observacao,
        nota: nota,
        desconto: 0,
        juros: 0,
        valor: 0,
      }).then((response) => {
        finishedProcessing++;
        if (response) {
          newState.push(response);
          console.log(newState);
          setBaixas([...newState]);
        }

        if (finishedProcessing >= nfArray.length) {
          setLoadingBatch(false);
          setBatch("");
        }
      });
    }
  }

  async function handleSubmitBaixaConta() {
    if (verificarCamposObrigatorios()) return;
    setLoadingOne(true);

    let response = await baixarConta({
      dataBaixa: formatDate(dataBaixa),
      Cc,
      observacao,
      nota,
      desconto: parseFloat(desconto),
      juros: parseFloat(desconto),
      valor: parseFloat(desconto),
    });

    if (response) {
      addBaixa(response);
    }

    setLoadingOne(false);
    setNota("");
  }

  async function baixarConta(conta: contaProps) {
    let response = await axios.post("api/omie/contas/baixar", {
      dataBaixa: formatDate(dataBaixa),
      Cc: conta.Cc,
      observacao: conta.observacao,
      nota: conta.nota,
      desconto: conta.desconto,
      juros: conta.juros,
      valor: conta.valor,
    });
    if (response.data.descricao_status) {
      toast({
        position: "top-right",
        title: `NF ${conta.nota} Baixada`,
        description: JSON.stringify(response.data.descricao_status),
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      return formatBaixa(conta.nota, response.data);
    }
    if (response.data.faultstring) {
      toast({
        position: "top-right",
        title: `NF ${conta.nota} Erro no omie`,
        description: JSON.stringify(response.data.faultstring),
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return null;
    }

    toast({
      position: "top-right",
      title: `NF ${conta.nota} Erro Desconhecido`,
      description: JSON.stringify(response.data),
      status: "error",
      duration: 4000,
      isClosable: true,
    });
    return null;
  }

  return (
    <Stack>
      <Input
        borderColor="red.600"
        _hover={{ borderColor: "red.400" }}
        borderWidth="medium"
        textAlign="center"
        disabled
        value={`BRADESCO - ${Cc}`}
      />
      <Input
        type="date"
        placeholder={"Data Baixa"}
        value={dataBaixa}
        onChange={(e) => {
          setDataBaixa(e.target.value);
        }}
      />
      <Input
        type="text"
        placeholder={"Observação"}
        value={observacao}
        onChange={(e) => {
          setObservacao(e.target.value);
        }}
      />

      <HStack>
        <Input
          fontSize={["smaller", "sm", "md"]}
          type="number"
          placeholder={"Nota"}
          value={nota}
          onChange={(e) => {
            setNota(e.target.value);
          }}
        />
        <Input
          fontSize={["smaller", "sm", "md"]}
          type="number"
          placeholder={"Desconto"}
          value={desconto}
          onChange={(e) => {
            setDesconto(e.target.value);
          }}
        />
        <Input
          fontSize={["smaller", "sm", "md"]}
          type="number"
          placeholder={"Juros"}
          value={juros}
          onChange={(e) => {
            setJuros(e.target.value);
          }}
        />
        <Input
          fontSize={["smaller", "sm", "md"]}
          type="number"
          placeholder={"Valor - 100%"}
          value={valor}
          onChange={(e) => {
            setValor(e.target.value);
          }}
        />
        <Button
          width={300}
          isLoading={loadingOne}
          onClick={() => handleSubmitBaixaConta()}
          bg="purple.600"
          _hover={{ bg: "purple.700" }}
        >
          Baixar 1
        </Button>
      </HStack>
      <Stack direction={["column", "column", "row"]}>
        <Stack>
          <Textarea
            rows={11}
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
            placeholder={`0000028\n0000027\n0000035\n0000025`}
          />
          <Button
            isLoading={loadingBatch}
            onClick={() => handleSumbitBaixarTodos()}
            bg="purple.600"
            _hover={{ bg: "purple.700" }}
          >
            Baixar Todos
          </Button>
        </Stack>

        <BaixasRealizadasTable />
      </Stack>
    </Stack>
  );
}
