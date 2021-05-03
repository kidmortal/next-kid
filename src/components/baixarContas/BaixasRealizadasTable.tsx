import {
  ChevronLeftIcon,
  ChevronRightIcon,
  RepeatClockIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Text,
  HStack,
  Table,
  Tbody,
  Td,
  Tr,
  useToast,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { BaixaProps, useAppContext } from "../../context/AppContext";

function paginate(array: BaixaProps[], page_size, page_number) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}

export function BaixasRealizadasTable() {
  const { baixas, removeBaixa, setBaixas } = useAppContext();
  const [page, setPage] = useState(1);
  const filteredBaixas = paginate(baixas, 5, page);
  const toast = useToast();

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

  function handleNextPage() {
    Math.floor(baixas?.length / 5) > page + 1 ? setPage(page + 1) : "";
  }

  function handlePreviousPage() {
    page > 1 ? setPage(page - 1) : "";
  }

  return (
    <Box width="500" borderRadius="sm" border="1px" borderColor="gray.300">
      <HStack bg="blue.800" justify="space-between">
        <IconButton
          size="sm"
          fontSize="larger"
          variant="unstyled"
          color="pink.300"
          aria-label="Send email"
          icon={<ChevronLeftIcon />}
          onClick={() => handlePreviousPage()}
        />
        <Text>
          Pagina {page} / {Math.floor(baixas?.length / 5 + 1)}
        </Text>
        <IconButton
          size="sm"
          fontSize="larger"
          variant="unstyled"
          color="pink.300"
          aria-label="Send email"
          icon={<ChevronRightIcon />}
          onClick={() => handleNextPage()}
        />
      </HStack>
      <Table size="sm" width={[100, 100, 500]}>
        <Tbody>
          {filteredBaixas.map((data) => (
            <Tr key={data.codigo_baixa}>
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
                      isLoading={data.loading}
                      onClick={() => {
                        handleUndoBaixa(data);
                        data.loading = true;
                      }}
                    />
                  </Tooltip>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
