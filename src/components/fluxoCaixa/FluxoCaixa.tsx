import {
  Text,
  Input,
  Stack,
  Tag,
  TagLabel,
  TagRightIcon,
  TagLeftIcon,
  HStack,
  Button,
  Switch,
} from "@chakra-ui/react";
import axios from "axios";
import { format } from "date-fns";
import { isBefore } from "date-fns";
import { useEffect, useState } from "react";
import {
  RiArrowRightUpLine,
  RiArrowRightDownLine,
  RiArrowUpDownLine,
} from "react-icons/ri";
import { useAppContext } from "../../context/AppContext";
import { MongoConta } from "../../models/mongoConta";

const formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function formatDateString(data: string) {
  let array = data.split("/");
  let format = `${array[1]}/${array[0]}/${array[2]}`;
  return format;
}

function formatDate(data: string) {
  let format = new Date(data);
  format.setDate(format.getDate() + 1);
  format.setMonth(format.getMonth());
  return format;
}

export function FluxoCaixa() {
  const { mongoUser } = useAppContext();
  const [pyramid, setPyramid] = useState(true);
  const [dix, setDix] = useState(true);
  const [inicio, setInicio] = useState(format(new Date(), "yyyy-MM-dd"));
  const inicioFormat = formatDate(inicio);
  const [final, setFinal] = useState(format(new Date(), "yyyy-MM-dd"));
  const finalFormat = formatDate(final);
  const [contas, setContas] = useState<MongoConta[]>([]);
  const totalPagar = contas.reduce((acc, conta) => {
    if (conta.tipo === "PAGAR") {
      if (
        conta.dataFormat.valueOf() > inicioFormat.valueOf() &&
        conta.dataFormat.valueOf() < finalFormat.valueOf()
      ) {
        if (conta.empresa === "PYRAMID" && pyramid) return acc + conta.valor;
        if (conta.empresa === "DIX" && dix) return acc + conta.valor;
      }
    }
    return acc;
  }, 0);
  const totalReceber = contas.reduce((acc, conta) => {
    if (conta.tipo === "RECEBER") {
      if (
        conta.dataFormat.valueOf() > inicioFormat.valueOf() &&
        conta.dataFormat.valueOf() < finalFormat.valueOf()
      ) {
        if (conta.empresa === "PYRAMID" && pyramid) return acc + conta.valor;
        if (conta.empresa === "DIX" && dix) return acc + conta.valor;
      }
    }
    return acc;
  }, 0);
  const totalCheques = contas.reduce((acc, conta) => {
    if (conta.tipo === "CHEQUE") {
      if (isBefore(conta.dataFormat, finalFormat)) {
        return acc + conta.valor;
      }
    }
    return acc;
  }, 0);
  const balance = totalReceber + totalCheques - totalPagar;

  async function fetchContas() {
    let response = await axios.post<MongoConta[]>("/api/mongodb/contas", {
      email: mongoUser.email,
    });
    response.data.forEach((conta) => {
      conta.dataFormat = new Date(formatDateString(conta.data));
    });
    setContas(response.data);
  }

  useEffect(() => {
    fetchContas();
  }, []);

  return (
    <Stack justify="center" align="center" spacing={6}>
      <Stack w="300px" spacing={5}>
        <Input
          fontSize="xl"
          type="date"
          _focus={{}}
          placeholder="Data Inicio"
          value={inicio}
          onChange={(e) => {
            setInicio(e.target.value);
          }}
        />
        <Input
          fontSize="xl"
          type="date"
          _focus={{}}
          placeholder="Data Fim"
          value={final}
          onChange={(e) => {
            setFinal(e.target.value);
          }}
        />
        <HStack justify="space-between">
          <HStack>
            <Switch
              id="pyramid"
              isChecked={pyramid}
              onChange={() => {
                setPyramid(!pyramid);
              }}
            />
            <Text fontSize="2xl" color="orange.300">
              Dix
            </Text>
          </HStack>
          <HStack>
            <Switch
              id="dix"
              isChecked={dix}
              onChange={() => {
                setDix(!dix);
              }}
            />
            <Text fontSize="2xl" color="orange.300">
              Pyramid
            </Text>
          </HStack>
        </HStack>
      </Stack>

      <Stack w="300px">
        <Tag padding="5px" fontSize="2xl" variant="outline" colorScheme="blue">
          <TagLeftIcon fontSize="large" as={RiArrowRightUpLine} />
          <TagLabel>Boletos: {formatter.format(totalReceber)}</TagLabel>
        </Tag>
        <Tag padding="5px" fontSize="2xl" variant="outline" colorScheme="blue">
          <TagLeftIcon fontSize="large" as={RiArrowRightUpLine} />
          <TagLabel>Cheques: {formatter.format(totalCheques)}</TagLabel>
        </Tag>
        <Tag padding="5px" fontSize="2xl" variant="outline" colorScheme="red">
          <TagLeftIcon fontSize="large" as={RiArrowRightDownLine} />
          <TagLabel>Pagar: {formatter.format(totalPagar)}</TagLabel>
        </Tag>
      </Stack>
      <Tag
        padding="5px"
        w="300px"
        fontSize="2xl"
        variant="outline"
        colorScheme={balance > 0 ? "green" : "red"}
      >
        <TagLeftIcon fontSize="large" as={RiArrowUpDownLine} />
        <TagLabel>Balanço: {formatter.format(balance)}</TagLabel>
      </Tag>
    </Stack>
  );
}
