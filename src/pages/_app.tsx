import { ChakraProvider, Stack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Header } from "../components/header/Header";
import { AppContextProvider } from "../context/AppContext";
import { theme } from "../styles/theme";
import { Provider as AuthProvider } from "next-auth/client";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/sw.js").then(
          function (registration) {
            console.log(
              "Service Worker registration successful with scope: ",
              registration.scope
            );
          },
          function (err) {
            console.log("Service Worker registration failed: ", err);
          }
        );
      });
    }
  }, []);

  return (
    <AppContextProvider>
      <ChakraProvider theme={theme}>
        <AuthProvider session={pageProps.session}>
          <Stack align="center" spacing={2}>
            <Stack width={[350, 500, 700]}>
              <Header />
              <Component {...pageProps} />
            </Stack>
          </Stack>
        </AuthProvider>
      </ChakraProvider>
    </AppContextProvider>
  );
}
export default MyApp;
