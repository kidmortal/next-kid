import { RepeatClockIcon } from "@chakra-ui/icons";
import {
  Box,
  Text,
  HStack,
  Button,
  Input,
  Stack,
  Table,
  Tbody,
  Td,
  Textarea,
  Tr,
  useToast,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { useState } from "react";
import TableScrollbar from "react-table-scrollbar";
import { useAppContext } from "../../context/AppContext";

export function BaixasRealizadasTable() {
  const { baixas, user } = useAppContext();
  const [history, setHistory] = useState([
    "um",
    "dois",
    "tres",
    "quatro",
    "cinco",
    "dois",
    "tres",
    "quatro",
    "cinco",
    "seis",
  ]);

  const toast = useToast();

  function handleUndoBaixa(codigoBaixa: number) {
    toast({
      position: "top-right",
      title: "Removido",
      description: "Baixa desfeita",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  }

  return (
    <Box width="500" borderRadius="sm" border="1px" borderColor="gray.300">
      <TableScrollbar rows={10}>
        <Table size="sm" width={[100, 100, 500]}>
          <Tbody>
            {baixas.map((data) => (
              <Tr>
                <Td fontSize={12}>{data.nota_fiscal}</Td>
                <Td fontSize={12}>R$ {data.valor_baixado}</Td>
                <Td fontSize={12}>{data.data_baixa}</Td>
                <Td>
                  <HStack justify="space-around">
                    <Text fontSize={12}>
                      Liquidado: {data.liquidado === "S" ? "✔" : "❌"}{" "}
                    </Text>
                    <Tooltip label="Desfazer Lançamento">
                      <IconButton
                        variant="unstyled"
                        color="pink.300"
                        aria-label="Send email"
                        icon={<RepeatClockIcon />}
                        onClick={() => handleUndoBaixa(43843743)}
                      />
                    </Tooltip>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableScrollbar>
    </Box>
  );
}
