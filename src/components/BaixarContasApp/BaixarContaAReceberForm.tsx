import {
  HStack,
  Button,
  Input,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { baixaResponse, useAppContext } from "../../context/AppContext";
import { BaixasRealizadasTable } from "./BaixasRealizadasTable";

function formatDate(date: string) {
  let split = date.split("-");
  return `${split[2]}/${split[1]}/${split[0]}`;
}

export function BaixarContaAReceberForm() {
  const { baixas, setBaixas } = useAppContext();
  const [dataBaixa, setDataBaixa] = useState("");
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

  function newBaixa(nota: string, response: baixaResponse) {
    let newBaixa = {
      codigo_baixa: response.codigo_baixa,
      codigo_lancamento: response.codigo_lancamento,
      data_baixa: dataBaixaFormat,
      liquidado: response.liquidado,
      nota_fiscal: nota,
      valor_baixado: response.valor_baixado,
    };
    setBaixas([...baixas, newBaixa]);
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

  function handleSumbitBaixarTodos() {
    if (verificarCamposObrigatorios()) return;
    let nfArray = batch.split("\n");
    setLoadingBatch(true);
    let total = nfArray.length;
    let contador = 0;
    for (let index = 0; index < nfArray.length; index++) {
      const nota = nfArray[index];
      axios
        .post("api/omie/contas/baixar", {
          dataBaixa: formatDate(dataBaixa),
          Cc,
          nota: nota,
          desconto: 0,
          juros: 0,
          valor: 0,
        })
        .then((response) => {
          if (response.data.descricao_status) {
            toast({
              position: "top-right",
              title: `NF ${nota} Baixada`,
              description: JSON.stringify(response.data.descricao_status),
              status: "success",
              duration: 4000,
              isClosable: true,
            });
            newBaixa(nota, response.data);
          }
          if (response.data.faultstring) {
            toast({
              position: "top-right",
              title: `NF ${nota} Erro`,
              description: JSON.stringify(response.data.faultstring),
              status: "error",
              duration: 4000,
              isClosable: true,
            });
          }

          contador++;
          if (contador >= total) setLoadingBatch(false);
        });
    }
  }

  function handleSubmitBaixaConta() {
    if (verificarCamposObrigatorios()) return;
    setLoadingOne(true);
    axios
      .post("api/omie/contas/baixar", {
        dataBaixa: formatDate(dataBaixa),
        Cc,
        nota,
        desconto,
        juros,
        valor,
      })
      .then((response) => {
        setLoadingOne(false);
        if (response.data.descricao_status) {
          toast({
            position: "top-right",
            title: `NF ${nota} Baixada`,
            description: JSON.stringify(response.data.descricao_status),
            status: "success",
            duration: 4000,
            isClosable: true,
          });
          newBaixa(nota, response.data);
        }
        if (response.data.faultstring) {
          toast({
            position: "top-right",
            title: `NF ${nota} Erro`,
            description: JSON.stringify(response.data.faultstring),
            status: "error",
            duration: 4000,
            isClosable: true,
          });
        }
      });
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
          type="number"
          placeholder={"Nota"}
          value={nota}
          onChange={(e) => {
            setNota(e.target.value);
          }}
        />
        <Input
          type="number"
          placeholder={"Desconto"}
          value={desconto}
          onChange={(e) => {
            setDesconto(e.target.value);
          }}
        />
        <Input
          type="number"
          placeholder={"Juros"}
          value={juros}
          onChange={(e) => {
            setJuros(e.target.value);
          }}
        />
        <Input
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
      <Stack direction={["column", "row"]}>
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
