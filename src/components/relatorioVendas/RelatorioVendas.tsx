import { Box, Stack, Text } from "@chakra-ui/react";

export function RelatorioVendas() {
  return (
    <Stack justify="center" align="center">
      <Box>
        <iframe
          width="640"
          height="480"
          src="https://charts.mongodb.com/charts-databases-aifzj/embed/charts?id=3e2f82cd-70c9-4cdf-90ba-6de0bfbfb6fb&autoRefresh=3600&theme=dark"
        />
      </Box>
    </Stack>
  );
}
