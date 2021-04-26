import axios from "axios";
import Head from "next/head";
import { ChangeEvent, useEffect, useState } from "react";
import { MdCheckCircle, MdError } from "react-icons/md";
import {
  Button,
  Input,
  Container,
  List,
  ListItem,
  ListIcon,
  Tag,
  Stack,
  VStack,
  Box,
  HStack,
  Checkbox,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Nota, Result } from "./api/omie/notas";
import { GoogleLogin, GoogleLoginResponse } from "react-google-login";

export default function Home() {
  const [notas, setNotas] = useState<Nota[]>([]);
  const [loading, setLoading] = useState(false);
  const [dataInicial, setDataInicial] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  const [tpnf, setTpnf] = useState("");

  const toast = useToast();

  function formatCurrency(value) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }

  function tagEntrada() {
    return (
      <Tag margin="2" size={"sm"} variant="solid" bg="blue.400">
        E
      </Tag>
    );
  }
  function tagSaida() {
    return (
      <Tag margin="2" size={"sm"} variant="solid" bg="red.400">
        S
      </Tag>
    );
  }

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

  function responseGoogle(response) {
    console.log(response);
  }

  return (
    <Stack align="center" spacing={2}>
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
              disabled={loading}
              bg="purple.600"
              _hover={{ bg: "purple.700" }}
              isLoading={loading}
              onClick={() => {
                requestData();
              }}
            >
              Buscar Notas
            </Button>
            <GoogleLogin
              clientId="199765150861-i5tb6qamqsns207m42jd9iqrugra021n.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
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
    </Stack>
  );
}
