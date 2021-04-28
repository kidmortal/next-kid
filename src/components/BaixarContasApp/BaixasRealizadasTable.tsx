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

export function BaixasRealizadasTable() {
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
        <Table size="sm" width={[200, 300, 500]}>
          <Tbody>
            {history.map((e) => (
              <Tr>
                <Td fontSize={12}>8441</Td>
                <Td fontSize={12}>R$ 223,25</Td>
                <Td fontSize={12}>14/12/2021</Td>
                <Td>
                  <HStack justify="space-around">
                    <Text fontSize={12}>✔ Sucesso</Text>
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
