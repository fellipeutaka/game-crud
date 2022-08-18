import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

import { theme } from "../theme";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
