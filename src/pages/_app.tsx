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

export async function getServerSideProps({ req }) {
  // Get event and context from Netlify Function
  const { context } = req.netlifyFunctionParams || {};

  // If we are currently in a Netlify function (deployed on netlify.app or
  // locally with netlify dev), do not wait for empty event loop.
  // See: https://stackoverflow.com/a/39215697/6451879
  // Skip during next dev.
  if (context) {
    console.log("Setting callbackWaitsForEmptyEventLoop: false");
    context.callbackWaitsForEmptyEventLoop = false;
  }

  // ... (run firebase queries, etc...)

  // return your data
  return { props: {} };
}

export default MyApp;
