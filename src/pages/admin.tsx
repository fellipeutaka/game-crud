import { useEffect, useState } from "react";
import { IoMdAdd, IoMdRefresh } from "react-icons/io";

import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Games as Game } from "@prisma/client";
import Lottie from "lottie-react";

import animation from "@game-crud/assets/lottie-sad.json";
import CreateModal from "@game-crud/components/Modal/CreateModal";
import Seo from "@game-crud/components/Seo";
import Body from "@game-crud/components/Table/Body";
import Head from "@game-crud/components/Table/Head";
import Loading from "@game-crud/screens/Loading";

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
          <Flex flexDir="column" alignItems="center">
            <Text fontSize="3xl" fontWeight="bold">
              No game
            </Text>
            <Lottie
              animationData={animation}
              loop
              style={{ width: "25vw", height: "25vh" }}
            />
          </Flex>
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
