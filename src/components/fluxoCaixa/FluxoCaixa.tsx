import {
  Text,
  Input,
  Stack,
  Tag,
  TagLabel,
  TagRightIcon,
  TagLeftIcon,
  HStack,
} from "@chakra-ui/react";
import axios from "axios";
import { format } from "date-fns";
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
  format.setMonth(format.getMonth() + 1);
  return format;
}

export function FluxoCaixa() {
  const { googleUser } = useAppContext();
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
        return acc + conta.valor;
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
        return acc + conta.valor;
      }
    }
    return acc;
  }, 0);
  const totalCheques = contas.reduce((acc, conta) => {
    if (conta.tipo === "CHEQUE") {
      if (conta.dataFormat.valueOf() < finalFormat.valueOf()) {
        return acc + conta.valor;
      }
    }
    return acc;
  }, 0);
  const balance = totalReceber + totalCheques - totalPagar;

  async function fetchContas() {
    let response = await axios.post<MongoConta[]>("/api/mongodb/contas", {
      email: googleUser.email,
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
    <Stack justify="center" align="center">
      <Stack>
        <Input
          type="date"
          _focus={{}}
          placeholder="Data Inicio"
          value={inicio}
          onChange={(e) => {
            setInicio(e.target.value);
          }}
        />
        <Input
          type="date"
          _focus={{}}
          placeholder="Data Fim"
          value={final}
          onChange={(e) => {
            setFinal(e.target.value);
          }}
        />
      </Stack>

      <Stack>
        <Tag size="lg" variant="outline" colorScheme="blue">
          <TagLeftIcon fontSize="large" as={RiArrowRightUpLine} />
          <TagLabel>Boletos: {formatter.format(totalReceber)}</TagLabel>
        </Tag>
        <Tag size="lg" variant="outline" colorScheme="blue">
          <TagLeftIcon fontSize="large" as={RiArrowRightUpLine} />
          <TagLabel>Cheques: {formatter.format(totalCheques)}</TagLabel>
        </Tag>
        <Tag size="lg" variant="outline" colorScheme="red">
          <TagLeftIcon fontSize="large" as={RiArrowRightDownLine} />
          <TagLabel>Pagar: {formatter.format(totalPagar)}</TagLabel>
        </Tag>
      </Stack>
      <Tag
        size="lg"
        variant="outline"
        colorScheme={balance > 0 ? "green" : "red"}
      >
        <TagLeftIcon fontSize="large" as={RiArrowUpDownLine} />
        <TagLabel>Balanço: {formatter.format(balance)}</TagLabel>
      </Tag>
    </Stack>
  );
}
