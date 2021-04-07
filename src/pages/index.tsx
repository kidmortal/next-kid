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
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { Nota, Result } from "./api/omie/notas";

interface SocketMessage {
  event: string;
  message: string;
}

export default function Home() {
  const [notas, setNotas] = useState<Nota[]>([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");
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
    if (!data)
      return toast({
        position: "top-right",
        title: "Jumento",
        description: "Digita uma data caralho",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    setLoading(true);
    axios.get(`api/omie/notas?data=${data}&tpnf=${tpnf}`).then((response) => {
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
    <Stack align="center" spacing={2}>
      <Stack justify="center" align="center" direction="row">
        <Box>
          <Stack spacing={2} mt={5}>
            <Input
              placeholder={"Me digita"}
              value={data}
              onChange={(e) => {
                setData(e.target.value);
              }}
            />

            <Button
              disabled={loading}
              bg="purple.600"
              _hover={{ bg: "purple.700" }}
              onClick={() => {
                requestData();
              }}
            >
              {loading ? (
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="md"
                />
              ) : (
                "Me Requesta"
              )}
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

      <List spacing={3}>
        {notas.map((nota) => {
          return (
            <ListItem
              key={nota.ide.nNF}
              marginTop={5}
              borderRadius="3xl"
              d="flex"
              bg="gray.800"
              justifyContent="space-around"
            >
              {nota.ide.tpNF === "0" ? tagEntrada() : tagSaida()}

              <Tag margin="2" size={"md"} variant="solid" bg="teal">
                {nota.ide.nNF}
              </Tag>
              <Tag margin="2" size={"md"} variant="solid" bg="green">
                {nota.info.dInc}
              </Tag>
              <Tag margin="2" size={"md"} variant="solid" bg="yellow.500">
                {formatCurrency(nota.total.ICMSTot.vNF)}
              </Tag>
            </ListItem>
          );
        })}
      </List>
    </Stack>
  );
}
