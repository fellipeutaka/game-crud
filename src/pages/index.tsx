import { Button, Flex, Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";

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
        flexDir="column"
        gap="8"
      >
        <Heading as="h1" size="lg">
          Home
        </Heading>
        <NextLink passHref href="/admin">
          <Link
            as={Button}
            bgColor="blue.600"
            _hover={{ textDecor: "none", bgColor: "blue.500" }}
            _focus={{ bgColor: "blue.500" }}
          >
            Go to admin page
          </Link>
        </NextLink>
      </Flex>
    </Seo>
  );
}
