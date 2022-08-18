import { Flex, Heading } from "@chakra-ui/react";

import Seo from "@game-crud/components/Seo";

export default function Home() {
  return (
    <Seo title="Home - Games">
      <Flex
        as="main"
        bgColor="black"
        color="white"
        justifyContent="center"
        alignItems="center"
        w="full"
        h="100vh"
      >
        <Heading as="h1" size="lg">
          Home
        </Heading>
      </Flex>
    </Seo>
  );
}
