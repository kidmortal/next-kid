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
import axios from "axios";
import { useState } from "react";
import TableScrollbar from "react-table-scrollbar";
import { BaixaProps, useAppContext } from "../../context/AppContext";

export function BaixasRealizadasTable() {
  const { baixas, setBaixas } = useAppContext();
  const toast = useToast();

  function removeBaixa(baixa: BaixaProps) {
    let newState = [...baixas];
    newState = newState.filter((element) => {
      return element.codigo_baixa !== baixa.codigo_baixa;
    });
    setBaixas(newState);
  }

  function handleUndoBaixa(baixa: BaixaProps) {
    axios
      .post("api/omie/contas/cancelarbaixa", {
        codigo_baixa: baixa.codigo_baixa,
      })
      .then((response) => {
        if (response.data.descricao_status) {
          toast({
            position: "top-right",
            title: `NF ${baixa.nota_fiscal}`,
            description: `${response.data.descricao_status}`,
            status: "success",
            duration: 8000,
            isClosable: true,
          });
          removeBaixa(baixa);
        }
        if (response.data.faultstring) {
          toast({
            position: "top-right",
            title: `NF ${baixa.nota_fiscal}`,
            description: `${response.data.faultstring}`,
            status: "error",
            duration: 8000,
            isClosable: true,
          });
          removeBaixa(baixa);
        }
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
                        onClick={() => handleUndoBaixa(data)}
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
