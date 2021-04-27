import { Button } from "@chakra-ui/button";
import { LinkIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import {
  Box,
  HStack,
  Icon,
  List,
  ListIcon,
  ListItem,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Textarea,
  Tfoot,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import TableScrollbar from "react-table-scrollbar";
import axios from "axios";
import { format } from "date-fns";
import { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";

function formatDate(date: string) {
  let split = date.split("-");
  return `${split[2]}/${split[1]}/${split[0]}`;
}

export function BaixarContaAReceberForm() {
  const { user } = useAppContext();
  const [history, setHistory] = useState(["um", "dois", "tres"]);
  const [dataBaixa, setDataBaixa] = useState("");
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
      const nf = nfArray[index];
      axios
        .post("api/omie/contas/baixar", {
          dataBaixa: formatDate(dataBaixa),
          Cc,
          nota: nf,
          desconto: 0,
          juros: 0,
          valor: 0,
        })
        .then((response) => {
          toast({
            position: "top-right",
            title: "Dados",
            description: JSON.stringify(response.data),
            status: "success",
            isClosable: true,
            duration: 20000,
          });
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
        toast({
          position: "top-right",
          title: "Dados",
          description: JSON.stringify(response.data),
          status: "success",
          duration: 4000,
          isClosable: true,
        });
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
      <HStack>
        <Textarea
          rows={6}
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
          placeholder={`0000028\n0000027\n0000035\n0000025`}
        />
        <Box width="500">
          <TableScrollbar rows={5}>
            <Table size="sm">
              <Tbody>
                <Tr>
                  <Td>inches</Td>
                  <Td>millimetres (mm)</Td>
                  <Td isNumeric>25.4</Td>
                </Tr>
                <Tr>
                  <Td>inches</Td>
                  <Td>millimetres (mm)</Td>
                  <Td isNumeric>25.4</Td>
                </Tr>
                <Tr>
                  <Td>inches</Td>
                  <Td>millimetres (mm)</Td>
                  <Td isNumeric>25.4</Td>
                </Tr>
                <Tr>
                  <Td>inches</Td>
                  <Td>millimetres (mm)</Td>
                  <Td isNumeric>25.4</Td>
                </Tr>
                <Tr>
                  <Td>inches</Td>
                  <Td>millimetres (mm)</Td>
                  <Td isNumeric>25.4</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableScrollbar>
        </Box>
      </HStack>

      <Button
        isLoading={loadingBatch}
        onClick={() => handleSumbitBaixarTodos()}
        bg="purple.600"
        _hover={{ bg: "purple.700" }}
      >
        Baixar Todos
      </Button>
    </Stack>
  );
}
