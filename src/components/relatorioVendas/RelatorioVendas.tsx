import { Box, Stack, Text } from "@chakra-ui/react";

export function RelatorioVendas() {
  return (
    <Stack justify="center" align="center">
      <Stack
        w={[400, 500, 600]}
        h={[400, 500, 600]}
        as="iframe"
        src="https://charts.mongodb.com/charts-databases-aifzj/embed/charts?id=3e2f82cd-70c9-4cdf-90ba-6de0bfbfb6fb&autoRefresh=3600&theme=dark"
      />
    </Stack>
  );
}
