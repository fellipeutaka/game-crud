import { useEffect, useState } from "react";
import { IoMdAdd, IoMdRefresh } from "react-icons/io";

import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import { Games as Game } from "@prisma/client";

import CreateModal from "../components/Modal/CreateModal";
import Seo from "../components/Seo";
import Body from "../components/Table/Body";
import Head from "../components/Table/Head";
import Loading from "../screens/Loading";

async function fetchGames() {
  const response = await fetch("/api/games");
  const { data } = await response.json();
  return data;
}

export default function Admin() {
  const [games, setGames] = useState<Game[] | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const modal = useDisclosure();

  useEffect(() => {
    fetchGames().then((games) => setGames(games));
  }, []);

  if (!games) {
    return <Loading />;
  }

  async function handleReload() {
    try {
      setIsRefreshing(true);
      const games = await fetchGames();
      setGames(games);
    } catch (err) {
      console.log(err);
    } finally {
      setIsRefreshing(false);
    }
  }

  const isGameListEmpty = games.length === 0;

  return (
    <Seo title="Admin - Games">
      <Flex
        as="main"
        w="full"
        minH="100vh"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        gap={8}
        bgColor="black"
        color="white"
      >
        <Flex
          as="header"
          justifyContent="space-between"
          alignItems="center"
          w="50%"
        >
          <Heading as="h1" size="2xl" fontWeight="bold">
            Games
          </Heading>
          <ButtonGroup>
            <Button
              leftIcon={<IoMdRefresh />}
              size="sm"
              onClick={handleReload}
              isLoading={isRefreshing}
            >
              Reload
            </Button>
            <Button
              onClick={modal.onOpen}
              leftIcon={<IoMdAdd />}
              size="sm"
              colorScheme="blue"
            >
              New
            </Button>
            <CreateModal
              isOpen={modal.isOpen}
              onClose={modal.onClose}
              setGames={setGames}
            />
          </ButtonGroup>
        </Flex>
        {isGameListEmpty ? (
          <p>No game ;-;</p>
        ) : (
          <Box overflowX="auto" shadow="md" rounded="lg" w="50%">
            <Box
              as="table"
              w="full"
              fontSize="sm"
              textAlign="left"
              color="gray.400"
            >
              <Head />
              <Body games={games} setGames={setGames} />
            </Box>
          </Box>
        )}
      </Flex>
    </Seo>
  );
}
