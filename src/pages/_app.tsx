import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import { AppContextProvider } from "../context/AppContext";
import { theme } from "../styles/theme";

function MyApp({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </AppContextProvider>
  );
}

export default MyApp;
