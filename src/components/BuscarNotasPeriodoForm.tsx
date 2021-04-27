import { ChangeEvent, useEffect, useState } from "react";
import { MdCheckCircle, MdError } from "react-icons/md";
import axios from "axios";
import { Nota, Result } from "../pages/api/omie/notas";
import {
  Button,
  Input,
  Stack,
  Box,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import { useAppContext } from "../context/AppContext";

export function BuscarNotasPeriodoForm() {
  const { user } = useAppContext();
  const [dataInicial, setDataInicial] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  const [notas, setNotas] = useState<Nota[]>([]);
  const [tpnf, setTpnf] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  function requestData() {
    if (!dataInicial || !dataFinal)
      return toast({
        position: "top-right",
        title: "Jumento",
        description: "Digita as data ai caralho",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    setLoading(true);
    axios
      .get(
        `api/omie/notas?dataInicial=${dataInicial}&dataFinal=${dataFinal}&tpnf=${tpnf}`
      )
      .then((response) => {
        let data: Result = response.data;
        console.log(data);
        setNotas(data.result?.nfCadastro);
        setLoading(false);
        toast({
          position: "top-right",
          title: "Successful request",
          description: `Received ${data.result?.registros || 0} Notas`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      });
  }
  return (
    <Stack justify="center" align="center" direction="row">
      <Box>
        <Stack spacing={2} mt={5}>
          <Input
            width={[150, 200, 250]}
            placeholder={"Data Inicial"}
            value={dataInicial}
            onChange={(e) => {
              setDataInicial(e.target.value);
            }}
          />
          <Input
            width={[150, 200, 250]}
            placeholder={"Data Final"}
            value={dataFinal}
            onChange={(e) => {
              setDataFinal(e.target.value);
            }}
          />

          <Button
            width={[150, 200, 250]}
            disabled={!!!user}
            bg="purple.600"
            _hover={{ bg: "purple.700" }}
            isLoading={loading}
            onClick={() => {
              requestData();
            }}
          >
            Buscar Notas
          </Button>
        </Stack>
      </Box>

      <Box>
        <Stack spacing={3}>
          <Checkbox
            isChecked={tpnf === "0"}
            onChange={(e) => (tpnf === "0" ? setTpnf(null) : setTpnf("0"))}
          >
            Entrada
          </Checkbox>
          <Checkbox
            isChecked={tpnf === "1"}
            onChange={(e) => (tpnf === "1" ? setTpnf(null) : setTpnf("1"))}
          >
            Saida
          </Checkbox>
        </Stack>
      </Box>
    </Stack>
  );
}
